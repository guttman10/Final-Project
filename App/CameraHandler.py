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
            while dataset[getWeekday(now.day)][i] != time:
                i += 1
            dataset[getWeekday(now.day)][i + 1] = dataToSet["maxCount"]
            time_ = now.hour
            dataset["suggestion"] = predict(dataset)[0]

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


def get_data(username):
    query = {"user": username, 'name': {'$exists': 1}}
    projection = {'_id': 0, 'name': 1}
    data = list(mycol.find(query, projection))
    name_list = []
    for name in data:
        for key, value in name.items():
            name_list.append(value)
    return name_list


def send_data(name, sendData):
    while True:
        mycol.find_one_and_update(
            {"name": sendData["name"]},
            {"$set":
                 {"load": sendData}
             }, upsert=True
        )
        print("the data sent to server is: ", sendData)
        time.sleep(4)


def run(attraction):
    dataset = getDataFromCsv(attraction)
    data = {"maxCount": 0, "currCount": 0, "meanCount": 0, "name": attraction}
    tServer = threading.Thread(target=send_data, args=("Server Thread", data))
    tServer.daemon = True
    tServer.start()
    atexit.register(writeToCsv, attraction, dataset)
    Start(data, dataset)
