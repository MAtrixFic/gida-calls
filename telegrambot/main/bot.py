import telebot
from telebot import types
from api_work import ApiWorker
from datetime import datetime
import datetime as timing
from telegram_bot_calendar import DetailedTelegramCalendar, LSTEP
import config
bot = telebot.TeleBot(config.TOKEN)
className = ''
theme = ''

weekDays = [
    'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'
]


def SortBells(text, smena):
    sentText = f'{smena} смена\n'
    for i1 in range(len(text)//8):
        for i2 in range(8):
            if (i2 == 1 or i2 == 5):
                sentText += f'{text[i1*8+i2]}:'
            elif (i2 == 0):
                sentText += f'{i1+1}. {text[i1*8+i2]}'
            elif (i2 == 3):
                sentText += f'{text[i1*8+i2]} - '
            else:
                sentText += f'{text[i1*8+i2]}'
        sentText += '\n'
    return sentText

def SendBellsShedule(result, call):
        url_row = f'calendar/bot/{theme.lower()}/{result}'
        data = ApiWorker(url_row).GetData()
        bot.edit_message_text(f"{SortBells(data['first'], 'Первая')}", call.message.chat.id, call.message.message_id)
        bot.send_message(call.message.chat.id,SortBells(data['second'], 'Вторая'))

def MakeInlineKeyBoard(data, row_width):
    addedObj = []
    markup = types.InlineKeyboardMarkup(row_width=row_width)
    for i in data:
        addedObj.append(types.InlineKeyboardButton(text=i, callback_data=i))
    markup.add(*addedObj)
    return markup


@bot.message_handler(commands=['start'])
def start_message(message):
    key_board_classes = MakeInlineKeyBoard(
        ApiWorker('lessons/classes').GetData(), row_width=6)
    bot.send_message(message.chat.id, 'Привет, выбери свой класс',
                     reply_markup=key_board_classes)


@bot.callback_query_handler(func=DetailedTelegramCalendar.func())
def cal(c):
    result, key, step = DetailedTelegramCalendar(locale="ru").process(c.data)
    if not result and key:
        bot.edit_message_text("Выбери дату:", c.message.chat.id,c.message.message_id, reply_markup=key)
    elif result:
        if(theme == 'bells'):
            SendBellsShedule(result, c)


@bot.callback_query_handler(func=lambda call: True)
def callback_Classes(call):
    if (len(call.data) == 2):
        if (call.data[0].isdigit() and call.data[1].isalpha()):
            global className
            className = call.data
            key_board_themes = MakeInlineKeyBoard(
                ["Звонки", "Уроки"], row_width=1)
            bot.edit_message_text('Теперь выбери что тебе интересно',call.message.chat.id, call.message.message_id, reply_markup=key_board_themes)
    elif (call.data == 'Звонки' or call.data == 'Уроки'):
        global theme
        if (call.data == 'Звонки'):
            theme = "bells"
        elif (call.data == 'Уроки'):
            theme = "lessons"
        key_board_date = MakeInlineKeyBoard(
            ['Сегодня', 'Завтра', 'Календарь'], 2)
        bot.edit_message_text("Выберите пункт", call.message.chat.id,call.message.message_id, reply_markup=key_board_date)
    elif (call.data == 'Календарь'):
        calendar, step = DetailedTelegramCalendar(locale="ru").build()
        bot.edit_message_text("Выбери дату:", call.message.chat.id,call.message.message_id, reply_markup=calendar)
    elif (call.data == 'Сегодня'):
        now = datetime.now().date()
        if(theme == 'bells'):
            SendBellsShedule(now, call)
    elif (call.data == 'Завтра'):
        tomorrow = (datetime.now() + timing.timedelta(days=1)).date()
        if(theme == 'bells'):
            SendBellsShedule(tomorrow, call)


bot.infinity_polling()
