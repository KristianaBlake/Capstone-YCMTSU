import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

from peewee import DoesNotExist

#blueprint 
submissions = Blueprint('submissions', 'submissions')



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
	submission = models.Submission.create(title=payload["title"], description=payload["description"], user_id=current_user.id)
	
	submission_dict = model_to_dict(submission)
	print(submission_dict, 'model to dict')

	submission_dict['user_id'].pop('password')
	return jsonify(data=submission_dict, status={"code": 201, "message": "Submission created successfully!"}), 201







