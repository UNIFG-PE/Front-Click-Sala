import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../style/custom.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="backButton"
      aria-label="Voltar"
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
