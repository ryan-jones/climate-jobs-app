from flask import Flask
from climate_jobs import get_climate_jobs
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/get_jobs')
def get_jobs():
    return get_climate_jobs()
