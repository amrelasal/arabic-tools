"use client";
import { useState } from "react";
import { removeTashkeel } from "@/lib/arabic";
import CopyButton from "../CopyButton";

export default function TashkeelTool() {
  const [text, setText] = useState("");
  const out = removeTashkeel(text);
  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="الصق النص المشكول هنا..." />
      <textarea value={out} readOnly placeholder="النتيجة بدون تشكيل..." style={{ marginTop: 12 }} />
      <CopyButton text={out} />
      <button className="btn alt" onClick={() => setText("")}>مسح</button>
    </>
  );
}
