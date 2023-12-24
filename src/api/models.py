from flask_sqlalchemy import SQLAlchemy



db = SQLAlchemy()


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    img=db.Column(db.String(250),unique=False,nullable=True)
    phone_number=db.Column(db.Integer,unique=False,nullable=True)
    country_origin=db.Column(db.String(120),unique=False,nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)


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
            "language":self.language
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
    certificate = db.Column(db.String(250), unique=False, nullable=True)
    description = db.Column(db.String(250), unique=False, nullable=True)
    language = db.Column(db.String(120), unique=False, nullable=True)
    img=db.Column(db.String(250),unique=False,nullable=True)
    phone_number=db.Column(db.Integer,unique=False,nullable=True)
    country_origin=db.Column(db.String(120),unique=False,nullable=True)


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
            "country_origin":self.country_origin
        }



