// ============================================================
// STUDENT ROUTES — URL manzillarni controller funksiyalariga bog'laydi
// ============================================================
// Bu fayl "yo'l xaritasi": qaysi URL → qaysi funksiya ishlaydi

const express = require('express');
const router = express.Router(); // Alohida router — student yo'llari uchun

const validateStudent = require('../middlewares/validateStudent');
// Controller'dan barcha CRUD funksiyalarini import qilamiz
const {
    getAllStudents,   // GET    — hammani olish
    getStudentById,   // GET    — bittasini olish
    createStudent,    // POST   — yangi qo'shish
    updateStudent,    // PUT    — yangilash
    deleteStudent,    // DELETE — o'chirish
} = require('../controllers/stundentControllers');


// ---------- GET (o'qish) ----------
// GET /api/students      → barcha talabalar ro'yxati
router.get('/', getAllStudents);


// GET /api/students/:id  → bitta talaba (masalan: /api/students/2)
router.get('/:id', getStudentById);

// ---------- POST (yaratish) ----------
// POST /api/students     → yangi talaba qo'shish (body: name, age, role)
router.post('/', validateStudent, createStudent);

// ---------- PUT (yangilash) ----------
// PUT /api/students/:id  → mavjud talabani o'zgartirish
router.put('/:id', validateStudent, updateStudent);

// ---------- DELETE (o'chirish) ----------
// DELETE /api/students/:id → talabani ro'yxatdan olib tashlash
router.delete('/:id', deleteStudent);

module.exports = router;
