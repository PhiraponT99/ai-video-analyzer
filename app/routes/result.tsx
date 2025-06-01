import React from "react";
import { useLocation, useNavigate } from "react-router";
import "../app.css"; // เพิ่มถ้ายังไม่ได้ import

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, suggestion, error } = location.state ?? {};

  // กรณี error
  if (error) {
    return (
      <div className="ai-bg">
        <div className="ai-card flex flex-col items-center ai-error-bg">
          <div className="ai-icon-bg">
            <svg
              className="w-10 h-10 ai-red"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="ai-error-title">เกิดข้อผิดพลาด</h2>
          <p className="ai-blue text-center mb-4">{error}</p>
          <button onClick={() => navigate("/")} className="ai-btn">
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  // ไม่พบข้อมูล
  if (typeof score === "undefined" && typeof suggestion === "undefined" && !error) {
    return (
      <div className="ai-bg">
        <div className="ai-card flex flex-col items-center">
          <h2 className="ai-error-title">ไม่พบข้อมูล</h2>
          <button onClick={() => navigate("/")} className="ai-btn">
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  // ปกติ
  return (
    <div className="ai-bg">
      <div className="ai-card">
        <div className="flex flex-col items-center mb-6">
          <div className="ai-icon-bg">
            <svg
              className="w-10 h-10 ai-green"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="ai-result-title">ผลการวิเคราะห์วิดีโอ</h2>
        </div>
        <div>
          <div className="ai-result-block">
            <p className="font-semibold">
              คะแนน:{" "}
              <span className="ai-green">
                {typeof score !== "undefined" ? score : "ไม่มีข้อมูล"}
              </span>
            </p>
          </div>
          <div className="ai-result-block">
            <p className="font-semibold">
              คำแนะนำ:{" "}
              <span className="ai-blue">
                {typeof suggestion !== "undefined" ? suggestion : "ไม่มีข้อมูล"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
