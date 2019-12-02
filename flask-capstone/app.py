from flask import Flask, jsonify, g
from flask_cors import CORS 

from flask_login import LoginManager 

from resources.stories import stories
from resources.submissions import submissions
from resources.users import users 

import models 

DEBUG = True 
PORT = 8000

app = Flask(__name__)

app.secret_key = "this is a secret key only the user can see"

login_manager = LoginManager()

Login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
	try:
		return models.User.get(models.User.id == user.id)
	except models.DoesNotExist:
		return None 

@login_manager.unauthorized_handler
def unauthorized():
	return jsonify(data={'error': 'User not logged in.'}, status={'code': 401, 'message': "You must be logged in to access that resource"}), 401

CORS(stories, origins=['http://localhost:3000'], supports_credentials=True)
CORS(submissions, origins=['http://localhost:3000'], supports_credentials=True)
CORS(users, origins=['https://localhost:3000'], supports_credentials=True)

app.register_blueprint(stories, url_prefix='/api/v1/stories')
app.register_blueprint(submissions, url_prefix='/api/v1/submissions')
app.register_blueprint(users, url_prefix='/api/v1/users')

@app.after_request
def after_request(response):
	# "Close the database connection after each request"
	g.db.close()
	return response

# to test that this is actually working 
@app.route('/')
def index():
	return 'Hello, world!'

if __name__ == '__main__':
	models.initialize()
	app.run(debug=DEBUG, port=PORT)



