import requests
import json

USERNAME = "mconstantine@truelightenergy.com"
PASSWORD = "Trueercot#155"
SUBSCRIPTION_KEY = "2f26741bb27a4bc0a03286479f859392"

AUTH_URL = "https://ercotb2c.b2clogin.com/ercotb2c.onmicrosoft.com/B2C_1_PUBAPI-ROPC-FLOW/oauth2/v2.0/token"

# Parameters for the request
payload = {
    'username': USERNAME,
    'password': PASSWORD,
    'grant_type': 'password',
    'scope': 'openid fec253ea-0d06-4272-a5e6-b478baeecd70 offline_access',
    'client_id': 'fec253ea-0d06-4272-a5e6-b478baeecd70',
    'response_type': 'id_token'
}


auth_response = requests.post(AUTH_URL, data=payload)

if auth_response.status_code == 200:
    
    id_token = auth_response.json().get("id_token")
    id_token_json = json.dumps({"id_token": id_token}, indent=4)
    print(id_token_json)
else:
    print("Authentication failed:", auth_response.text)
