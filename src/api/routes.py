"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import jsonify
import secrets,json
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint,current_app
import cloudinary
from math import ceil
from api.models import db, Patient, Specialist,Certificates, Administration

# Import the cloudinary.api for managing assets
import cloudinary.api
from api.utils import generate_sitemap, APIException
from flask_cors import CORS,cross_origin
from jwt.exceptions import ExpiredSignatureError
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import logging
import cloudinary.uploader
import requests

cloudinary.config(
            cloud_name="dxgvkwunx",
            api_key="498479955778132",
            api_secret="UV8fjqUqRGCzs-R0myg5stXhljE" ,
    )

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
CORS(app, resources=r'/api/*')
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



@api.route("/singup_admin",methods=["POST"])
def singup_admin():
    try:
        first_name='admin'
        last_name='admin'
        email='admin@gmail.com'
        password='playstation4admin'
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        new_admin=Administration(email=email,first_name=first_name,last_name=last_name,password=password_hash)
        db.session.add(new_admin)
        db.session.commit()
        existing_admin_to_show=Administration.query.filter_by(email=email).first()
        return jsonify({"message":"The Admin was created succesfully!","admin_information":existing_admin_to_show.serialize()}),200

    except Exception as e: 
        return jsonify({"error": "Error in admin creation " + str(e)}),400
      


@api.route("/token_admin",methods=["POST"])
def login_admin():
    try:
        email=request.json.get("email")
        password=request.json.get("password")
        if not email or not password:
            return jsonify({"error" : "The Email does not exist or the password does not exist" })  
          
        get_admin_by_email=Administration.query.filter_by(email=email).one()
        check_password_of_existing=get_admin_by_email.password
        is_password_correctly=bcrypt.check_password_hash(check_password_of_existing,password)

        serialized_admin=get_admin_by_email.serialize()

        if is_password_correctly:
            admin_id=get_admin_by_email.id
            access_token=create_access_token(identity= admin_id)
            get_admin_by_email.last_login_at=datetime.utcnow()
            db.session.commit()

            return jsonify ({"accessToken": access_token,"admin":serialized_admin, "ok":True}),200
        else:
            return jsonify({"error":"The password is wrong"}),400

    except Exception as e:
        return jsonify ({"error": "The email or password is wrong" + str(e)}),400


@api.route("/private_admin")
@jwt_required(optional=True)
def get_private_admin():
    try:
        admin_validation=get_jwt_identity()
        if admin_validation:
             admin=Administration.query.get(admin_validation)
             return jsonify ({"message":"Token is valid", "admin": admin.serialize() })
        
       
    except ExpiredSignatureError:
        logging.warning("Token has expired")
        return jsonify ({"error": "Token has expired"}),400

    except Exception as e:
        logging.error("Token verification error: " + str(e))
        return jsonify ({"error": "The token is invalid " + str (e)}), 400





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


@api.route("/signup_specialist",methods=["POST"])
def signup_specialist():
    try:
        first_name=request.json.get("first_name")
        last_name=request.json.get("last_name")
        email=request.json.get("email")
        password=request.json.get("password")
        is_physiotherapist=request.json.get("is_physiotherapist")    
        is_nurse=request.json.get("is_nurse")   
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
        is_authorized=False
        new_specialist=Specialist(email=email,first_name=first_name,last_name=last_name,password=password_hash,is_physiotherapist=is_physiotherapist,is_nurse=is_nurse,description=description,language=language,is_authorized=is_authorized)
        db.session.add(new_specialist)
        db.session.commit()

        return jsonify({"message":"The Specialist was created succesfully!","specialist_id":new_specialist.id,"first_name":first_name,"last_name":last_name,"email":email}),200

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
            get_patient_by_email.last_login_at=datetime.utcnow()
            db.session.commit()
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
            get_specialist_by_email.last_login_at=datetime.utcnow()
            db.session.commit()

            return jsonify ({"accessToken": access_token,"specialist":serialized_specialist, "ok":True}),200
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
        theid = req_data.get("theid")

        preference_data = {
            "items": [
                {   
                    "title": f"Suscripción para el usuario: {theid}",
                    "unit_price": float(req_data["price"]),
                    "quantity": int(req_data["quantity"]),
                }
            ],
            "back_urls": {


                "success": "https://vigilant-engine-pjppv5999xjh6x9j-3000.app.github.dev/success",
                "failure": "https://vigilant-engine-pjppv5999xjh6x9j-3000.app.github.dev/failure",
                "pending": "https://vigilant-engine-pjppv5999xjh6x9j-3000.app.github.dev/pending",


            },
            "auto_return": "approved",
        }

        preference_response = sdk.preference().create(preference_data)
        preference_id = preference_response["response"]

        return jsonify({"id": preference_id, "theid": theid})

    except Exception as e:
        print("Error creating preference:", str(e))
        return jsonify({"error": str(e)}), 500


@api.route("/delete_patient/<int:patient_id>",methods=['DELETE'])
def delete_patient_by_id(patient_id):
    patient=Patient.query.get(patient_id)
    if patient:
        db.session.delete(patient)
        db.session.commit()
        return jsonify({"message":"Patient Deleted", "ok": True})
    else:
        return jsonify({"error":"The Patient does not exist"})


@api.route("/delete_specialist/<int:specialist_id>", methods=['DELETE'])
def delete_specialist_by_id(specialist_id):
    specialist = Specialist.query.get(specialist_id)
    if specialist:
        db.session.delete(specialist)
        db.session.commit()
        return jsonify({"message": "Specialist Deleted", "ok": True})
    else:
        return jsonify({"error": "The Specialist does not exist"}), 404



@api.route("/get_information_patient/<int:patient_id>",methods=["GET"])
def get_patient_by_id(patient_id):
    patient=Patient.query.get(patient_id)
    if patient_id:
        patient_serialize=patient.serialize()
        return jsonify({"patient":patient_serialize}),200
    else:
        return jsonify({"error":"The patient does not exist"}),400
    


@api.route("/get_information_specialist/<int:specialist_id>", methods=["GET"])
def get_specialist_by_id(specialist_id):
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        specialist_serialize=specialist.serialize()
        print("Specialist information:", specialist_serialize)
        return jsonify({"specialist": specialist_serialize, "ok": True})
    else:
        return jsonify({"error": "The specialist does not exist"}), 400




@api.route("/update_information_patient/<int:patient_id>",methods=["PUT"])
@cross_origin( origins="*",
    methods=["PUT"],
    allow_headers=["Content-Type"])
def update_patient(patient_id):

    new_first_name=request.json.get("first_name")
    new_last_name=request.json.get("last_name")
    new_email=request.json.get("email")
    
    new_phone_number=request.json.get("phone_number")
    country_origin=request.json.get("country_origin")
    language=request.json.get("language")


    patient=Patient.query.get(patient_id)
   
    if patient:
        patient.first_name=new_first_name
        patient.last_name=new_last_name
        patient.email=new_email
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



@api.route("/update_img_patient/<int:patient_id>", methods=["PUT"])
@cross_origin()
def update_img_patient(patient_id):
    new_img=request.files.get("img")
    patient=Patient.query.get(patient_id)
    if patient:
        img_path=None
        folder_name="PhysioCareSync"
        if new_img:
            res=cloudinary.uploader.upload(new_img,folder=folder_name)
            img_path=res["secure_url"]
            patient.img=img_path
    
    
    db.session.commit()
    return jsonify({
        "message":"The profile image was updated!",
        "patient":patient.serialize()
    }),200



@api.route("/update_information_specialist/<int:specialist_id>",methods=["PUT"])
def update_specialist(specialist_id):
    new_first_name=request.json.get("first_name")
    new_last_name=request.json.get("last_name")
    new_email=request.json.get("email")
    new_description=request.json.get("description")
    new_language=request.json.get("language")
    new_phone_number=request.json.get("phone_number")
    country_origin=request.json.get("country_origin")
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        specialist.first_name=new_first_name
        specialist.last_name=new_last_name
        specialist.email=new_email
        specialist.description=new_description
        specialist.language=new_language
        specialist.phone_number=new_phone_number
        specialist.country_origin=country_origin
        db.session.commit()
        return jsonify({
            "message":"The information was uploaded succesfully",
           "specialist": specialist.serialize()
        }),200
    
    else:
        return ({"error":"the patient does not exist"}),400 

    


@api.route("/update_img_specialist/<int:specialist_id>", methods=["PUT"])
@cross_origin()
def update_img_specialist(specialist_id):
    new_img=request.files.get("img")
    specialist=Specialist.query.get(specialist_id)
    if specialist:
        img_path=None
        folder_name="PhysioCareSync"
        if new_img :
            res_img=cloudinary.uploader.upload(new_img,folder=folder_name)
            img_path=res_img["secure_url"]
            specialist.img=img_path
                
    db.session.commit()
    return jsonify({
        "message":"The profile image and the certificate was updated!",
        "specialist":specialist.serialize()

    }),200



@api.route("/upload_certificates_specialist/<int:specialist_id_certificate>",methods=["POST"])
@cross_origin()
def upload_certificates_by_specialist(specialist_id_certificate):
    try:
        certificate_path=None
        specialist=Specialist.query.get(specialist_id_certificate)
        num_certificates=int(request.form.get("num_certificates"))
        print(num_certificates)
        folder_name="PhysioCareSync"
        for i in range(1,num_certificates+1):
            certificate_key=f"certificates_url_{i}"
            new_certificate=request.files.get(certificate_key)
            if new_certificate and specialist:
                res_certificate=cloudinary.uploader.upload(new_certificate,folder=folder_name)
                certificate_path=res_certificate["secure_url"]
                new_certificate_instance=Certificates(certificates_url=certificate_path,specialist=specialist)
                db.session.add(new_certificate_instance)
     
        db.session.commit()
        return jsonify({"message":"The certificates was uploaded succesfully", "specialist_information":specialist.serialize()}),200
    
    except Exception as e:
        return jsonify({"error":e}),400


@api.route("/get_certificates")
def get_information_certificates():
    certificates=Certificates.query.all()
    certificates_list=[]
    for certificate in certificates:
        certificates_dict={
            "id":certificate.id,
           "specialist":{
                "specialist_id":certificate.specialist.id,
                "specialist_first_name":certificate.specialist.first_name,
                "specialist_last_name":certificate.specialist.last_name,
            },
        
            "certificates_url":certificate.certificates_url 
            }
        
        certificates_list.append(certificates_dict)

    return certificates_list,200
            
@api.route("/webhook_mercadopago", methods=['POST'])
def webhook_mercadopago():
    try:
        
        userID = request.json.get("theid")
        print(f"Received  userID from Mercado Pago: {userID}")

        if userID:
            response = requests.put(f'https://probable-yodel-7vprv49qr9vhxq74-3001.app.github.dev/api/authorize_specialist/{userID}', json={"is_authorized": True})
            print(f"PUT request sent to authorize_specialist endpoint for userID: {userID}")

        return jsonify({"message": "Notificación de Mercado Pago recibida y procesada"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
        
@api.route("/authorize_specialist/<int:specialist_id>", methods=["PUT"])
def authorization_specialist(specialist_id):
    try:
        specialist = Specialist.query.get(specialist_id)
        check_authorization = request.json.get("is_authorized")
        print(f"Received is_authorized value for specialist {specialist_id}: {check_authorization}")

        if specialist and check_authorization is not None:
            specialist.is_authorized = check_authorization
            db.session.commit()
            print(f"Updated is_authorized for specialist {specialist_id} to: {check_authorization}")
            return jsonify({"message": "The specialist is authorized!", "specialist_information": specialist.serialize(), 'ok':True}), 200
        else:
            return jsonify({"error": "Invalid request parameters"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api.route("/get_all_specialists", methods=["GET"])
def get_all_specialists():
    try:
        specialists = Specialist.query.all()
        specialists_list = []

        for specialist in specialists:
            specialist_info = {
                "id": specialist.id,
                "first_name": specialist.first_name,
                "last_name": specialist.last_name,
                "email": specialist.email,
                "description": specialist.description,
                "language": specialist.language,
                "phone_number": specialist.phone_number,
                "country_origin": specialist.country_origin,
                "img": specialist.img,
                "is_nurse": specialist.is_nurse,
                "is_physiotherapist": specialist.is_physiotherapist,
                "is_authorized": specialist.is_authorized
            }

            specialists_list.append(specialist_info)

        return jsonify({"specialists": specialists_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@api.route("/get_specialist_info/<int:specialist_id>", methods=["GET"])
def get_specialist_info(specialist_id):
    try:
        specialist = Specialist.query.get(specialist_id)
        
        if specialist:
            specialist_info = {
                "id": specialist.id,
                "first_name": specialist.first_name,
                "last_name": specialist.last_name,
                "email": specialist.email,
                "description": specialist.description,
                "language": specialist.language,
                "phone_number": specialist.phone_number,
                "country_origin": specialist.country_origin,
                "img": specialist.img,
                "is_authorized": specialist.is_authorized,
                "is_physiotherapist": specialist.is_physiotherapist,
                "is_nurse": specialist.is_nurse,
            }

            certificates_info = []
            for certificate in specialist.certificates:
                certificate_info = {
                    "certificate_id": certificate.id,
                    "certificates_url": certificate.certificates_url,
                }
                certificates_info.append(certificate_info)

            specialist_info["certificates"] = certificates_info

            return jsonify({"specialist_info": specialist_info}), 200
        else:
            return jsonify({"error": "Specialist not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("get_certificates_for_specialist/<int:specialist_id>", methods=["GET"])
def get_certificates_for_specialist(specialist_id):
    try:
        specialist = Specialist.query.get(specialist_id)
        if specialist:
            certificates = Certificates.query.filter_by(specialist_id=specialist.id).all()
            certificates_list = [{"id": certificate.id, "certificates_url": certificate.certificates_url} for certificate in certificates]
            return jsonify(certificates_list), 200
        else:
            return jsonify({"error": "Specialist not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("specialist",methods=["GET"])
def get_specialist():
    page=request.args.get("page",default=1,type=int)
    limit=request.args.get("limit",default=10,type=int)
    offset=(page-1)*limit
    total_pages=ceil(Specialist.query.count()/limit)
    total_records=Specialist.query.count()
    prev_url=None
    if page>1:
        prev_url=url_for("api.get_specialist",page=page-1,limit=limit)
    
    next_url=None
    if page<total_pages:
        next_url=url_for("api.get_specialist",page=page+1,limit=limit)

    specialists=Specialist.query.offset(offset).limit(limit).all()

    return jsonify({
        "message":"ok",
        "previous":prev_url,
        "next":next_url,
        "total_records":total_records,
        "total_pages":total_pages,
        "current_page":page,
        "specialists":[specialist.serialize() for specialist in specialists]
    })




@api.route("patient",methods=["GET"])
def get_patient():
    page=request.args.get("page",default=1,type=int)
    limit=request.args.get("limit",default=10,type=int)
    offset=(page-1)*limit
    total_pages=ceil(Patient.query.count()/limit)
    total_records=Patient.query.count()
    prev_url=None
    if page>1:
        prev_url=url_for("api.get_patient",page=page-1,limit=limit)
    
    next_url=None
    if page<total_pages:
        next_url=url_for("api.get_patient",page=page+1,limit=limit)

    patients=Patient.query.offset(offset).limit(limit).all()

    return jsonify({
        "message":"ok",
        "previous":prev_url,
        "next":next_url,
        "total_records":total_records,
        "total_pages":total_pages,
        "current_page":page,
        "patients":[patient.serialize() for patient in patients]
    })

