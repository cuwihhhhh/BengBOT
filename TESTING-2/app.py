from process import preparation, generate_response
from flask import Flask, render_template, request

import os
import logging

# download nltk
preparation()

#Start Chatbot
app = Flask(__name__)

# Set TensorFlow logging level to suppress warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # or '3' to suppress all messages
# or
logging.getLogger('tensorflow').setLevel(logging.ERROR)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    user_input = str(request.args.get('msg'))
    result = generate_response(user_input)
    return result

if __name__ == "__main__":
    app.run(debug=True)