"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import secrets
from flask import Flask, request, jsonify, url_for, Blueprint, current_app

from api.models import db, Patient, Specialist

from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from jwt.exceptions import ExpiredSignatureError
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import logging

from flask_mail import Message

import random
import string

#SDK de Mercado Pago
import mercadopago
# Agrega credenciales
sdk = mercadopago.SDK("APP_USR-3678964543970321-122914-cff594eb1bc1032844fce854aa9f58ed-1603958860")

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)
app=Flask(__name__)
secret_keys=secrets.token_hex(32)
app.config["JWT_SECRET_KEY"]= secret_keys
jwt= JWTManager(app)
bcrypt=Bcrypt(app)




@api.route('/hello', methods=[ 'GET'])

def handle_hello():
    try:
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        email = request.json.get('email')
        password = request.json.get('password')

    except Exception as error:
        return jsonify({"error": "Error in user creation" + str(error)}), 500

    response_body = {
        "message": "Patient creation success" 
    }

    return jsonify(response_body), 200


@api.route("/signup_patient", methods=["POST"])
def signup_patient():
    try:
        first_name=request.json.get("first_name")
        last_name=request.json.get("last_name")
        email=request.json.get("email")
        password=request.json.get("password")
        
        if not first_name or not last_name or not email or not password:
            return jsonify ({"error":"You are missing information, check it out"}),400
        
        existing_patient=Patient.query.filter_by(email=email).first()
        email_specialist=request.json.get("email")
        existing_specialist=Specialist.query.filter_by(email=email_specialist).first()
        if existing_patient or existing_specialist:
            return jsonify ({"error": "The email already exist"})
        
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        new_patient=Patient(first_name=first_name,last_name=last_name,email=email,password=password_hash)
        db.session.add(new_patient)
        db.session.commit()
        
        return jsonify ({"message":"Patient was created Succesfully!","patient_id":new_patient.id,"first_name": first_name,"last_name": last_name, "email":email}),200

    except Exception as e:
        return jsonify({"error":"Error in patient creation " + str(e)}),400



@api.route("signup_specialist",methods=["POST"])
def signup_specialist():
    try:
        first_name=request.json.get("first_name")
        last_name=request.json.get("last_name")
        email=request.json.get("email")
        password=request.json.get("password")
        is_physiotherapist=request.json.get("is_physiotherapist")    
        is_nurse=request.json.get("is_nurse")   
        certificate=request.json.get("certificate")
        description=request.json.get("description")
        language=request.json.get("language") 
        
        if not first_name or not last_name or not email or not password:
            return jsonify ({"error":"You are missing information, check it out"}),400


        existing_specialist=Specialist.query.filter_by(email=email).first()
        email_pacient=request.json.get("email")
        existing_pacient=Patient.query.filter_by(email=email_pacient).first()
        if existing_specialist or existing_pacient:
            return jsonify ({"error":"The Specialist already exist!"}),400
        
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        new_specialist=Specialist(email=email,first_name=first_name,last_name=last_name,password=password_hash,is_physiotherapist=is_physiotherapist,is_nurse=is_nurse,certificate=certificate,description=description,language=language)
        db.session.add(new_specialist)
        db.session.commit()

        return jsonify({"message":"The Specialist was created succesfully!","specialist_id":new_specialist.id, "email":email,"first_name":first_name, "last_name": last_name,"is_physiotherapist":is_physiotherapist,"is_nurse":is_nurse,"certificate":certificate,"description":description,"language":language}),200

    except Exception as e: 
        return jsonify({"error": "Error in Specialist creation " + str(e)}),400




@api.route("/token_patient", methods=['POST'])
def login_patient():
    try:
        email=request.json.get("email")
        password=request.json.get("password")

        if not email or not password:
            return jsonify ({"error": "Invalid credentials"}),400
        
        get_patient_by_email=Patient.query.filter_by(email=email).one()
        check_password_of_existing=get_patient_by_email.password
        is_correctly_password=bcrypt.check_password_hash(check_password_of_existing,password)
       
      
        serialized_patient = get_patient_by_email.serialize()
        
        if is_correctly_password:
            patient_id=get_patient_by_email.id
            access_token=create_access_token(identity=patient_id)
        
        
            return jsonify({"accessToken": access_token, "patient":serialized_patient}),200
        else:
            return jsonify({"error":"Invalid credentials"}),400
        
    except Exception as e:
        return jsonify ({"error": e}),400


@api.route("/token_specialist",methods=["POST"])
def login_specialist():
    try:
        email=request.json.get("email")
        password=request.json.get("password")

        if not email or not password:
            return jsonify({"error" : "The Email does not exist or the password does not exist" })
        
        get_specialist_by_email=Specialist.query.filter_by(email=email).one()
        check_password_of_existing=get_specialist_by_email.password
        is_password_correctly=bcrypt.check_password_hash(check_password_of_existing,password)

        serialized_specialist=get_specialist_by_email.serialize()

        if is_password_correctly:
            specialist_id=get_specialist_by_email.id
            access_token=create_access_token(identity= specialist_id)

            return jsonify ({"accessToken": access_token,"specialist":serialized_specialist}),200
        else:
            return jsonify({"error":"The password is wrong"}),400

    except Exception as e:
        return jsonify ({"error": "The email or password is wrong" + str(e)}),400



@api.route("/private_patient")
@jwt_required(optional=True)
def get_private_pacient():
    
    try:
        patient_validation=get_jwt_identity()
        if patient_validation:
             patient=Patient.query.get(patient_validation)
             return jsonify ({"message":"Token is valid", "patient": patient.serialize()})
                       
    except ExpiredSignatureError:
        logging.warning("Token has expired")
        return jsonify ({"error": "Token has expired"}),400

    except Exception as e:
        logging.error("Token verification error: " + str(e))
        return jsonify ({"error": "The token is invalid " + str (e)}), 400
    


@api.route("/private_specialist")
@jwt_required(optional=True)
def get_private_specialist():
    try:
        specialist_validation=get_jwt_identity()
        if specialist_validation:
             specialist=Specialist.query.get(specialist_validation)
             return jsonify ({"message":"Token is valid", "specialist": specialist.serialize() })
        
       
    except ExpiredSignatureError:
        logging.warning("Token has expired")
        return jsonify ({"error": "Token has expired"}),400

    except Exception as e:
        logging.error("Token verification error: " + str(e))
        return jsonify ({"error": "The token is invalid " + str (e)}), 400


@api.route('/create_preference', methods=['POST'])
def create_preference():
    try:
        req_data = request.get_json()

        preference_data = {
            "items": [
                {
                    "title": req_data["description"],
                    "unit_price": float(req_data["price"]),
                    "quantity": int(req_data["quantity"]),
                }
            ],
            "back_urls": {
                "success": "https://solid-space-broccoli-7v9r5r744rx9fwwjw-3000.app.github.dev/success",
                "failure": "https://solid-space-broccoli-7v9r5r744rx9fwwjw-3000.app.github.dev/failure",
                "pending": "https://solid-space-broccoli-7v9r5r744rx9fwwjw-3000.app.github.dev/pending",
            },
            "auto_return": "approved",
        }

        preference_response = sdk.preference().create(preference_data)
        preference_id = preference_response["response"]

        return jsonify({"id": preference_id})

    except Exception as e:
        print("Error creating preference:", str(e))
        return jsonify({"error": str(e)}), 500


@api.route("/delete_patient/<int:patient_id>",methods=['DELETE'])
def delete_patient_by_id(patient_id):
    patient=Patient.query.get(patient_id)
    if patient:
        db.session.delete(patient)
        db.session.commit()
        return jsonify({"message":"Patient Deleted"})
    else:
        return jsonify({"error":"The Patient does not exist"})


@api.route("/delete_specialist/<int:specialist_id>",methods=['DELETE'])
def delete_specialist_by_id(specialist_id):
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        db.session.delete(specialist)
        db.session.commit()
        return jsonify({"message":"Specialist Deleted"})
    else:
        return jsonify({"error":"The Specialist does not exist"})


@api.route("/get_information_patient/<int:patient_id>",methods=["GET"])
def get_patient_by_id(patient_id):
    patient=Patient.query.get(patient_id)
    if patient_id:
        patient_serialize=patient.serialize()
        return jsonify({"patient":patient_serialize}),200
    else:
        return jsonify({"error":"The patient does not exist"}),400
    


@api.route("/get_information_specialist/<int:specialist_id>",methods=["GET"])
def get_specialist_by_id(specialist_id):
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        specialist_serialize=specialist.serialize()

        return jsonify({"specialist":specialist_serialize})
    
    else:
        return jsonify({"error":"The specialist does not exist"})



@api.route("/update_information_patient/<int:patient_id>",methods=["PUT"])
def update_patient(patient_id):

    new_first_name=request.json.get("first_name")
    new_last_name=request.json.get("last_name")
    new_email=request.json.get("email")
    new_img=request.json.get("img")
    new_phone_number=request.json.get("phone_number")
    country_origin=request.json.get("country_origin")
    language=request.json.get("language")

    patient=Patient.query.get(patient_id)
    if patient:
        patient.first_name=new_first_name
        patient.new_last_name=new_last_name
        patient.email=new_email
        patient.img=new_img
        patient.phone_number=new_phone_number
        patient.country_origin=country_origin
        patient.language=language

        db.session.commit()
        return jsonify({
            "message":"The information was uploaded succesfully",
           "patient": patient.serialize()
        }),200
    
    else:
        return ({"error":"the patient does not exist"}),400 



@api.route("/update_information_specialist/<int:specialist_id>",methods=["PUT"])
def update_specialist(specialist_id):

    new_first_name=request.json.get("first_name")
    new_last_name=request.json.get("last_name")
    new_email=request.json.get("email")
    new_img=request.json.get("img")
    new_description=request.json.get("description")
    new_language=request.json.get("language")
    new_phone_number=request.json.get("phone_number")
    country_origin=request.json.get("country_origin")
    new_certificate=request.json.get("certificate")
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        specialist.first_name=new_first_name
        specialist.new_last_name=new_last_name
        specialist.email=new_email
        specialist.img=new_img
        specialist.description=new_description
        specialist.language=new_language
        specialist.phone_number=new_phone_number
        specialist.country_origin=country_origin
        specialist.certificate=new_certificate
        

        db.session.commit()
        
        return jsonify({
            "message":"The information was uploaded succesfully",
           "patient": specialist.serialize()
        }),200
    
    else:
        return ({"error":"the patient does not exist"}),400 


