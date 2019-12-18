import datetime 

from peewee import *

from flask_login import UserMixin 

DATABASE = SqliteDatabase('users.sqlite')

class User(UserMixin, Model):
	name = CharField(unique=True)
	username = CharField(unique=True)
	email = CharField(unique=True) 
	password = CharField()

	class Meta: 
		database = DATABASE
		db_table = 'user_table'

class Submission(Model):
	title = CharField()
	description = CharField()
	status = CharField(default="pending") # default pending
	user_id = ForeignKeyField(User, backref='submissions')
	

	class Meta:
		database = DATABASE
		
def initialize():
	# connect to the database
	DATABASE.connect()
	DATABASE.create_tables([User, Submission], safe=True)
	print('THE TABLES HAVE BEEN CREATED!')
	DATABASE.close()




