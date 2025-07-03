# 🤖 Настройка Telegram бота для получения заявок

## Шаг 1: Создание бота

1. Открой Telegram и найди бота **@BotFather**
2. Отправь команду `/newbot`
3. Введи название бота (например: "RageCodeMaster Leads")
4. Введи username бота (например: "ragecodemasterleads_bot")
5. Получи **токен бота** (выглядит как: `7123456789:AAEhBOweik6ad6PsePk6ya2W1_rlSzClN00`)

## Шаг 2: Получение Chat ID

### Вариант 1 (Простой):
1. Найди бота **@userinfobot** в Telegram
2. Отправь ему любое сообщение
3. Он пришлет твой **Chat ID** (например: `123456789`)

### Вариант 2 (Через API):
1. Отправь сообщение своему боту
2. Открой в браузере: `https://api.telegram.org/bot[ТОК_БОТА]/getUpdates`
3. Найди поле `"chat":{"id":123456789}` - это твой Chat ID

## Шаг 3: Обновление кода

В файле `components/enhanced-lead-form.tsx` замени:

\`\`\`javascript
const botToken = "7123456789:AAEhBOweik6ad6PsePk6ya2W1_rlSzClN00" // Твой токен
const chatId = "123456789" // Твой chat ID
\`\`\`

## Шаг 4: Тестирование

1. Заполни форму на сайте
2. Отправь заявку
3. Проверь, пришло ли сообщение в Telegram

## 🔒 Безопасность

⚠️ **ВАЖНО**: Никогда не публикуй токен бота в открытом коде!

Для продакшена используй переменные окружения:
\`\`\`javascript
const botToken = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
\`\`\`

## 📱 Пример сообщения

Ты будешь получать сообщения в таком формате:

\`\`\`
🎯 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ

👤 Имя: Иван Петров
📧 Email: ivan@example.com
🎯 Цель: Career Change to Programming
💬 Сообщение: Хочу изучить JavaScript и найти работу

📅 Дата: 01.07.2024, 15:30:45
🌐 Источник: RageCodeMaster Pro
\`\`\`

## 🚀 Дополнительные возможности

### Добавить кнопки для быстрых ответов:
\`\`\`javascript
const keyboard = {
  inline_keyboard: [
    [
      { text: "✅ Связаться", callback_data: "contact_user" },
      { text: "📅 Назначить встречу", callback_data: "schedule_meeting" }
    ]
  ]
}

// Добавь в body запроса:
reply_markup: JSON.stringify(keyboard)
\`\`\`

### Отправка в группу:
Если хочешь получать заявки в группе:
1. Добавь бота в группу
2. Сделай его администратором
3. Используй Chat ID группы (начинается с `-`)
