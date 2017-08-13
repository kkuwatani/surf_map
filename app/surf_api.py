import urllib.request
import simplejson as json
from datetime import datetime

spot_key = {'ocean_beach': "4127",
            "linda_mar": "5013",
            "bolinas": "5091",
            "fort_point": "5015",
            "fort_cronkite": "5089"}
update_hour = [5, 11, 17, 23]
update_wind_hour = [2, 5, 8, 11, 14, 17, 20, 23]
significant_swell_sum = 11.5

def surfline_api_request(spot_number, days):
    url = "http://api.surfline.com/v1/forecasts/" \
          + spot_number + "?" \
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
        all_data.append(surfline_api_request(spot_key[key], 1))
    return all_data


def get_current_conditions_summary():
    data = {}

    now = datetime.now()
    now_difference = 24
    # defines which data to grab based on current time
    for i in range(len(update_hour)):
        if abs(now.hour - update_hour[i]) < now_difference:
            now_difference = abs(now.hour - update_hour[i])
            now_index = i
    now_difference = 24
    for i in range(len(update_wind_hour)):
        if abs(now.hour - update_wind_hour[i]) < now_difference:
            now_difference = abs(now.hour - update_wind_hour[i])
            now_wind_index = i

    # grabs average wave height data for each spot
    data['Waves'] = {}
    for key in spot_key:
        spot_data = surfline_api_request(spot_key[key], 1)
        surf_max = spot_data['Surf']['surf_max'][0][now_index]
        surf_min = spot_data['Surf']['surf_min'][0][now_index]
        data['Waves'][key] = round(sum([surf_max + surf_min])/2., 1)

    sf_region_data = surfline_api_request('2957', 1)
    # grabs current wind direction and speed
    data['Wind'] = {}
    data['Wind']['Direction'] = sf_region_data['Wind']['wind_direction'][0][now_wind_index]
    data['Wind']['Speed'] = round(sf_region_data['Wind']['wind_speed'][0][now_wind_index], 1)

    now_difference = 24
    # grabs current Tide height, direction
    data['Tide'] = {}
    for i in range(len(sf_region_data['Tide']['dataPoints'])):
        if sf_region_data['Tide']['dataPoints'][i]['type'] == 'NORMAL':
            this_time = datetime.strptime(sf_region_data['Tide']['dataPoints'][i]['Rawtime'], '%B %d, %Y %H:%M:%S')
            now_timedelta = abs(now - this_time)
            if now_timedelta.total_seconds()/3600 < now_difference:
                now_difference = now_timedelta.total_seconds()/3600
                now_tide_index = i
    data['Tide']['Height'] = round(sf_region_data['Tide']['dataPoints'][now_tide_index]['height'], 1)
    if sf_region_data['Tide']['dataPoints'][now_tide_index+1]['height'] > data['Tide']['Height']:
        data['Tide']['Rise'] = True
    else:
        data['Tide']['Rise'] = False

        # grabs significant swell direction, size, period
    data['Swell'] = {}
    for i in range(1, 6):
        height = 'swell_height' + str(i)
        period = 'swell_period' + str(i)
        direction = 'swell_direction' + str(i)
        if height in sf_region_data['Surf'].keys():
            if sf_region_data['Surf'][height][0][now_index] + sf_region_data['Surf'][period][0][now_index] > significant_swell_sum:
                data['Swell']['Swell' + str(i)] = {}
                data['Swell']['Swell' + str(i)]['Height'] = sf_region_data['Surf'][height][0][now_index]
                data['Swell']['Swell' + str(i)]['Period'] = sf_region_data['Surf'][period][0][now_index]
                data['Swell']['Swell' + str(i)]['Direction'] = sf_region_data['Surf'][direction][0][now_index]
    return data


