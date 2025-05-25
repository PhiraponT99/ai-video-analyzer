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
    // const response = await fetch(`https://video-analyzer-api.onrender.com/analyze`, {
    // const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    navigate("/result", { state: { score: data.score, suggestion: data.suggestion } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-4 mb-2">
            <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-700">AI Video Analyzer</h2>
          <p className="text-gray-500 text-sm mt-1">วิเคราะห์วิดีโอตรงประเด็นด้วย AI</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="video-upload" className="block text-gray-700 font-medium mb-1">อัปโหลดวิดีโอ</label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              required
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="expected-topic" className="block text-gray-700 font-medium mb-1">หัวข้อที่คาดหวัง</label>
            <input
              id="expected-topic"
              type="text"
              placeholder="หัวข้อที่คาดหวัง"
              value={expectedTopic}
              onChange={e => setExpectedTopic(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            วิเคราะห์วิดีโอ
          </button>
        </form>
      </div>
    </div>
  );
}