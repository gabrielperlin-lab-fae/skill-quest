import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: 24,
        transform: "translateX(-50%)",
        zIndex: 9999,
        padding: "7px 12px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        fontSize: 18,
        lineHeight: 1,
      }}
      aria-label="Teste de comunicação GitHub"
      title="Teste GitHub"
    >
      ⚽ 🏀 🎾
    </div>
  </>
);
