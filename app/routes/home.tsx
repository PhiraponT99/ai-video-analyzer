import React, { useState } from "react";
import { useNavigate } from "react-router"; 



export function meta() {
  return [
    { title: "AI Video Analyzer" },
    { name: "description", content: "วิเคราะห์วิดีโอตรงประเด็นด้วย AI" }
  ];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [expectedTopic, setExpectedTopic] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !expectedTopic) return;

    const formData = new FormData();
    formData.append("video", file);
    formData.append("expected_topic", expectedTopic);

    const response = await fetch("http://127.0.0.1:8000/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    // ส่งข้อมูลไปหน้า result (คุณต้องสร้าง route /result เพิ่ม)
    navigate("/result", { state: { score: data.score, suggestion: data.suggestion } });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>AI Video Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="หัวข้อที่คาดหวัง"
          value={expectedTopic}
          onChange={e => setExpectedTopic(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">วิเคราะห์วิดีโอ</button>
      </form>
    </div>
  );
}