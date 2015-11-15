from flask import Flask, request, session, render_template, jsonify, redirect, url_for, send_from_directory, Response
from werkzeug import secure_filename
from flask.ext.socketio import SocketIO, send, emit
from os import path, listdir
import os
import json
import re
import random
import subprocess

app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True

@app.route('/')
def get_index():
    return render_template('index.html')

@app.route('/begin')
def begin_session():
    global a
    print "session began"
    return 'session began'
    
@app.route('/end')
def end_session():
    print "session ended"
    return 'session ended'

@app.route('/accel', methods=['POST'])
def accel():
    print "got data!"
    data = request.data
    json_data = json.loads(data)
    socketio.emit('accel data', {'data': json_data})
    return 'ack', 202

@socketio.on('connect')
def sock_connect():
    print "client connected"

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
