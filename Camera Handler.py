import cv2
import face_recognition
#pip install opencv-python
cap = cv2.VideoCapture(0)
while(True):
    ret, frame = cap.read()
    cv2.imshow('frame',frame)
    faces = face_recognition.face_locations(frame)
    print(f'Face count: {len(faces)}')
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
