# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

import time
import board
import adafruit_dht
import requests

dhtDevice = adafruit_dht.DHT11(board.D18)

url = 'http://192.168.10.210:8000'

while True:
    try:
        temperature_c = dhtDevice.temperature
        humidity = dhtDevice.humidity
        data = {
            "temperature": temperature_c,
            "humidity": humidity
        }
        x = requests.post(url, json = data)
        print(x.text)
        time.sleep(5.0)

    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
