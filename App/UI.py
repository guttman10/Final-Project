import tkinter as tk
from PIL import ImageTk, Image
from App.CameraHandler import run, get_data

root = tk.Tk()
temp_string = tk.StringVar()
btn_txt = tk.StringVar()
choise = tk.StringVar()
choise.set("Select Attraction")

canvas1 = tk.Canvas(root, width=400, height=300, relief='raised')
canvas1.pack()
img = ImageTk.PhotoImage(Image.open("logo.png"))
label1 = tk.Label(root, image=img)
canvas1.create_window(200, 55, window=label1)

unamelabel = tk.Label(root, text="Enter Username")
unamelabel.config(font=('helvetica', 10))
canvas1.create_window(200, 100, window=unamelabel)

entry1 = tk.Entry(root)
canvas1.create_window(200, 140, window=entry1)
nounamefoundlabael = tk.Label(root, textvariable=temp_string)
nounamefoundlabael.config(font=('helvetica', 10))
canvas1.create_window(200, 220, window=nounamefoundlabael)

state = [1]


def onClick():
    choises = []
    if state[0] == 1:
        name = entry1.get()
        attrac_list = get_data(name)
        if attrac_list:
            unamelabel.destroy()
            nounamefoundlabael.destroy()
            entry1.destroy()
            btn_txt.set("Select")
            for item in attrac_list:
                choises.append(item)
            optionMenu = tk.OptionMenu(root, choise, *choises)
            canvas1.create_window(200, 130, window=optionMenu)
            state[0] = 2
        else:
            temp_string.set("Unknown User")
    elif state[0] == 2:
        button1.destroy()
        canvas1.destroy()
        root.destroy()
        choise_name = choise.get()
        run(choise_name)
        return


btn_txt.set("Login")
button1 = tk.Button(textvariable=btn_txt, command=onClick, bg='brown', fg='white',
                    font=('helvetica', 9, 'bold'))
canvas1.create_window(200, 180, window=button1)

root.mainloop()