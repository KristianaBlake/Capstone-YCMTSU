import models 

from flask import request, jsonify, Blueprint 

from peewee import DoesNotExist 

from flask_bcrypt import generate_password_hash, check_password_hash

from flask_login import login_user, current_user, logout_user, login_required 

from playhouse.shortcuts import model_to_dict 

users = Blueprint('users', 'users')

# registers users and administrator - works 
@users.route('/register', methods=["POST"])
def register():
	# grab the user 
	payload = request.get_json()
	# make the email lowercase 
	payload['email'].lower()

	try: 
		# query/check their username against the database 
		models.User.get(models.User.username == payload['username'])

		# return the error if there is a username like that that already exists in the database
		return jsonify(
			data={},
			status={"code": 401,
					"message": 'This username already exists. Create a new one.'}
		), 401

	except DoesNotExist:

		try: 
			# query/check their email against the database 
			models.User.get(models.User.email == payload['email'])

			# return the error if there is an email like that that already exists in the database
			return jsonify(
				data={},
				status={"code": 401,
						"message": "A user with this email already exists"}
				), 401

		except DoesNotExist:

			# if the user was not already in the database 
			payload['password'] = generate_password_hash(payload['password'])

			# spread operator
			user = models.User.create(**payload)

			# this logs in user 

			login_user(user)

			# makes into dictionary 
			user_dict = model_to_dict(user)

			# delete password
			del user_dict['password']

			# return good response 
			return jsonify(
				data=user_dict,
				status={"code": 201, "message": "Successfully registered {}".format(user_dict['name'])}
			), 201

# login route for user and administrator 
@users.route('/login', methods=['POST'])
def login():
	payload = request.get_json()
	try:
		#look up user by username 
		user = models.User.get(models.User.username == payload['username'])
		# convert user into dictionary 
		user_dict = model_to_dict(user)
		# check users passwrod using bcrypt
		if(check_password_hash(user_dict['password'], payload['password'])):
			# log in the user 
			login_user(user)
			del user_dict['password']
			# return good news
			return jsonify(data=user_dict, status={'code': 200, 'message': "Successfully logged in {}".format(
				user_dict['username'])}), 200
		else:
			# return the error 
			return jsonfiy(data={}, status={'code': 401, 'message': 'Email or password is incorrect'}), 401
	except models.DoesNotExist:
		#the email is not found 
		return jsonify(data={}, status={'code': 401, 'message': 'Email or password is incorrect'}), 401


# logout route -works
@users.route('/logout', methods=['GET'])
def logout():
	# get the username of user
	username = model_to_dict(current_user)['username']
	# logs out the user
	logout_user()
	return jsonify(data={}, status={
		'code': 200,
		'message': "Successfully logged out {}".format(username)
	})

# # administrator login to see all submissions
# @users.route('/admin-login', methods=["GET"])
# def list_all_submissions():
# 	payload = request.get_json()
# 	if current_user.username == 'administrator':
# 		all_submissions = models.User.select()
# 		# loop through all the submission ids (conver to dictionaries)
# 		submission_dict = [model_to_dict(submission) for submissions in all_submissions]
# 		# return the list of submission dicts
# 		return jsonify(data=submission_dict, status={
# 			'code': 200,
# 			'message': "you will be able to see all the story submissions from users"
# 			})
# 	else: 
# 		return jsonify(data={}, status={
# 			'code': 401,
# 			'message': "you will NOT be able to see all the story submissions from users"
# 			})


