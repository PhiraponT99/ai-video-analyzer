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

    const apiUrl = import.meta.env.VITE_API_URL;

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
        suggestion: data.result?.suggestion 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
      <div className="bg-blue-900/90 rounded-xl shadow-2xl p-8 w-full max-w-md border border-blue-800">
        <div className="flex flex-col items-center mb-7">
          <div className="bg-blue-800 rounded-full p-4 mb-2 shadow-md">
            <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-200">AI Video Analyzer</h2>
          <p className="text-blue-300 text-sm mt-1">วิเคราะห์วิดีโอตรงประเด็นด้วย AI</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="video-upload" className="block text-blue-200 font-medium mb-1">อัปโหลดวิดีโอ</label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              required
              className="block w-full text-sm text-blue-100 border border-blue-700 rounded-lg cursor-pointer bg-blue-950 focus:ring-2 focus:ring-blue-500 focus:outline-none file:bg-blue-900 file:border-0 file:text-blue-200 file:mr-3"
            />
          </div>
          <div>
            <label htmlFor="expected-topic" className="block text-blue-200 font-medium mb-1">หัวข้อที่คาดหวัง</label>
            <input
              id="expected-topic"
              type="text"
              placeholder="หัวข้อที่คาดหวัง"
              value={expectedTopic}
              onChange={e => setExpectedTopic(e.target.value)}
              required
              className="w-full px-3 py-2 border border-blue-700 rounded-lg bg-blue-950 text-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            วิเคราะห์วิดีโอ
          </button>
        </form>
      </div>
    </div>
  );
}
