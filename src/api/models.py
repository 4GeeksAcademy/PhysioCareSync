from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db = SQLAlchemy()




class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    img=db.Column(db.String(250),unique=False,nullable=True)
    phone_number=db.Column(db.String(30),unique=False,nullable=True)
    country_origin=db.Column(db.String(120),unique=False,nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)
    created_at=db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    last_login_at=db.Column( db.DateTime, nullable=True)


    def __repr__(self):
        return f'<Patient {self.first_name}>'


    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "img":self.img,
            "phone_number":self.phone_number,
            "country_origin":self.country_origin,
            "language":self.language,
            "created_at":self.created_at,
            "last_login_at":self.last_login_at
            # do not serialize the password, its a security breach
        }
    

class Certificates(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    certificates_url=db.Column(db.String(400),unique=False,nullable=True)
    specialist_id = db.Column(db.Integer, db.ForeignKey('specialist.id'))
    specialist=db.relationship("Specialist",back_populates="certificates")
    
    def serialize(self):

        return{ 
            "id":self.id,
           "specialist":{
            "id":self.specialist.id,
            "first_name":self.specialist.first_name,
            "last_name":self.specialist.last_name  
           },
            "certificates_url":self.certificates_url,
        }
    
    def serialize_information_certificate(self):
        return{
            "id":self.id,
            "certificates_url": self.certificates_url
        }
    

class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_physiotherapist = db.Column(db.Boolean(), unique=False, nullable=False)
    is_nurse = db.Column(db.Boolean(), unique=False, nullable=False)
    description = db.Column(db.String(2000), unique=False, nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)
    img=db.Column(db.String(400),unique=False,nullable=True)
    phone_number=db.Column(db.String(30),unique=False,nullable=True)
    country_origin=db.Column(db.String(120),unique=False,nullable=True)
    created_at=db.Column(db.DateTime,default=datetime.utcnow,nullable=False)
    last_login_at=db.Column(db.DateTime,nullable=True)
    certificates=db.relationship("Certificates",back_populates="specialist")
    is_authorized=db.Column(db.Boolean(),unique=False,nullable=True)
  

    def __repr__(self):
        return f'<Specialist {self.first_name}>'

    

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_physiotherapist": self.is_physiotherapist,
            "is_nurse": self.is_nurse,
            "description": self.description,
            "language": self.language,
            "img":self.img,
            "phone_number":self.phone_number,
            "country_origin":self.country_origin,
            "created_at":self.created_at,
            "last_login_at":self.last_login_at,
            "certificates":[certificate.serialize_information_certificate() for certificate in self.certificates],
            "is_authorized":self.is_authorized
        }


class Administration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    created_at=db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    last_login_at=db.Column( db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Administration {self.first_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "created_at":self.created_at,
            "last_login_at":self.last_login_at,
         }