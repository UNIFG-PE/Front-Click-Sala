import React, { useEffect } from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // desaparece em 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="success-overlay">
      <div className="success-modal">
        <h2>✅ {message}</h2>
      </div>
    </div>
  );
};

export default SuccessMessage;
