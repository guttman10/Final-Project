import cv2
import face_recognition

from MotionDetector import GetMotion
from ImageComapre import compare
import threading
import time
# pip install opencv-python


def getBusyStatus(diff, maxCount, count):
    val = 0
    if maxCount != 0:
        val = (1 - diff) * (count/maxCount)
    print(val)
    return val


def Start(dataToSet):
    cameraPort = 0
    cap = cv2.VideoCapture(cameraPort)
    _, mainFrame = cap.read()
    totalCounts = 0
    countInstanced = 0
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        if ret:
            ret2, frame2 = cap.read()
        # if everything was captured correctly continue
        if ret2:
            score, count = compare(mainFrame, frame2)
            mov = GetMotion(frame, frame2)
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
            busyTemp = getBusyStatus(score, dataToSet["maxCount"], dataToSet["currCount"])
            if busyTemp < 1/6:
                dataToSet["busy"] = "Almost empty"
            elif busyTemp < 3/6:
                dataToSet["busy"] = "Somewhat vacant"
            else:
                dataToSet["busy"] = "Almost Full"
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break


def send_data(name, sendData):
    while True:
        print("the data that was suppose to be sent is", sendData)
        time.sleep(2)


if __name__ == "__main__":
    data = {"maxCount": 0, "currCount": 0, "meanCount": 0}
    tServer = threading.Thread(target=send_data, args=("Server Thread", data))
    tServer.daemon = True
    tServer.start()
    Start(data)
