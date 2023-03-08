import telebot
from telebot import types
import requests
token = '6275590207:AAHnqmvU4GuOomFk3aPndlewDS81Ta0GUv4'
bot = telebot.TeleBot(token)
urlClasses = "http://localhost:3001/lessons/classes"

def GetData(url):
    datares = requests.get(url)
    return datares.json()


@bot.message_handler(commands=['start'])
def start_message(message):
    data = GetData(urlClasses)
    addedObj = []
    markup = types.InlineKeyboardMarkup(row_width = 5)
    for i in data:
        addedObj.append(types.InlineKeyboardButton(text=i, callback_data=i))

    markup.add(*addedObj)
    bot.send_message(
        message.chat.id, 'Привет, выбери свой класс', reply_markup=markup)

# @bot.callback_query_handler(func=lambda call: True) 
# def callback_inline(call): 
    


bot.infinity_polling()
