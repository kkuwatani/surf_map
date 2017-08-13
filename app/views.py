from flask import render_template
from app import app
from app import surf_api
from flask import jsonify
from flask import url_for
import os

spot_key = {'ocean_beach': "4127",
            "linda_mar": "5013",
            "bolinas": "5091",
            "pleasure_point": "4190",
            "fort_cronkite": "5089"}

@app.route('/')
@app.route('/index', methods=['GET'])
def index():
    current_data = surf_api.get_current_conditions_summary()
    return render_template('index.html',
                           data=current_data)

@app.route('/update_conditions', methods=['GET'])
def update_conditions():
    current_data = surf_api.get_current_conditions_summary()
    return jsonify(current_data)


@app.route('/spot_forecast/<string:spot>', methods=['GET'])
def get_spot_forecast(spot):
    data = surf_api.surfline_api_request(spot_key[spot], 10)
    return jsonify(data)

# temporary code snippet that ensures CSS is always reloaded by the browser
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)