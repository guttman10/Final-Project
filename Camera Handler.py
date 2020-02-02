import cv2
import face_recognition
from MotionDetector import GetMotion
from ImageComapre import compare
from BlobCounter import blobCount
import numpy as np
#pip install opencv-python

cap = cv2.VideoCapture(0)
_, mainFrame = cap.read()
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    ret, frame2 = cap.read()
    score = compare(frame, frame2)
    mov = GetMotion(frame, frame2)
    # Display the resulting frame
    cv2.imshow('Main', frame)
    print(score, mov)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
