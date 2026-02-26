import requests
import json

api_key = "Y2MyYTk3ZmQtMDA1Yy00OGZkLThlYjUtYzQ3NjU2YTU3ZjJmOngvQmpacDBIck16TzRuL3ltNG1JVkNVTHpwYmwvMy8xSEdxYjNIWXJMaVE9"
url = "https://api.anam.ai/v1/personas"

headers = {
    "Authorization": f"Bearer {api_key}"
}

response = requests.get(url, headers=headers)
print(response.json())
