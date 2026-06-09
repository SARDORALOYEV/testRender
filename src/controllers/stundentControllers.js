// Student modelini chaqiramiz (bazadagi ma'lumotlar bilan ishlash uchun)
const Student = require('../models/student'); 

// 1. GET — Barcha talabalarni bazadan olish
const getAllStudents = async (req, res) => { // async: baza bilan ishlash vaqt talab qilgani uchun
    try {
        const students = await Student.find(); // await: ma'lumot kelguncha kutish. Student.find() - bazadagi barcha ma'lumotni oladi
        res.status(200).json({ success: true, count: students.length, data: students }); // Javob: hammasi yaxshi (200), talabalar ro'yxatini yuboramiz
    } catch (error) { // Agar bazaga ulanishda xato bo'lsa
        res.status(500).json({ success: false, message: "Bazadan o'qishda xato" }); // Javob: server xatosi (500)
    }
};

// 2. GET — ID bo'yicha bitta talabani topish
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // req.params.id orqali kelgan ID bo'yicha bazadan qidiradi
        if (!student) return res.status(404).json({ success: false, message: "Topilmadi" }); // Agar talaba topilmasa (404)
        res.status(200).json({ success: true, data: student }); // Topilsa (200) va ma'lumot qaytaradi
    } catch (error) {
        res.status(500).json({ success: false, message: "Xatolik" });
    }
};

// 3. POST — Yangi talaba yaratish
const createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body); // req.body dagi ma'lumotlarni bazaga yangi hujjat qilib qo'shadi
        res.status(201).json({ success: true, data: newStudent }); // Javob: muvaffaqiyatli yaratildi (201)
    } catch (error) {
        res.status(400).json({ success: false, message: "Ma'lumot noto'g'ri" }); // Foydalanuvchi xato ma'lumot yuborsa (400)
    }
};

// 4. PUT — Mavjud talabani yangilash
const updateStudent = async (req, res) => {
    try {
        // findByIdAndUpdate: ID ni topadi va req.body dagi ma'lumotlar bilan yangilaydi
        // { new: true } - yangilangandan keyingi ma'lumotni qaytarishini so'raymiz
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ success: false, message: "Topilmadi" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(400).json({ success: false, message: "Yangilab bo'lmadi" });
    }
};

// 5. DELETE — Talabani bazadan o'chirish
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id); // ID bo'yicha bazadan o'chiradi
        if (!student) return res.status(404).json({ success: false, message: "Topilmadi" });
        res.status(200).json({ success: true, message: "O'chirildi" });
    } catch (error) {
        res.status(500).json({ success: false, message: "O'chirib bo'lmadi" });
    }
};

// Barcha funksiyalarni eksport qilamiz, route faylida ishlatish uchun
module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };