# AI Video Analyzer

AI Video Analyzer คือเว็บแอปสำหรับวิเคราะห์วิดีโอและให้คะแนน/คำแนะนำโดยใช้ AI  
สร้างด้วย React, React Router, TypeScript และ TailwindCSS

## คุณสมบัติ

- อัปโหลดวิดีโอและระบุหัวข้อที่คาดหวัง
- วิเคราะห์วิดีโอด้วย AI ผ่าน API
- แสดงคะแนนและคำแนะนำ
- UI สวยงาม ใช้งานง่าย รองรับมือถือ
- รองรับ .env สำหรับตั้งค่า API URL

## วิธีเริ่มต้นใช้งาน

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. ตั้งค่าไฟล์ .env

สร้างไฟล์ `.env` ที่โฟลเดอร์หลักของโปรเจกต์

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 3. เริ่มเซิร์ฟเวอร์สำหรับพัฒนา

```bash
npm run dev
```

แอปจะอยู่ที่ http://localhost:5173

### 4. สร้างไฟล์สำหรับ production

```bash
npm run build
```

## การ deploy

- รองรับ Docker, Vercel, Netlify, หรือโฮสต์ static อื่น ๆ
- ถ้า deploy แบบ static SPA ต้องตั้ง fallback ให้เสมอไปที่ `index.html` (ดูเอกสารของโฮสต์นั้น ๆ)

## โครงสร้างโปรเจกต์

```
├── app/
│   └── routes/
│       ├── home.tsx      # หน้าอัปโหลดและฟอร์ม
│       └── result.tsx    # หน้าผลลัพธ์
├── .env                  # ตัวแปร API URL
├── package.json
├── tailwind.config.js
└── ...
```

## หมายเหตุ

- หากรีเฟรชหรือเข้าหน้า `/result` โดยตรงจะเกิด 404 (ข้อจำกัดของ SPA)
- ต้องเข้าผ่านการ submit ฟอร์มเท่านั้น

---

สร้างด้วย ❤️ โดย PhiraponSTD
