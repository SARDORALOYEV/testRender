// ============================================================
// INDEX.JS — serverning asosiy kirish nuqtasi (entry point)
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
// 1-qadam: Kerakli kutubxonalarni ulaymiz
const express = require('express'); // Express — server qurish uchun framework
const cors = require('cors');       // CORS — boshqa domenlardan so'rov kelishiga ruxsat
const logger = require('./middlewares/logger'); // Har bir so'rovni log qiluvchi middleware

// 2-qadam: Express ilovasini (server) yaratamiz
const app = express();

// 3-qadam: Global middleware'larni ulaymiz (har bir so'rov uchun ishlaydi)
app.use(cors());              // Barcha manbalardan kelgan so'rovlarga ruxsat
app.use(logger);              // Har bir so'rovni konsolga yozadi
app.use(express.json());      // POST/PUT body'dagi JSON ni avtomatik o'qiydi (req.body)

// MongoDB bazasiga ulanish:
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_db";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 MongoDB ma'lumotlar bazasiga muvaffaqiyatli ulandi!"))
    .catch((err) => {
        console.error("❌ MongoDB ulanishida xatolik yuz berdi:");
        console.error(err);
        process.exit(1); // Ulanish xato bo'lsa serverni to'xtatadi
    });

// 4-qadam: Route faylini ulaymiz — talabalar bilan bog'liq yo'llar
const studentRoutes = require('./routes/studentRoutes');

// 5-qadam: Route'ni prefix bilan bog'laymiz
// Natija: GET /api/students, POST /api/students, GET /api/students/1 va hokazo
app.use('/api/students', studentRoutes);

// 6-qadam: Server qaysi portda ishlashini belgilaymiz
const PORT = process.env.PORT || 8000;

// 7-qadam: Serverni ishga tushiramiz va tinglaymiz
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} da ishga tushdi!`);
    console.log(`📚 Talabalar API: http://localhost:${PORT}/api/students`);
});
