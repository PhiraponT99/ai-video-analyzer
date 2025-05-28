import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, suggestion, error } = location.state || {};

  // ถ้า error ให้แสดงหน้าข้อความ error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <div className="bg-red-100 rounded-full p-4 mb-2">
            <svg
              className="w-10 h-10 text-red-500"
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
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-700 text-center mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  // เช็คกรณีไม่มีข้อมูลจาก state
  if (typeof score === "undefined" && typeof suggestion === "undefined" && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">ไม่พบข้อมูล</h2>
          <button
            onClick={() => navigate("/")}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  // ปกติ แสดงผลลัพธ์
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full p-4 mb-2">
            <svg
              className="w-10 h-10 text-green-500"
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
          <h2 className="text-2xl font-bold text-green-700">
            ผลการวิเคราะห์วิดีโอ
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-gray-700 text-lg font-semibold">
              คะแนน:{" "}
              <span className="text-green-600">
                {typeof score !== "undefined" ? score : "ไม่มีข้อมูล"}
              </span>
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-700 text-lg font-semibold">
              คำแนะนำ:{" "}
              <span className="text-blue-600">
                {typeof suggestion !== "undefined" ? suggestion : "ไม่มีข้อมูล"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
