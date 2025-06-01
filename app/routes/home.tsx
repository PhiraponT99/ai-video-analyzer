import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css"; // เพิ่มถ้ายังไม่ได้ import

export function meta() {
  return [
    { title: "AI Video Analyzer" },
    { name: "description", content: "วิเคราะห์วิดีโอตรงประเด็นด้วย AI" },
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

    const apiUrl = (import.meta as any).env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      navigate("/result", { state: { error: "เกิดข้อผิดพลาดในการวิเคราะห์" } });
      return;
    }

    const data = await response.json();

    navigate("/result", {
      state: {
        score: data.result?.score,
        suggestion: data.result?.suggestion,
      },
    });
  };

  return (
    <div className="ai-bg">
      <div className="ai-card">
        <div className="ai-icon-bg"  style={{ margin: "0 auto 1rem auto" }}>
          {/* Video icon SVG */}
          <svg
            width="38"
            height="38"
            fill="none"
            stroke="#1e40af"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <rect x="5" y="7" width="10" height="10" rx="2.5" />
            <polygon
              points="16,10 20,8 20,16 16,14"
              stroke="#1e40af"
              fill="none"
            />
          </svg>
        </div>
        <h2 className="ai-title">AI Video Analyzer</h2>
        <form>
          <label className="ai-label" htmlFor="video">
            อัปโหลดวิดีโอ
          </label>
          <input className="ai-input" type="file" id="video" accept="video/*" />
          <label className="ai-label" htmlFor="topic">
            หัวข้อที่คาดหวัง
          </label>
          <input
            className="ai-input"
            type="text"
            id="topic"
            placeholder="หัวข้อที่คาดหวัง"
          />
          <button className="ai-btn" type="submit">
            วิเคราะห์วิดีโอ
          </button>
        </form>
      </div>
    </div>
  );
}
