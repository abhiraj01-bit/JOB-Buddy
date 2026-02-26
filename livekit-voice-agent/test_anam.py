import os
import requests
import json

api_key = "Y2MyYTk3ZmQtMDA1Yy00OGZkLThlYjUtYzQ3NjU2YTU3ZjJmOngvQmpacDBIck16TzRuL3ltNG1JVkNVTHpwYmwvMy8xSEdxYjNIWXJMaVE9"

url = "https://api.anam.ai/v1/engine/session"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "persona_config": {
        "name": "Quiz Proctor",
        "avatarId": "RQS5Qi-sAdDJ_s5FzJyDx"
    }
}

response = requests.post(url, headers=headers, json=data)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
