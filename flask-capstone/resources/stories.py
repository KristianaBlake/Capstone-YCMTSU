import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

# blueprint
stories = Blueprint('stories', 'stories')

# user dashboard, where use can see stories submitted 
@stories.route('/', methods=["GET"])
@login_required
def list_stories_by_username():
	try: 
		payload = request.get_json()
		#models.Story.select() is taking all of the data from the Story model and storing it into the story_instance variable
		story_instance = models.Story.select()
		# loop through the Story Model Data (story_istance) and converting to dictionaries for Python to read 
		story_instances_dict = [model_to_dict(stories) for stories in story_instances]
		# return the data 
		return jsonify(data=story_instances_dict, status={
			'code': 200,
			'message': 'Success'
			}), 200
	except: 
		# return error message if data cannot be processed 
		return jsonify(data={}, status={
			'code': 500,
			'message': 'oops not good'
			}), 500 

# shows stories under category 
@stories.route('/<category>', methods=["GET"])
def show_story_by_category(category):
	try: 
		payload = request.get_json()
		# models.Story.select() is taking all of the data fromt he Story model and storing it into the course_instances variable 
		story_instance = models.Story.select().where(models.Story.category == category)
		story_instances_dict = [model_to_dict(stories) for stories in story_instances]
		print(story_instances_dict)
		return jsonify(data=story_instances_dict, status={
			'code': 200,
			'message': 'Success'
			}), 200
	except: 

		return jsonify(data={}, status={
			'code': 500,
			'message': 'oops not good'
			}), 500

# admin approve a post (CREATE)
@stories.route('/<submission_id>', methods=["POST"])
@login_required
def post_approved(submission_id):
	if current_user.username == 'administrator':
		payload = request.get_json()
		story_instances = models.Story.select().where(models.Story.submission_id == submission_id)
		# model to dict of story instances = the q
		story_instances_dict = [model_to_dict(stories) for stories in story_instances]
		# query = something 
		# then take the model to dict of that variable 
		return jsonify(data=model_to_dict(model.Submission.get_by_id(submission_id)), status={"message": "submission was posted successfully"}), 200
	else:
		return jsonify(data={}, status={"code": 403, "message": "The message cann't post."}), 403


