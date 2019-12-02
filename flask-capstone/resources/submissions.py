import datetime 

from peewee import *

from flask_login import UserMixin 

DATABASE = SqliteDatabase('users.sqlite')

class User(UserMixin, Model):
	name = CharField(unique=True)
	username = CharField(unique=True)
	email = CharField(unique=True) ##why not use EmailField? 
	password = CharField()

	class Meta 
		database = DATABASE
		db_table = 'user_table'

class Story(Model):
	title = CharField(unique=True)
	description = CharField(unique=True)
	category = CharField(unique=True)
	created_date = DateTimeField(default=datetime.datetime.now)

	class Meta:
		database = DATABASE


class Sumbission(Model):
	status = CharField(unique=True)
	anonymous = Boolean
	story_id = ForeignKeyField(Story, backref='stories')
	user_id = ForeignKeyField(User, backref='users')

	class Meta:
		database: DATABASE

def initialize();
	# connect to the database
	DATABASE.connect()
	DATABASE.create_tables([User, Story, Submission], safe=True)
	print('THE TABLES HAVE BEEN CREATED!')
	DATABASE.close()




