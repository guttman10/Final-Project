import cv2
import pymongo
from App.MotionDetector import getMotion
from App.ImageComapre import compare
from App.Predictor import predict, writeToCsv, getDataFromCsv
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
name = "idk"  # need to get it from server


def getBusyStatus(diff, maxCount, count):
    val = 0
    if maxCount != 0:
        val = (1 - diff) * (count / maxCount)
    return val


def Start(dataToSet):
    dataset = getDataFromCsv(name)
    data["suggestion"] = predict(dataset)[0]
    now = datetime.datetime.now()
    time = now.hour
    cameraPort = 0
    cap = cv2.VideoCapture(cameraPort)
    _, mainFrame = cap.read()
    totalCounts = 0
    countInstanced = 0
    while True:
        now = datetime.datetime.now()
        if now.hour != time:
            time = now.hour
            data["suggestion"] = predict(dataset)[0]
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

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


def send_data(name, sendData):
    while True:
        mycol.find_one_and_update(
            {"name": "Louvre"},
            {"$set":
                 {"load": sendData}
             }, upsert=True
        )
        print("the data sent to server is: ", sendData)
        time.sleep(2)


if __name__ == "__main__":
    data = {"maxCount": 0, "currCount": 0, "meanCount": 0}
    tServer = threading.Thread(target=send_data, args=("Server Thread", data))
    tServer.daemon = True
    tServer.start()
    Start(data)

atexit.register(writeToCsv(name, data))
