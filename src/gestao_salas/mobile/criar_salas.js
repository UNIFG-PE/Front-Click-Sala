//Criação de salas no primeiro contato com o App//
// tela01.js

document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";

// Header
const header = document.createElement('header');
header.style.background = "#2c2c74";
header.style.color = "#fff";
header.style.padding = "10px";
header.style.display = "flex";
header.style.justifyContent = "space-between";
header.style.alignItems = "center";

const titulo = document.createElement('h1');
titulo.textContent = "Gerenciamento de Salas";
titulo.style.fontSize = "16px";

const icons = document.createElement('div');
icons.textContent = "🔍 🔔";

header.appendChild(titulo);
header.appendChild(icons);

// Main content
const main = document.createElement('main');
main.style.textAlign = "center";
main.style.padding = "40px 20px";

const h2 = document.createElement('h2');
h2.textContent = "Salas";

const p = document.createElement('p');
p.textContent = "Ops! Parece que não existe nenhuma sala criada. Crie uma!\n= (";
p.style.color = "#666";
p.style.marginTop = "20px";

main.appendChild(h2);
main.appendChild(p);

// Footer nav
const nav = document.createElement('nav');
nav.style.position = "fixed";
nav.style.bottom = "0";
nav.style.width = "100%";
nav.style.background = "#f0f0f0";
nav.style.display = "flex";
nav.style.justifyContent = "space-around";
nav.style.padding = "10px 0";
nav.style.borderTop = "1px solid #ccc";

const buttons = ["🏠 Home", "💬 Solicitação", "➕ Criar", "👤 Perfil", "⚙️ Ajustes"];
buttons.forEach((label, index) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.fontSize = "12px";
    btn.style.color = index === 2 ? "#2c2c74" : "#333"; // marcar 'Criar'
    nav.appendChild(btn);
});

// Append to body
document.body.appendChild(header);
document.body.appendChild(main);
document.body.appendChild(nav);