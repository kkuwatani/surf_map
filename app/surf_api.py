import datetime
import urllib.request
import simplejson as json
import time
import serial
from decimal import *

spot_key = {'Ocean Beach': "4127",
            "Linda Mar": "5013",
            "Bolinas": "5091",
            "Pleasure Point": "4190",
            "Fort Cronkite": "5089"}

def get_surfline_data(spot_name, days):
    url = "http://api.surfline.com/v1/forecasts/" \
          + spot_key[spot_name] + "?" \
          "resources=surf,analysis,wind,tide&" \
          "days=" + str(days) + "&" \
          "getAllSpots=false&" \
          "units=e&" \
          "interpolate=false&" \
          "showOptimal=false"
    webreq = urllib.request.Request(url, None, {'user-agent': 'syncstream/vimeo'})
    opener = urllib.request.build_opener()
    f = opener.open(webreq)
    fstr = f.read()
    return json.loads(fstr)

def get_surfline_data_all():
    all_data = []
    for key in spot_key:
        all_data.append(get_surfline_data(key, 1))
    return all_data

data = get_surfline_data_all()
print(data)

# class SurfSpot:
#
#     def __init__(self, spot_name):
#         url = "http://api.surfline.com/v1/forecasts/",\
#               str(spot_key[spot_name]), "?" \
#               "days=10&" \
#               "resources = surf, analysis, wind&" \
#               "getAllSpots=false&" \
#               "units=e&" \
#               "interpolate=false&" \
#               "showOptimal=false"
#         webreq = urllib.request.Request(url, None, {'user-agent': 'syncstream/vimeo'})
#         opener = urllib.request.build_opener()
#         f = opener.open(webreq)
#         fstr = f.read()
#         data = json.loads(fstr)
#
#         self.spot_name = spot_name
#         self.swell = {"height": [], "period": [], "direction": []}
#         for i in range(3):
#             self.swell["height"].append(data["Surf"]["swell_height" + str(i + 1)])
#             self.swell["period"].append(data["Surf"]["swell_period" + str(i + 1)])
#             self.swell["direction"].append(data["Surf"]["swell_direction" + str(i + 1)])
#         self.wind = {"speed": data["wind_speed"], "direction": data["wind_direction"]}
#         # for i in range(self.wind["speed"]):
#         #     for j in range(self.wind["speed"][i]:
#         #         if j%2 is 0:
#         #             del self.wind["speed"][i][j]
#         #             del self.wind["direction"][i][j]
#         self.tide = data["Tide"]["dataPoints"]
#         self.water_temp_current = ((data["WaterTemp"]["watertemp_max"]+data["WaterTemp"]["watertemp_max"])/2)


