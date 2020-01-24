import cv2
import face_recognition
#pip install opencv-python
cap = []
faceCounts = []
camLoop = True
i = 0
while camLoop is not False:
    capTest = cv2.VideoCapture(i)
    camLoop, spoof = capTest.read()
    if camLoop is False:
        break
    cap.insert(i, cv2.VideoCapture(i))
    faceCounts.insert(i, 0)
    i += 1
    capTest.release()


while(True):
    i = 0
    while i < len(cap):
        ret, frame = cap[i].read()
        cv2.imshow(f'frame{i}', frame)
        faceCounts[i] = len(face_recognition.face_locations(frame))
        i += 1
        print(f'Face count: {faceCounts}')
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


for cam in cap:
    cam.release()
cv2.destroyAllWindows()
