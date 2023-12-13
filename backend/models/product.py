from flask_mongoengine import MongoEngine


db = MongoEngine()



class Product(db.Document):
    name = db.StringField(required=True)
    ratings = db.ListField(db.IntField())
    comments = db.ListField(db.DictField())
    meta = {
        'collection': 'Product'
    }
