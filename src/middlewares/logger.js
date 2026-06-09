// ============================================================
// LOGGER MIDDLEWARE — har bir HTTP so'rovni kuzatadi
// ============================================================
// Middleware — Express'da "o'rtadagi qadam" degani.
// So'rov controller'ga yetib kelishidan OLDIN shu funksiya ishlaydi.

const logger = (req, res, next) => {
    // 1-qadam: So'rov kelgan vaqtni saqlaymiz (keyin qancha vaqt ketganini hisoblash uchun)
    const boshlanishVaqti = Date.now();

    // 2-qadam: So'rov haqida asosiy ma'lumotlarni olamiz
    const metod = req.method;       // GET, POST, PUT, DELETE
    const manzil = req.originalUrl || req.url; // masalan: /api/students/1
    const vaqt = new Date().toLocaleString('uz-UZ'); // o'qish oson vaqt

    // 3-qadam: So'rov kelganini darhol konsolga yozamiz
    console.log('-------------------------------------------');
    console.log(`📥 KIRUVCHI SO'ROV: [${metod}] ${manzil}`);
    console.log(`   ⏰ Vaqt: ${vaqt}`);

    // 4-qadam: Javob yuborilganda (res.end) yana log yozamiz
    // res.on('finish') — server javobni to'liq yuborganidan keyin ishlaydi
    res.on('finish', () => {
        const davomiylik = Date.now() - boshlanishVaqti; // millisekundda
        const status = res.statusCode; // 200, 404, 201 va hokazo

        // Status kodiga qarab emoji tanlaymiz (vizual qulaylik uchun)
        const emoji = status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';

        console.log(`${emoji} JAVOB: [${status}] ${metod} ${manzil} — ${davomiylik}ms`);
        console.log('-------------------------------------------');
    });

    // 5-qadam: next() — so'rovni keyingi qadamga (route → controller) o'tkazamiz
    // Agar next() chaqirilmasa, brauzer abadiy "yuklanmoqda" holatida qoladi!
    next();
};

module.exports = logger;
