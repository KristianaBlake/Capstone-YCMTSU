import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

#blueprint 
submissions = Blueprint('submissions', 'submissions')

#route to admin dashboard to get list of submissions waiting approval 
@submissions.route('/admin', methods=["GET"])
# the admin must be logged in 
@login_required
def admin_dashboard():
	if current_user.username == 'administrator':
		#declar payload variable 
		payload = request.get_json()
		# models.Submission.select() is taking all of the data from the Sumbission model and storing it into the course_instances variable 
		submission_instance = models.Submission.select()
		# loop through the Submission Model Data(submission_instances) and converting to dictionaries for Python to read
		submission_instance_dict = [model_to_dict(submissions) for submissions in submission_instance]
		# return the data 
		return jsonify(data=submission_instances_dict, status={
			'code': 200,
			'message': 'These are the submissions submitted by users'
			}), 200
	else: 
		# return error message if data cannot be processed 
		return jsonify(data={}, status={
			'code': 500, 
			'message': 'oops not good'
			}), 500


# User can update a submission 
@submissions.route('/<submission_id', methods=["PUT"])
@login_required
def update_submission(submission_id):
	try:
		payload = request.get_json()
		query = models.Submission.update(**payload).where(models.Submission.id == id)
		query.execute()
		return jsonify(data=model_to_dict(models.Submission.get_by_id(id)), status={"code": 200, "message": "Submission updated successfuly"}), 200 
	except models.DoesNotExist: 
		return jsonify(data={}, status={"code": 401, "message": "Could not find submission. Not updated successfully."}), 401

# User can delete a submission from their dashboard
@submissions.route('/<submission_id', method=["Delete"])
@login_required
def update_submission(submission_id):
	try:
		query = moels.Submission.delete().where(models.Submission.id == id)
		query.execute()
		return jsonify(data="Sumbission was successfully deleted", status={"code": 200, "message": "Submission successfully delted"}), 200
	else:
		return jsonify(data={}, status={"code", 401, "message", "Sumbission was not deleted"}), 401


# User dashboard where use can see their own submissions/stories
@submissions.route('/<user_id>', methods=["GET"])
@login_required
def user_dashboard(user_id):
	try:
		if current_user.id == user_id:
			payload = request.get_json()
			# models.Submission.select() is taking all of the data from the Sumbission model and storing it into the course_instances variable 
			submission_instance = models.Submission.select()
			# loop through the Submission Model Data(submission_instances) and converting to dictionaries for Python to read
			submission_instance_dict = [model_to_dict(submissions) for submissions in submission_instance]
			# return the data 
			return jsonify(data=submission_instance_dict, status={
				'code': 200,
				'message': 'These are the submissions the user has created'
				}), 200
		else: 
			# return error message if data cannot be processed 
			return jsonify(data={}, status={
				'code': 500, 
				'message': 'oops not good'
				}), 500


# User submits story for approval (CREATE)
@sumbissions.route('/', methods=["POST"])
@login_required
def submit_submission():
	try: 
		payload.request.get_json()
		submission = models.Submission.create(title=payload["title"], description=payload["description"], category=payload["category"], anonymous = payload["anonymous"])
		submission_dict = model_to_dict(submission)
		return jsonify(data=submission_dict, status={"code": 201, "message": "Submission created successfully!"}), 201
	else:
		return jsonify(data={}, status={"code": 404, "message": "Submission could not be created"}), 404






