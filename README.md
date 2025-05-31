# AI Video Analyzer

AI Video Analyzer คือเว็บแอปสำหรับวิเคราะห์วิดีโอและให้คะแนน/คำแนะนำโดยใช้ AI  
สร้างด้วย React, React Router, TypeScript และ TailwindCSS

## คุณสมบัติ

- อัปโหลดวิดีโอและระบุหัวข้อที่คาดหวัง
- วิเคราะห์วิดีโอด้วย AI ผ่าน API
- แสดงคะแนนและคำแนะนำ
- UI สวยงาม ใช้งานง่าย รองรับมือถือ
- รองรับ .env สำหรับตั้งค่า API URL
- รองรับการเชื่อมต่อกับ backend (Node.js/Express) และฐานข้อมูล MongoDB

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
- หากใช้ backend แยก ให้ deploy backend (Node.js/Express) และ MongoDB ด้วย

## การ deploy แบบ SSR (React Router v7) บน Vercel

### ขั้นตอน

1. **รัน build**
   ```bash
   npm run build
   ```

2. **ย้ายไฟล์ server ที่ build เสร็จไปไว้ที่ `api/index.js`**
   - หลัง build จะได้ไฟล์ `./build/server/index.js`
   - ให้คัดลอกหรือย้ายไฟล์นี้ไปที่ `api/index.js` (สร้างโฟลเดอร์ `api` ที่ root ถ้ายังไม่มี)
   - ตัวอย่างคำสั่ง (บน Windows):
     ```bash
     mkdir api
     copy build\server\index.js api\index.js
     ```

3. **ตั้งค่าไฟล์ `vercel.json` ที่ root ของโปรเจกต์**
   ```json
   {
     "functions": {
       "api/index.js": {
         "runtime": "nodejs18.x"
       }
     },
     "routes": [
       { "src": "/api/.*", "dest": "/api/index.js" },
       { "src": "/(.*)", "dest": "/api/index.js" }
     ]
   }
   ```

4. **ตรวจสอบว่าไฟล์ `api/index.js` มีอยู่จริงใน repo**
   - ถ้าไม่มีไฟล์นี้ Vercel จะ deploy ไม่สำเร็จ

5. **Push ขึ้น GitHub แล้ว Deploy ขึ้น Vercel**
   - Vercel จะใช้ `api/index.js` เป็น entry point สำหรับ SSR

---

## โครงสร้างโปรเจกต์

```
├── app/
│   └── routes/
│       ├── home.tsx      # หน้าอัปโหลดและฟอร์ม
│       └── result.tsx    # หน้าผลลัพธ์
├── api/
│   └── index.js          # SSR entry สำหรับ Vercel
├── .env                  # ตัวแปร API URL
├── package.json
├── tailwind.config.js
├── vercel.json
└── ...
```

## หมายเหตุ

- หากรีเฟรชหรือเข้าหน้า `/result` โดยตรงจะเกิด 404 (ข้อจำกัดของ SPA)
- ต้องเข้าผ่านการ submit ฟอร์มเท่านั้น
- หากต้องการเชื่อมต่อฐานข้อมูลหรือ backend เพิ่มเติม ดูตัวอย่างในโฟลเดอร์ backend

---

สร้างด้วย ❤️ โดย PhiraponSTD
