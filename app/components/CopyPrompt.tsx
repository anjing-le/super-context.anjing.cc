"use client";

import { useState } from "react";

export function CopyPrompt({ label, prompt }: { label: string; prompt: string }) {
  const [status, setStatus] = useState("复制提示词");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("已复制");
      window.setTimeout(() => setStatus("复制提示词"), 1800);
    } catch {
      setStatus("请手动复制");
    }
  }

  return (
    <div className="prompt-card">
      <div className="prompt-card-head">
        <span>{label}</span>
        <button onClick={copyPrompt} type="button">
          {status}
        </button>
      </div>
      <p>{prompt}</p>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
