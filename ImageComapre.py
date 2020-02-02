from skimage.metrics import structural_similarity
import cv2
import numpy as np


def compare(a, b ,x):
    before = a
    after = b
    before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)
    count = 0
    (score, diff) = structural_similarity(before_gray, after_gray, full=True)
    #show the image with several difference measurements
    diff = (diff * 255).astype("uint8")
    thresh = cv2.threshold(diff, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    contours = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = contours[0] if len(contours) == 2 else contours[1]
    mask = np.zeros(before.shape, dtype='uint8')
    filled_after = after.copy()
    for c in contours:
        area = cv2.contourArea(c)
        if area > x:
            count += 1
            x,y,w,h = cv2.boundingRect(c)
            cv2.rectangle(filled_after, (x, y), (x + w, y + h), (36,255,12), 2)
            cv2.drawContours(mask, [c], 0, (0,255,0), -1)

    cv2.imshow('after', filled_after)
    cv2.imshow('mask',mask)
    cv2.waitKey(1)
    return score, count


