// client/src/components/Message.jsx
import React, { useEffect } from "react";

function Message({ message, type, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const colors = {
    success: {
      background: "#2e7d32",
      color: "#d0f0c0",
      shadow: "0 4px 8px rgba(0, 77, 0, 0.7)",
    },
    error: {
      background: "#b71c1c",
      color: "#f8d7da",
      shadow: "0 4px 8px rgba(139, 0, 0, 0.7)",
    },
  };

  const style = {
    position: "fixed",
    left: "50%",
    top: "17%",
    transform: "translateX(-50%)",
    backgroundColor: colors[type]?.background || "#333",
    color: colors[type]?.color || "#eee",
    padding: "12px 24px",
    borderRadius: "6px",
    boxShadow: colors[type]?.shadow || "0 4px 8px rgba(0,0,0,0.7)",
    fontWeight: "bold",
    zIndex: 9999,
    minWidth: "250px",
    textAlign: "center",
    fontFamily: "sans-serif",
    userSelect: "none",
  };

  return <div style={style}>{message}</div>;
}

export default Message;
