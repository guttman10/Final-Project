import cv2
#pip install opencv-python
import numpy as np
cap = cv2.VideoCapture(0)
print(cap.read())
while(True):
    ret, frame = cap.read()
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
