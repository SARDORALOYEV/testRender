// 1. Joi kutubxonasini chaqiramiz. 
// Bu vosita ma'lumotlarni biz belgilagan qoidalar (schema) bilan solishtiradi.
const Joi = require("joi");

// 2. "Qoidalar kitobi" (Schema) yaratish.
// Bu yerda har bir maydon (name, age, role, email) qanday bo'lishi kerakligini yozamiz.
const studentSchema = Joi.object({
    name: Joi.string().required().min(3).max(30), // Ism: matn bo'lishi shart, 3-30 ta harf, majburiy.
    age: Joi.number().required().min(18).max(100), // Yosh: son bo'lishi shart, 18-100 oralig'ida, majburiy.
    role: Joi.string().required().valid('Frontend', 'Backend', 'Fullstack'), // Kasb: faqat shu 3 tasidan biri bo'lishi shart.
    // email: Joi.string().email().required(), // Email: elektron pochta formatida va majburiy.
})

// 3. Middleware funksiyasi (Tekshiruvchi).
// Bu funksiya controller ishga tushishidan oldin so'rovni (req) ushlab oladi.
const validateStudent = (req, res, next) => {
    
    // 4. Tekshirish jarayoni:
    // studentSchema.validate(req.body) - foydalanuvchi yuborgan ma'lumotni bizning qoidalarimiz bilan solishtiradi.
    const { error } = studentSchema.validate(req.body);

    // 5. Agar xato bo'lsa:
    if (error) {
        // Foydalanuvchiga 400 (Bad Request) xabarini yuboramiz.
        // error.details[0].message - Joi aynan nima noto'g'ri ekanligini (masalan: "age must be at least 18") tushuntirib beradi.
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: null,
        });
        
        // Eslatma: 'next()' ni 'if' shartidan tashqariga chiqarish kerak (pastga qarang!)
    }
    
    // 6. Agar xato bo'lmasa, 'next()' ni chaqiramiz.
    // Bu "Qoidalar hammasi joyida, endi o'qishni (controller'ni) davom ettirishingiz mumkin" degani.
    next();
}

module.exports = validateStudent;