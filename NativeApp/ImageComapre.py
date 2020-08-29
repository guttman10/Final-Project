from skimage.metrics import structural_similarity
import cv2
import numpy as np


def compare(a, b):
    # a frame 1
    # b frame 2
    before = a
    after = b
    before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)
    count = 0
    (score, diff) = structural_similarity(before_gray, after_gray, full=True)
    # show the image with several difference measurements
    diff = (diff * 255).astype("uint8")
    thresh = cv2.threshold(diff, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    contours = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = contours[0] if len(contours) == 2 else contours[1]
    mask = np.zeros(before.shape, dtype='uint8')
    contoursimage = after.copy()
    for c in contours:
        area = cv2.contourArea(c)
        if area > 2550:
            count += 1
            x, y, w, h = cv2.boundingRect(c)
            cv2.rectangle(contoursimage, (x, y), (x + w, y + h), (36, 255, 12), 2)
    cv2.imshow("frame", contoursimage)
    cv2.waitKey(1)
    return score, count
