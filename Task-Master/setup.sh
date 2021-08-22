#!/bin/bash

yarn install
python3 -m venv venv
source venv/bin/activate
pip3 install pip==20.0.2
pip3 install -r requirements.txt
deactivate
yarn migrate
