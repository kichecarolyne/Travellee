from flask_mongoengine import MongoEngine


db = MongoEngine()



class User(db.Document):
    email = db.StringField(required=True)
    name = db.StringField(required=True)
    phone = db.StringField(required=True)
    password = db.StringField(required=True)
    cpassword = db.StringField(required=True)
    tokens = db.ListField(db.DictField())
    meta = {
        'collection': 'User'
    }
