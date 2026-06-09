// Mongoose kutubxonasini chaqiramiz (bu MongoDB bilan ishlashimiz uchun kerakli asbob)
const mongoose = require('mongoose');

// Schema — bu bazadagi har bir talaba (hujjat) qanday tuzilishga ega bo'lishini belgilaydi.
// Bu xuddi "formulalar kitobi" kabi: ma'lumotlar bazaga kirishdan oldin shu qoidalarga mos kelishi kerak.
const studentSchema = new mongoose.Schema({
    // name maydoni: matn (String) bo'lishi shart, va bu maydon majburiy (required: true)
    name: { type: String, required: true },
    
    // age maydoni: son (Number) bo'lishi shart, bu ham majburiy
    age: { type: Number, required: true },
    
    // role maydoni: matn (String) bo'lishi shart, bu ham majburiy
    role: { type: String, required: true }
    
    // Agar email qo'shmoqchi bo'lsang, quyidagicha yozasan:
    // email: { type: String, required: true }
});

// mongoose.model — bu biz yaratgan qoidalar (schema) asosida bazada "Student" nomli 
// kolleksiyani (table-ni) boshqaradigan obyektni tayyorlab beradi.
// "Student" — bu modelning nomi, u MongoDB'da avtomatik tarzda "students" (ko'plikda) deb saqlanadi.
module.exports = mongoose.model('Student', studentSchema);