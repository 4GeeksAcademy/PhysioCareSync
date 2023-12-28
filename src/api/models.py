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
    

class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_physiotherapist = db.Column(db.Boolean(), unique=False, nullable=False)
    is_nurse = db.Column(db.Boolean(), unique=False, nullable=False)
    certificate = db.Column(db.String(400), unique=False, nullable=True)
    description = db.Column(db.String(2000), unique=False, nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)
    img=db.Column(db.String(400),unique=False,nullable=True)
    phone_number=db.Column(db.String(30),unique=False,nullable=True)
    country_origin=db.Column(db.String(120),unique=False,nullable=True)
    created_at=db.Column(db.DateTime,default=datetime.utcnow,nullable=False)
    last_login_at=db.Column(db.DateTime,nullable=True)


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
            "certificate": self.certificate,
            "description": self.description,
            "language": self.language,
            "img":self.img,
            "phone_number":self.phone_number,
            "country_origin":self.country_origin,
            "created_at":self.created_at,
            "last_login_at":self.last_login_at
        }



