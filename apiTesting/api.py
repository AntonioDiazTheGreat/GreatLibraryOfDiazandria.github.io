import requests
import json
from pprint import pprint

def get_info(call):
    r = requests.get(call)
    return r.json()

json_file_path = "Repo/apiTesting/output.json"
js_param_file_path = "parameter.txt"

name = "Toni_Pepperoni"
uuid = "9ba3594e-72dd-40e1-90ea-5d0b4fe2e57d"
api_key = "1514b471-471e-4094-bd16-80ffef5da9ef"

uuid_link = f"https://api.hypixel.net/v2/skyblock/profiles?key={api_key}&uuid={uuid}"


pprint(get_info(uuid_link))
