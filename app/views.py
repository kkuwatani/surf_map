from flask import render_template
from app import app
from app import surf_api

""" Notes...
-Look up how to autorefresh page every hour
-Work on index page styling (bootstrap css)
-Remember JQuery stuff and begin linking divs as buttons
"""

@app.route('/')
@app.route('/index')
def index():
    all_data = surf_api.get_surfline_data_all()

    current_time = all_data[0]['Surf']['startDate_pretty_LOCAL']
    surf_bins = all_data[0]['Surf']['dateStamp'][0]
    # compare current time with time bins via strftime
    # set time index based on comparison

    # repeat process with every 3 hour wind time bins

    # repeat process with hourly tide bins
    surf_index = 0
    wind_index = 0
    tide_index = 0

    return render_template('index.html',
                           all_data=all_data,
                           surf_index=surf_index,
                           wind_index=wind_index,
                           tide_index=tide_index)

@app.route('/lindamar')
def lindamar():
    all_data = surf_api.get_surfline_data("Linda Mar", 10)
    return render_template('spot_forecast.html',
                           all_data=all_data)
