import React from "react";
import { useLocation } from "react-router";

export default function Result() {
  const location = useLocation();
  const { score, suggestion } = location.state || {};

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>ผลการวิเคราะห์วิดีโอ</h2>
      <p>
        <strong>คะแนน:</strong> {score ?? "ไม่มีข้อมูล"}
      </p>
      <p>
        <strong>คำแนะนำ:</strong> {suggestion ?? "ไม่มีข้อมูล"}
      </p>
    </div>
  );
}
