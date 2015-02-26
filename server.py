from sys import stdout, stdin
import json
from time import sleep

from pymongo import MongoClient


online_users=[]

def sendGlobalMessage(input):
    if input !="":
        print(input)
        stdout.flush()
    return

def runtime():
    #initiate
    client = MongoClient('localhost', 27017)
    db = client.battlesnake
    online_players = db.online_players

    while True:
        message=None
        # check stdin
        message = json.loads(stdin.readline().rstrip('\n'))
        if message['type'] == 'connect':
            sendGlobalMessage(json.dumps(message['content']))
            online_players.insert(message)

if __name__ == "__main__":
    runtime()
