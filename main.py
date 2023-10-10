from flask import Flask, render_template, request
from pypresence import Presence
from datetime import datetime
import json
import os
##Setting
now = datetime.now()
app = Flask(__name__)
RPC = Presence(client_id=json.load(open('config.json'))["application ID"])
RPC.connect()

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        ##Get Request
        name = request.form.get("Name")
        picture = request.form.get("Picture")
        state = request.form.get("Task")
        button1 = request.form.get("Button1").split(",")
        button2 = request.form.get("Button2").split(",")
        check1 = request.form.get("Button1Box")
        time = now.strftime("%d/%m/%Y %H:%M:%S")
        ##Update RPC
        try:
            if not (check1):
                RPC.update(state=f"Status: {state}", details=f"Name: {name}", large_image=picture,start=4)
            elif (check1):
                RPC.update(
                    state=f"Status: {state}",
                    details=f"Name: {name}",
                    large_image=picture,
                    buttons=[{"label": button1[0], "url": button1[1]}, {"label": button2[0], "url": button2[1]}],
                    start=4
                )
        except Exception as e:
            print(f"Error updating presence: {e}")
    elif request.method == 'GET':
        return open("index.html", "r").read()
    return open("index.html", "r").read()

##libary
@app.route("/libary/script.js", methods=['GET', 'POST'])
def libaryjs():
    return open("libary/script.js", "r").read()
@app.route("/libary/style.css", methods=['GET', 'POST'])
def libarycss():
    return open("libary/style.css", "r").read()
@app.route("/libary", methods=['GET', 'POST'])
def libarycss():
    return "Nothing is here,This is folder."

if __name__ == "__main__":
    app.run("127.0.0.1", 5000)