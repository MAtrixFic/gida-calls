import requests

class ApiWorker:
    def __init__(self, _api_url):
        self.api_url = _api_url

    ip = 'http://localhost:3001/'

    def GetData(self):
        res = requests.get(f'{self.ip}{self.api_url}')
        return res.json()