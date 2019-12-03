import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

#blueprint 
submissions = Blueprint('submissions', 'submissions')

#route to admin dashboard to get list of submissions waiting approval 
@submissions.route('/', methods=["GET"])
# the admin must be logged in 
@login_required
def show_submissions():
	if current_user.username == 'administrator':
		#declar payload variable 
		payload = request.get_json()
		# models.Submission.select() is taking all of the data from the Sumbission model and storing it into the course_instances variable 
		submission_instances = models.Submission.select()
		# loop through the Submission Model Data(submission_instances) and converting to dictionaries for Python to read
		submission_instances_dict = [model_to_dict(submissions) for submissions in submission_instances]
		# return the data 
		return jsonify(data=course_instances_dict, status={
			'code': 200,
			'message': 'Success'
			}), 200
	except: 
		# return error message if data cannot be processed 
		return jsonify(data={}, status={
			'code': 500, 
			'message': 'oops not good'
			}), 500

# admin approve a post 
@submissions.route('/<submission_id>', methods=["POST"])
@login_required
def post_approved(submission_id):
	if current_user.username == 'administrator':
		payload = request.get_json()
		submission_instances = models.Submission.select().where(models.Submission.id == submission_id)
		submission_instances_dict = [model_to_dict(submissions) for submissions in submission_instances]
		return jsonify(data=model_to_dict(model.Submission.get_by_id(submission_id)), "message": "submission was posted successfully"), 200
	else:
		return jsonify(data={}, status={"code": 403, "message": "The message cann't post."}), 403










