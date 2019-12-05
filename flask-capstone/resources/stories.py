import models 

from flask import Blueprint, jsonify, request 

from flask_login import current_user, login_required

from playhouse.shortcuts import model_to_dict

# blueprint
stories = Blueprint('stories', 'stories')

# shows stories under category 
@stories.route('/<category>', methods=["GET"])
def show_story_by_category(category):
	payload = request.get_json()
	try: 
		story_by_category = models.Story.select().where(models.Story.category == category)
		story_dict = [model_to_dict(story) for story in story_by_category]
		return jsonify(data=story_instances_dict, status={
			'code': 200,
			'message': 'Success!'
			}), 200
	except models.DoesNotExist:  
		return jsonify(data={}, status={
			'code': 500,
			'message': 'oops not good'
			}), 500

# # submission changes to a story 
# @stories.route('/<submission_id>', methods=["POST"])
# @login_required
# def post_approved(submission_id):
# 	payload = request.get_json()
# 	if (current_user.username == 'administrator' and Submission.status == 'approved'):
# 		story = models.Submission.create(title=payload["title"], description=payload["description"], category=payload["category"], anonymous=payload["anonymous"], email=payload["email"])
# 		story_dict = model_to_dict(story)
# 		return jsonify(data=story_dict, status={"code": 201, "message": "Sumbission has been created to Story"}), 202
# 	else:
# 		return jsonify(data={}, status={"code": 304, "message": "The Submission was not created to a Story."}), 304


