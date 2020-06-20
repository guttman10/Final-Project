import cv2
import pymongo
from App.MotionDetector import getMotion
from App.ImageComapre import compare
from App.Predictor import predict, writeToCsv, getDataFromCsv, getWeekday
import threading
import time
import atexit
import datetime

# pip install opencv-python
# pip install pymongo[srv]
# pip install scikit-image
myclient = pymongo.MongoClient('mongodb+srv://admin:admin@monitour-t8pfj.mongodb.net/load_data')
mydb = myclient["load_data"]
mycol = mydb["data"]

x = mycol.find_one()


def getBusyStatus(diff, maxCount, count):
    val = 0
    if maxCount != 0:
        val = (1 - diff) * (count / maxCount)
    return val


def Start(dataToSet, dataset):
    dataToSet["suggestion"] = predict(dataset)[0]
    now = datetime.datetime.now()
    time_ = now.hour
    cameraPort = 0
    cap = cv2.VideoCapture(cameraPort)
    _, mainFrame = cap.read()
    totalCounts = 0
    countInstanced = 0
    while True:
        i = 0
        # Capture frame-by-frame
        ret, frame = cap.read()
        if ret:
            ret2, frame2 = cap.read()
        # if everything was captured correctly continue
        if ret2:
            score, count = compare(mainFrame, frame2)
            mov = getMotion(frame, frame2)
            if score < 0.95 and mov:
                totalCounts += count
                countInstanced += 1
                # test and set Max count
                if count > dataToSet["maxCount"]:
                    dataToSet["maxCount"] = count
                # set the mean
                dataToSet["meanCount"] = totalCounts / countInstanced
                # set the current count
                dataToSet["currCount"] = count
            dataToSet["busy"] = getBusyStatus(score, dataToSet["maxCount"], dataToSet["currCount"])

        now = datetime.datetime.now()
        if now.hour != time_:
            if time_ == 23:
                while dataset[getWeekday(now.day)][i] != time:
                    i += 1
            dataset[getWeekday(now.day)][i + 1] = dataToSet["maxCount"]
            time_ = now.hour
            dataset["suggestion"] = predict(dataset)[0]

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


def get_data(username):
    query = {"user": username}
    projection = {'_id': 0, 'name': 1, 'subAtt.name': 1}
    name_dict = {}
    keys = []
    values = []
    for data in mycol.find(query):
        keys += [data["name"]]

    for data in mycol.find(query, {'subAtt.name': 1}):
        values += [data["subAtt"]]

    name_list = dict(zip(keys, zip(values)))
    for names in name_list:
        name_dict[names] = []
        for items in name_list[names]:
            for x in items:
                name_dict[names].append(x["name"])

    return name_dict

def get_subAtt(username, attraction, subAttraction):
    query = {"user": username, "name": attraction}
    projection = {'_id': 0,'subAtt': 1}
    values = []
    for data in mycol.find(query,  projection):
        values += [data["subAtt"]]
    return data

def send_data(name, sendData):
    subAtt = get_subAtt(sendData["user"],sendData["name"],sendData["subAtt"])
    while True:

        newData = {"maxCount": sendData["maxCount"], "currCount": sendData["currCount"],
                   "meanCount": sendData["meanCount"], "suggestion": sendData["suggestion"], "busy": sendData["busy"]}
        i = 0
        while i < len(subAtt["subAtt"]):
            if subAtt["subAtt"][i]["name"].strip() == sendData["subAtt"].strip():
                subAtt["subAtt"][i]["load"] = newData
                break
            i += 1
        mycol.find_one_and_update(
            {"name": sendData["name"]},

            {"$set":
                 subAtt
             }, upsert=True
        )
        print("the data sent to server is: ", subAtt)
        time.sleep(4)


def run(attraction, subAtt, username):
    dataset = getDataFromCsv(subAtt)
    data = {"user" : username,"maxCount": 0, "currCount": 0, "meanCount": 0, "name": attraction, "subAtt": subAtt, "suggestion": 0, "busy":0}
    tServer = threading.Thread(target=send_data, args=("Server Thread", data))
    tServer.daemon = True
    tServer.start()
    atexit.register(writeToCsv, attraction, dataset)
    Start(data, dataset)


get_data("admin")
