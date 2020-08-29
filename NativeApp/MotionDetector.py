import numpy as np
import cv2


def distMap(frame1, frame2):
    """outputs pythagorean distance between two frames"""
    frame1_32 = np.float32(frame1)
    frame2_32 = np.float32(frame2)
    diff32 = frame1_32 - frame2_32
    norm32 = np.sqrt(diff32[:, :, 0] ** 2 + diff32[:, :, 1] ** 2 + diff32[:, :, 2] ** 2) / np.sqrt(
        255 ** 2 + 255 ** 2 + 255 ** 2)
    dist = np.uint8(norm32 * 255)
    return dist


def getMotion(frame_A, frame_B):
    frame1 = frame_A.copy()
    frame2 = frame_B.copy()
    rows, cols, _ = np.shape(frame2)
    dist = distMap(frame1, frame2)
    # apply Gaussian smoothing
    mod = cv2.GaussianBlur(dist, (9, 9), 0)

    _, thresh = cv2.threshold(mod, 100, 255, 0)
    _, stDev = cv2.meanStdDev(mod)

    if stDev > 10:
        return True
    else:
        return False
