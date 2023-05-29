#!/usr/bin/env python3
# coding: utf-8

import sys

from jetson_voice import ASR, AudioInput, ConfigArgParser, list_audio_devices
from http.server import BaseHTTPRequestHandler, HTTPServer
import pyrebase
from datetime import datetime

import pyrebase

config = {
  "apiKey": "AIzaSyBDsVO7xp5JQW2PAw4IqbyzJw5z5h_zmpM",
  "authDomain": "speech-to-text-3ed5b.firebaseapp.com",
  "databaseURL": "https://speech-to-text-3ed5b-default-rtdb.europe-west1.firebasedatabase.app",
  "storageBucket": "speech-to-text-3ed5b.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

temperature = 0
humidity = 0

def piServer():
    class handler(BaseHTTPRequestHandler):
        def do_POST(self):
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()

            content_len = int(self.headers.get('Content-Length'))
            message = self.rfile.read(content_len)
            message = json.loads(message)
            global temperature
            global humidity
            temperature = message['temperature']
            humidity = message['humidity']
            self.wfile.write(bytes(str(message), "utf8"))
            
            #print('merrydo')

    server = HTTPServer(('192.168.10.210', 8000), handler)
    print("SERVER RUNNING")
    server.serve_forever()
    server.server_close()

thr = threading.Thread(target=piServer)
thr.start()
    
parser = ConfigArgParser()

parser.add_argument('--model', default='quartznet', type=str, help='path to model, service name, or json config file')
parser.add_argument('--wav', default=None, type=str, help='path to input wav/ogg/flac file')
parser.add_argument('--mic', default=None, type=str, help='device name or number of input microphone')
parser.add_argument('--list-devices', action='store_true', help='list audio input devices')

args = parser.parse_args()
print(args)
    
# list audio devices
if args.list_devices:
    list_audio_devices()
    sys.exit()
    
# load the model
asr = ASR(args.model)

# create the audio input stream
stream = AudioInput(wav=args.wav, mic=args.mic, 
                     sample_rate=asr.sample_rate, 
                     chunk_size=asr.chunk_size)

# run transcription
for samples in stream:
    results = asr(samples)
    
    if asr.classification:
        print(f"class '{results[0]}' ({results[1]:.3f})")
    else:
        for transcript in results:
            #print(transcript['text'])
            
            if transcript['end']:
                data = {
                    "speech": '\"' + transcript['text'] + '\"',
                    "date": str(datetime.now()),
                    "temperature": temperature,
                    "humidity": humidity
                }

                result = db.child("notificationRequests").push(data)
                print(result)
                print(data)
                print('\n')
                    
print('\naudio stream closed.')