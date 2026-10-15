# Sam Tutors — ro‘yxatdan o‘tish sayti

O‘zbek tilidagi, mobilga mos landing page. Arizalar Netlify Function orqali Telegram botga yuboriladi. Bot tokeni brauzer kodida saqlanmaydi.

## 1. Telegram bot yaratish
1. Telegramda `@BotFather` ni oching.
2. `/newbot` yuboring, bot nomi va username tanlang.
3. BotFather bergan tokenni xavfsiz joyga yozib qo‘ying. Uni hech kimga yubormang va sayt fayliga yozmang.
4. Yangi botni ochib `/start` yuboring.
5. Chat ID olish uchun botga xabar yuborganingizdan keyin brauzerda `https://api.telegram.org/botTOKEN/getUpdates` manzilini oching (`TOKEN` o‘rniga o‘z tokeningiz). Javob ichidagi `message.chat.id` qiymatini toping. Tokenli URLni hech kim bilan ulashmang.
   - Agar `getUpdates` bo‘sh bo‘lsa, botga yana xabar yuborib, sahifani yangilang.
   - Guruhga yubormoqchi bo‘lsangiz, botni guruhga qo‘shing, guruhda xabar yozing va `chat.id` qiymatini oling. Guruh IDsi manfiy bo‘lishi mumkin.

## 2. Netlify’ga joylash
1. ZIP faylni oching.
2. Netlify hisobiga kiring: https://app.netlify.com/
3. GitHub orqali joylash uchun papkani yangi GitHub repository’ga yuklang va Netlify’da **Add new site → Import an existing project** ni tanlang. Yoki Netlify Drop orqali statik fayllarni sinab ko‘rish mumkin, ammo function ishlashi uchun saytni Netlify Functions bilan deploy qilish kerak.
4. Repository import qilganda build command bo‘sh qolishi, publish directory `.` va functions directory `netlify/functions` bo‘lishi mumkin (`netlify.toml` ham buni sozlaydi).
5. Netlify sayt panelida **Site configuration → Environment variables** (yoki **Environment variables**) bo‘limidan quyidagilarni qo‘shing:
   - `TELEGRAM_BOT_TOKEN` = BotFather bergan token
   - `TELEGRAM_CHAT_ID` = sizning chat ID raqamingiz
6. O‘zgaruvchilarni saqlang va saytni qayta deploy qiling. Environment variable o‘zgarsa, odatda qayta deploy qilish kerak.
7. Sayt URL manzilini ochib, test arizasi yuboring. Telegramga xabar kelishini tekshiring.

Netlify hujjatlari:
- Functions: https://docs.netlify.com/functions/overview/
- Environment variables: https://docs.netlify.com/build/environment-variables/

## 3. Logotipni qo‘shish
Hozir sahifada `ST` harfli vaqtinchalik belgi bor. `index.html` ichidagi `.brand` blokini o‘zingizning logotipingizga almashtiring. Masalan, `assets/logo.png` faylini qo‘shib, `<img src="/assets/logo.png" alt="Sam Tutors logotipi">` dan foydalaning. Fayl nomi va yo‘li harf-katta/kichikligini aniq saqlang.

## 4. Kurslar va matnni o‘zgartirish
- `index.html` ichida forma ko‘rinishi va matnlar.
- `netlify/functions/register.mjs` ichida ruxsat etilgan kurslar ro‘yxati.
Kurs nomini o‘zgartirsangiz, HTML select va serverdagi `allowedCourses` ro‘yxatini ikkalasini ham yangilang.

## Muhim xavfsizlik eslatmalari
- Bot tokenini `index.html` yoki ommaviy GitHub repository ichiga hech qachon yozmang.
- Token tasodifan oshkor bo‘lsa, BotFather orqali yangisini oling.
- Faqat kerakli ariza ma’lumotlarini yig‘ing; foydalanuvchilarga ma’lumot nima uchun ishlatilishini tushuntiring.
- Bepul tariflar va limitlar o‘zgarishi mumkin. Deploy vaqtida hosting provayderining joriy shartlarini tekshiring.
- Ishga tushirishdan oldin test arizasi, noto‘g‘ri telefon, bo‘sh maydon va mobil ko‘rinishni tekshiring.
