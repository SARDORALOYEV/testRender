# 📚 MongoDB O'rnatish va Sozlash Qo'llanmasi

Ushbu qo'llanma sizning loyihangizni to'liq tahlil qilib, unda **MongoDB** ma'lumotlar bazasini qanday ulash, sozlash va ishlatish kerakligini tushuntiradi.

---

## 🔍 1. Loyihaning Hozirgi Holati Tahlili

Loyihangiz **Express.js** va **Mongoose** (MongoDB bilan ishlash uchun kutubxona) yordamida yozilgan backend ilovadir. Loyiha papkasida quyidagi asosiy fayllar va tuzilmalar mavjud:

*   [src/index.js](file:///C:/Users/Meta/Desktop/testRender/src/index.js) — Serverning kirish nuqtasi. Hozirda unda `mongoose` kutubxonasi yuklangan (`const mongoose = require('mongoose')`), lekin **MongoDB bazasiga ulanish kodi yozilmagan**.
*   [src/models/student.js](file:///C:/Users/Meta/Desktop/testRender/src/models/student.js) — Talabalar ma'lumotlari uchun **Mongoose Schema** (jadvallar/hujjatlar tuzilishi) yaratilgan. Unda `name` (String), `age` (Number) va `role` (String) maydonlari bor.
*   [src/controllers/stundentControllers.js](file:///C:/Users/Meta/Desktop/testRender/src/controllers/stundentControllers.js) (nomida kichik imlo xatosi bor: *stundent*) — Bazadan ma'lumotlarni olish (`find`), qo'shish (`create`), o'zgartirish (`findByIdAndUpdate`) va o'chirish (`findByIdAndDelete`) funksiyalari to'liq yozilgan.
*   [src/routes/studentRoutes.js](file:///C:/Users/Meta/Desktop/testRender/src/routes/studentRoutes.js) — URL manzillarni (API endpoint) controller funksiyalari bilan bog'laydi.
*   [src/middlewares/validateStudent.js](file:///C:/Users/Meta/Desktop/testRender/src/middlewares/validateStudent.js) — **Joi** kutubxonasi yordamida talaba qo'shish yoki tahrirlashda ma'lumotlarni tekshiradi (Validation).
*   [.env](file:///C:/Users/Meta/Desktop/testRender/.env) — Atrof-muhit o'zgaruvchilari fayli. Unda `MONGO_URI=` yozilgan, lekin qiymati bo'sh.

---

## 🛠️ 2. MongoDB'da Nimalar Qilish Kerak? (Qadam-baqadam)

MongoDB bilan ishlash uchun sizda ikki xil yo'l bor:
1.  **MongoDB Atlas (Bulutli baza / Cloud)** — Oson va kompyuteringizga hech narsa o'rnatish shart emas (Tavsiya etiladi).
2.  **MongoDB Community Server (Mahalliy baza / Local)** — Kompyuteringizga dasturni o'rnatib ishlatish.

Quyida har ikkala usul tushuntirilgan:

### 🌐 A-Usul: MongoDB Atlas (Bulutli) orqali sozlash
1.  [mongodb.com](https://www.mongodb.com/) saytiga kiring va ro'yxatdan o'ting.
2.  Yangi **Cluster** (ma'lumotlar bazasi serveri) yarating (bepul **M0 Sandbox** variantini tanlang).
3.  **Database Access** bo'limida yangi foydalanuvchi yarating (masalan, login: `admin`, parol: `parol123`).
4.  **Network Access** bo'limida IP manzillarga ruxsat bering: **Allow Access from Anywhere** (`0.0.0.0/0`) ni tanlang.
5.  **Database** bo'limiga o'tib, **Connect** tugmasini bosing -> **Drivers** (yoki Node.js) ni tanlang.
6.  Sizga quyidagicha ulanish havolasi (Connection String) beriladi:
    ```text
    mongodb+srv://admin:<password>@cluster0.xxxx.mongodb.net/student_db?retryWrites=true&w=majority
    ```
    *(Bu yerdagi `<password>` o'rniga o'zingiz yaratgan parolni yozasiz, `student_db` esa bazangizning nomi bo'ladi).*

### 💻 B-Usul: Local (Kompyuterning o'zida) ishlatish
1.  **MongoDB Community Server** dasturini yuklab oling va o'rnating.
2.  **MongoDB Compass** (vizual ko'rish dasturi) ni ham o'rnating.
3.  Lokal ulanish havolasi odatda quyidagicha bo'ladi:
    ```text
    mongodb://127.0.0.1:27017/student_db
    ```

---

## 📝 3. Kodni Sozlash va O'zgartirish

### 1-qadam: `.env` faylini to'ldiring
Loyihangizning ildiz (root) papkasidagi `.env` faylini oching va ulanish havolasini yozing:

**Bulutli baza uchun:**
```env
PORT=8000
MONGO_URI=mongodb+srv://admin:parol123@cluster0.xxxx.mongodb.net/student_db?retryWrites=true&w=majority
```
*(Yoki o'zingizning haqiqiy havolangizni qo'ying).*

**Lokal baza uchun:**
```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/student_db
```

---

### 2-qadam: `src/index.js` fayliga MongoDB ulanish kodini qo'shish
Server ishga tushganda bazaga ulanishi uchun `src/index.js` faylini quyidagicha o'zgartirish kerak:

```javascript
// ============================================================
// INDEX.JS — serverning asosiy kirish nuqtasi (entry point)
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express'); 
const cors = require('cors');       
const logger = require('./middlewares/logger'); 

const app = express();

app.use(cors());              
app.use(logger);              
app.use(express.json());      

// MongoDB bazasiga ulanish qismi:
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_db";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 MongoDB ma'lumotlar bazasiga muvaffaqiyatli ulandi!"))
    .catch((err) => {
        console.error("❌ MongoDB ulanishida xatolik yuz berdi:");
        console.error(err);
        process.exit(1); // Ulanish xato bo'lsa serverni to'xtatadi
    });

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} da ishga tushdi!`);
    console.log(`📚 Talabalar API: http://localhost:${PORT}/api/students`);
});
```

---

## 📊 4. MongoDB'da Hujjatlar Qanday Tuziladi?

Mongoose schemaga muvofiq, MongoDB da avtomatik tarzda `students` nomli kolleksiya (collection) ochiladi. Har bir talaba hujjati (document) quyidagi ko'rinishda bo'ladi:

```json
{
  "_id": "647f1234567890abcdef1234",
  "name": "Eshmatov Toshmat",
  "age": 22,
  "role": "Frontend",
  "__v": 0
}
```

### Muhim talablar (Joi & Mongoose orqali):
*   `name`: Matn, kamida 3 ta, ko'pi bilan 30 ta harfdan iborat bo'lishi shart.
*   `age`: Son, kamida `18` yosh bo'lishi shart, ko'pi bilan `100` yosh.
*   `role`: Faqatgina `Frontend`, `Backend` yoki `Fullstack` qiymatlarini qabul qiladi (boshqa so'z yozilsa xato beradi).

---

## 🚀 5. API'larni Test Qilish (CRUD)

Serveringizni ishga tushirish uchun konsolda quyidagi buyruqni bosing:
```bash
npm run dev
```

Keyin **Postman**, **Insomnia** yoki VS Code'dagi **Thunder Client** yordamida quyidagi so'rovlarni yuborib tekshirishingiz mumkin:

### 1. Yangi talaba yaratish (POST)
*   **URL:** `http://localhost:8000/api/students`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Body (JSON):**
    ```json
    {
      "name": "Ali Valiyev",
      "age": 20,
      "role": "Backend"
    }
    ```

### 2. Barcha talabalarni ko'rish (GET)
*   **URL:** `http://localhost:8000/api/students`
*   **Method:** `GET`

### 3. Bitta talabani ID bo'yicha ko'rish (GET)
*   **URL:** `http://localhost:8000/api/students/ID_KODINI_YOZING`
*   **Method:** `GET`

### 4. Talaba ma'lumotlarini yangilash (PUT)
*   **URL:** `http://localhost:8000/api/students/ID_KODINI_YOZING`
*   **Method:** `PUT`
*   **Body (JSON):**
    ```json
    {
      "name": "Ali Valiyev (Yangilangan)",
      "age": 21,
      "role": "Fullstack"
    }
    ```

### 5. Talabani o'chirish (DELETE)
*   **URL:** `http://localhost:8000/api/students/ID_KODINI_YOZING`
*   **Method:** `DELETE`
