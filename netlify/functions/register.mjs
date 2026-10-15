// Netlify serverless function. Telegram tokeni faqat server muhit o‘zgaruvchisida saqlanadi.
export default async (request) => {
  if (request.method !== "POST") {
    return json({ error: "Faqat POST so‘rovi qabul qilinadi." }, 405);
  }

  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Netlify.env.get("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan.");
    return json({ error: "Tizim hali sozlanmagan. Iltimos, telefon orqali bog‘laning." }, 503);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Ma’lumot formati noto‘g‘ri." }, 400);
  }

  const fullName = clean(data.fullName, 100);
  const phone = clean(data.phone, 20);
  const age = clean(data.age, 40);
  const course = clean(data.course, 60);
  const branch = clean(data.branch, 60);

  if (!fullName || fullName.length < 3 || !phone || !age || !course || !branch) {
    return json({ error: "Iltimos, barcha maydonlarni to‘ldiring." }, 400);
  }
  if (!/^[+0-9()\-\s]{7,20}$/.test(phone)) {
    return json({ error: "Telefon raqamini tekshirib qayta kiriting." }, 400);
  }

  const allowedCourses = ["Ingliz tili", "Rus tili", "Ona tili", "Matematika", "Tarix", "Huquq"];
  if (!allowedCourses.includes(course) || branch !== "Samarqand") {
    return json({ error: "Tanlangan kurs yoki filial noto‘g‘ri." }, 400);
  }

  const message = [
    "🆕 <b>Sam Tutors — yangi ariza</b>",
    "",
    `👤 <b>Ism-familiya:</b> ${escapeHtml(fullName)}`,
    `📱 <b>Telefon:</b> ${escapeHtml(phone)}`,
    `🎂 <b>Yosh:</b> ${escapeHtml(age)}`,
    `📚 <b>Kurs:</b> ${escapeHtml(course)}`,
    `📍 <b>Filial:</b> ${escapeHtml(branch)}`,
    "",
    "Iltimos, ariza egasi bilan bog‘laning."
  ].join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });
    const result = await tg.json();
    if (!tg.ok || !result.ok) {
      console.error("Telegram xatosi:", result.description || tg.status);
      return json({ error: "Arizani yuborishda xatolik yuz berdi. Keyinroq urinib ko‘ring." }, 502);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Telegram so‘rovi bajarilmadi:", error);
    return json({ error: "Server bilan aloqa uzildi. Keyinroq urinib ko‘ring." }, 502);
  }
};

function clean(value, max) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
