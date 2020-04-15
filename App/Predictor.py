import csv
import random
import datetime

weekDays = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")


def getWeekday(i):
    return weekDays[i]


def generateFakeData(name):
    otp = "T"
    with open(name + '.csv', 'w', newline='') as csvfile:
        spamwriter = csv.writer(csvfile, delimiter=' ',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for day in weekDays:
            for hour in range(1, 25):
                if hour > 8 and not 0:
                    otp = "T"
                else:
                    otp = "F"
                count = random.randint(0, 101)
                spamwriter.writerow([day] + [str(otp)] + [str(hour)] + [str(count)])
    return


def predict(data):
    i = 0
    tlist = []
    day = weekDays[datetime.datetime.today().weekday()]
    while i < len(data[day]):
        if data[day][i] == "T":
            tlist.append((data[day][i + 1], data[day][i + 2]))
        i += 3
    tlist.sort(key=lambda x: x[1])
    i = 0
    now = datetime.datetime.now().hour
    for t in tlist:
        if int(t[0]) < int(now):
            i += 1
        else:
            break
    return tlist[i]


def getDataFromCsv(fname):
    data = {}
    for day in weekDays:
        data[day] = []
    key = ""
    with open(fname + '.csv', 'r', newline='') as csvfile:
        for line in csv.reader(csvfile):
            words = line[0].split()
            firstWord = True
            for word in words:
                if firstWord:
                    key = word
                    firstWord = False
                else:
                    data[key].append(word)
    return data


def writeToCsv(name, data):
    with open(name + '.csv', 'w', newline='') as csvfile:
        spamwriter = csv.writer(csvfile, delimiter=' ',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for key in data:
            i = 0
            while i < len(data[key]):
                spamwriter.writerow([key] + [data[key][i]] + [data[key][i + 1]] + [data[key][i + 2]])

                i += 3


generateFakeData("idk")
d = getDataFromCsv("idk")
predict(getDataFromCsv("idk"))
