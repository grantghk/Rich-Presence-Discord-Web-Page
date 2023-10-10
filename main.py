from flask import Flask, render_template, request
from pypresence import Presence
from datetime import datetime
import json
import os
now = datetime.now()
RPC = Presence(client_id=json.load(open('config.json'))["application ID"])
RPC.connect()
app = Flask(__name__)
@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get("Name")
        picture = request.form.get("Picture")
        state = request.form.get("Task")
        button1 = request.form.get("Button1").split(",")
        button2 = request.form.get("Button2").split(",")
        check1 = request.form.get("Button1Box")
        check2 = request.form.get("Button2Box")
        time = now.strftime("%d/%m/%Y %H:%M:%S")
        try:
            if not (check1 and check2):
                RPC.update(state=f"Doing: {state}", details=f"Name: {name}", large_image=picture)
            elif (check1 and check2):
                RPC.update(
                    state=f"Doing: {state}",
                    details=f"Name: {name}",
                    large_image=picture,
                    buttons=[{"label": button1[0], "url": button1[1]}, {"label": button2[0], "url": button2[1]}]
                )
            elif (check1 or check2):
                if check1:
                    RPC.update(
                        state=f"Doing: {state}",
                        details=f"Name: {name}",
                        large_image=picture,
                        buttons=[{"label": button1[0], "url": button1[1]}]
                    )
                elif check2:
                    RPC.update(
                        state=f"Doing: {state}",
                        details=f"Name: {name}",
                        large_image=picture,
                        buttons=[{"label": button2[0], "url": button2[1]}]
                    )
        except Exception as e:
            print(f"Error updating presence: {e}")

    elif request.method == 'GET':
        return open("index.html", "r").read()

    return open("index.html", "r").read()

if __name__ == "__main__":
    app.run("127.0.0.1", 5000)