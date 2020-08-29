import tkinter as tk
from PIL import ImageTk, Image
from NativeApp.CameraHandler import run, get_data

root = tk.Tk()
temp_string = tk.StringVar()
btn_txt = tk.StringVar()
btn_txt2 = tk.StringVar()
btn_txt2.set("Back")
choise = tk.StringVar()
choise2 = tk.StringVar()
choise.set("Select Site")
choise2.set("Select Attraction")


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
attrac_dict = [{}]
state = [1]
optionMenu = []


def back():
    state[0] = 1
    onClick()


def onClick():
    global choise_name3
    if state[0] == 1:
        name = entry1.get()
        attrac_dict[0] = get_data(name)
        if attrac_dict[0]:
            choises = []
            unamelabel.destroy()
            nounamefoundlabael.destroy()
            entry1.destroy()
            btn_txt.set("Select")
            for item in attrac_dict[0]:
                choises.append(item)
            optionMenu.append(tk.OptionMenu(root, choise, *choises))
            canvas1.create_window(200, 130, window=optionMenu[0])
            state[0] = 2
            choise_name3 = name
        else:
            temp_string.set("Unknown User")
    elif state[0] == 2:
        if choise.get() == "Select Site":
            return
        optionMenu[0].destroy()
        choises2 = []
        for item in attrac_dict[0][choise.get()]:
            choises2.append(item)
        optionMenu2 = tk.OptionMenu(root, choise2, *choises2)
        canvas1.create_window(200, 130, window=optionMenu2)
        state[0] = 3
    elif state[0] == 3:
        if choise.get() == "Select Attraction":
            return
        button1.destroy()
        canvas1.destroy()
        root.destroy()
        choise_name1 = choise.get()
        choise_name2 = choise2.get()
        run(choise_name1, choise_name2, choise_name3)
        return


btn_txt.set("Login")
button1 = tk.Button(textvariable=btn_txt, command=onClick, bg='brown', fg='white',
                    font=('helvetica', 9, 'bold'))
canvas1.create_window(200, 180, window=button1)

root.mainloop()
