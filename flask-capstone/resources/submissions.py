import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

from peewee import DoesNotExist

#blueprint 
submissions = Blueprint('submissions', 'submissions')

#route to admin dashboard to get list of submissions waiting approval - works 
@submissions.route('/admin', methods=["GET"])
# the admin must be logged in 
@login_required
def admin_dashboard():
	if current_user.username == 'administrator':
		# models.Submission.select() is taking all of the data from the Sumbission model and storing it into the course_instances variable 
		all_submissions = models.Submission.select()
		# loop through the Submission Model Data(submission_instances) and converting to dictionaries for Python to read
		all_submissions_dict = [model_to_dict(submission) for submission in all_submissions]
		# return the data 
		return jsonify(data=all_submissions_dict, status={
			'code': 200,
			'message': 'These are the submissions submitted by users'
			}), 200
	else: 
		# return error message if data cannot be processed 
		return jsonify(data={}, status={
			'code': 500, 
			'message': 'oops not good'
			}), 500


# User can update a submission - works 
@submissions.route('/<submission_id>/update', methods=["PUT"]) 
@login_required
def resubmit_submission(submission_id):
	payload = request.get_json()
	try:
		query = models.Submission.update(**payload).where(models.Submission.id == submission_id)
		query.execute()
		return jsonify(data=model_to_dict(models.Submission.get_by_id(submission_id)), status={"code": 201, "message": "Submission updated successfuly"}), 201 
	except models.DoesNotExist: 
		return jsonify(data={}, status={"code": 304, "message": "Could not find submission. Not updated successfully."}), 304

# User can delete a submission from their dashboard - works 
@submissions.route('/<submission_id>/delete', methods=["Delete"])
@login_required
def delete_submission(submission_id):
	try:
		query = models.Submission.delete().where(models.Submission.id == submission_id)
		query.execute()
		return jsonify(data="Sumbission was successfully deleted", status={"code": 200, "message": "Submission successfully delted"}), 200
	except models.DoesNotExist:
		return jsonify(data={}, status={"code", 401, "message", "Sumbission was not deleted"}), 401


# User dashboard where user can see their own submissions - works  
@submissions.route('/dashboard/<user_id>', methods=["GET"])
@login_required
def user_dashboard(user_id):
	payload = request.get_json()
	try:
		all_submissions_by_user = models.Submission.select().where(models.Submission.user_id == user_id)
		submissions_by_user_dicts = [model_to_dict(submission) for submission in all_submissions_by_user]

		return jsonify(data=submissions_by_user_dicts, status={
				'code': 200,
				'message': 'These are the submissions the user has created'
				}), 200
	except models.DoesNotExist:
		return jsonify(data={}, status={"code", 500, "message", "Code isn't working"}), 500


# User creates a submission - works 
@submissions.route('/', methods=["POST"])
@login_required
def create_submission():
	payload = request.get_json()
	print(payload)
	submission = models.Submission.create(title=payload["title"], description=payload["description"], category=payload["category"], user_id=current_user.id)
	
	submission_dict = model_to_dict(submission)
	print(submission_dict, 'model to dict')

	submission_dict['user_id'].pop('password')
	return jsonify(data=submission_dict, status={"code": 201, "message": "Submission created successfully!"}), 201


# Admin approves a post - works 
@submissions.route('/<submission_id>/approve', methods=["PUT"])
@login_required
def submission_approved(submission_id):
	payload = request.get_json()
	if current_user.username == 'administrator':
		query = models.Submission.update({models.Submission.status: 'approved'}).where(submission_id == submission_id)
		query.execute()
		return jsonify(data=model_to_dict(models.Submission.get_by_id(submission_id)), status={"code": 200, "message": "Submission status has been updated to approved"}), 200
	else: 
		return jsonify(data={}, status={"code": 304, "message": "The submission status was not updated to approved"}), 304
		

#Admin denies a post - works 
@submissions.route('/<submission_id>/deny', methods=["PUT"])
@login_required
def submission_denied(submission_id):
	payload = request.get_json()
	if current_user.username == 'administrator':
		query = models.Submission.update({models.Submission.status: 'denied'}).where(submission_id == submission_id)
		query.execute()
		return jsonify(data=model_to_dict(models.Submission.get_by_id(submission_id)), status={"code": 200, "message": "Submission status has been updated to denied"}), 200
	else: 
		return jsonify(data={}, status={"code": 304, "message": "The submission status was not updated to denied"}), 304

# shows submission under category 
@submissions.route('/<category>', methods=["GET"])
def show_story_by_category(category):
	try: 
		submissions_approved = models.Submission.select().where(models.Submission.category == category and models.Submission.status == 'approved')
		submissions_approved_dict = [model_to_dict(submission) for submission in submissions_approved]
		return jsonify(data=submissions_approved_dict, status={
			'code': 200,
			'message': 'Success!'
			}), 200
	except models.DoesNotExist:  
		return jsonify(data={}, status={
			'code': 500,
			'message': 'oops not good'
			}), 500





