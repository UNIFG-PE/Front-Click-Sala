import React from "react";

// Função para gerar uma cor sólida e única a partir do nome
function stringToColor(str) {
  let hash = 0, i;
  for (i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i++) {
    color += ("00" + ((hash >> (i * 8)) & 0xFF).toString(16)).slice(-2);
  }
  return color;
}

// Função para retornar as iniciais
function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const UserAvatar = ({ name, photo, size = 36 }) => {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        title={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      />
    );
  }
  // fallback padrão para iniciais
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: stringToColor(name || "user"),
        color: "#fff",
        fontWeight: 700,
        fontSize: size / 1.9,
        userSelect: "none",
        marginRight: 8
      }}
      title={name}
    >
      {getInitials(name)}
    </span>
  );
};
export default UserAvatar;
