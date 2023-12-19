from flask_mongoengine import MongoEngine
from mongoengine import StringField, ReferenceField

db = MongoEngine()

class Itinerary(db.Document):
    title = db.StringField(required=True)
    description = StringField(required=True)
    user = ReferenceField('User')
    meta = {
        'collection': 'Itinerary'
    }
