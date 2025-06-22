import React, { useState } from "react";
import './FAQ.css';

const FAQ = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [feedbacks, setFeedbacks] = useState([null, null, null, null, null]);
  const [views, setViews] = useState([0, 0, 0, 0, 0]); // <-- Adiciona o contador de views

  const faqList = [
    {
      question: "Quem pode alugar as salas da faculdade?",
      answer:
        "As salas podem ser alugadas por alunos, professores, funcionários e também por entidades externas mediante aprovação prévia.",
    },
    {
      question: "Como faço para solicitar a locação de uma sala?",
      answer:
        "Você deve acessar o sistema da faculdade ou entrar em contato com a secretaria pelo e-mail eventos@faculdade.edu.br.",
    },
    {
      question: "Quais são os horários disponíveis para locação?",
      answer:
        "As salas estão disponíveis de segunda a sábado, das 7h às 22h, conforme a disponibilidade e o calendário acadêmico.",
    },
    {
      question: "Há algum custo para locação?",
      answer:
        "Sim. Os valores variam conforme o tipo de sala, horário e público (interno ou externo). Consulte a tabela de preços atualizada na secretaria.",
    },
    {
      question: "É possível cancelar uma reserva?",
      answer:
        "Sim, o cancelamento deve ser feito com pelo menos 48h de antecedência para reembolso total. Após esse prazo, poderá haver cobrança.",
    },
  ];

  // Atualiza o contador ao abrir a resposta:
  const handleClick = index => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      setViews(prev =>
        prev.map((v, i) => (i === index ? v + 1 : v))
      );
    }
  };

  // Feedback handler
  const handleFeedback = (i, value) => {
    setFeedbacks(fbs => fbs.map((fb, idx) => idx === i ? value : fb));
  };

  return (
    <div className={`faq-container${darkMode ? " dark" : ""}`}>
      <button
        onClick={() => setDarkMode(dm => !dm)}
        className="faq-theme-toggle"
        aria-label="Alternar tema claro/escuro"
      >
        {darkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
      </button>
      <h1 className="faq-title">
        Perguntas Frequentes <span className="dot-icon">•</span> Locação de Salas da Unifg
      </h1>
      <div>
        {faqList.map((item, index) => {
          const isOpen = openIndex === index;
          const feedback = feedbacks[index];
          return (
            <div
              key={index}
              className={`faq-item${isOpen ? " open" : ""}`}
              onClick={() => handleClick(index)}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onKeyPress={e => {
                if (e.key === "Enter" || e.key === " ") handleClick(index);
              }}
            >
              <div className="faq-question">
                {item.question}
                <span className="faq-viewcount" title="Quantidade de vezes aberta">
                  👁️ {views[index]}
                </span>
                <span className="faq-icon">{isOpen ? "▼" : "▶"}</span>
              </div>
              {isOpen && (
                <div className="faq-answer" id={`faq-answer-${index}`}>
                  {item.answer}
                  <div className="faq-feedback-row">
  {(feedback === 'up' || feedback === 'down') ? (
    <span className={`faq-feedback-msg ${feedback === 'up' ? 'faq-feedback-up' : 'faq-feedback-down'}`}>
      {feedback === 'up'
        ? <>Obrigado pelo feedback! <span role="img" aria-label="positivo">👍</span></>
        : <>Vamos melhorar! <span role="img" aria-label="negativo">👎</span></>
      }
      <button
        className="faq-feedback-reset"
        onClick={e => {e.stopPropagation(); handleFeedback(index, null);}}
        title="Alterar voto"
        style={{ marginLeft: 12, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: '#aaa'}}
      >↩️</button>
    </span>
  ) : (
    <span className="faq-feedback-buttons">
      <button
        className="faq-btn-up"
        aria-label="Útil"
        onClick={e => {e.stopPropagation(); handleFeedback(index, 'up');}}
      >👍</button>
      <button
        className="faq-btn-down"
        aria-label="Não foi útil"
        onClick={e => {e.stopPropagation(); handleFeedback(index, 'down');}}
      >👎</button>
      <span className="faq-feedback-label">Essa resposta foi útil?</span>
    </span>
  )}
</div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
