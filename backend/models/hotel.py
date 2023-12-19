from flask_mongoengine import MongoEngine


db = MongoEngine()



class Hotel(db.Document):
    name = db.StringField(required=True)
    ratings = db.ListField(db.IntField())
    comments = db.ListField(db.DictField())
    users_who_favorited = db.ListField(db.ReferenceField('User'))
    meta = {
        'collection': 'Hotel'
    }
