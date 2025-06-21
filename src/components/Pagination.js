import React from "react";

const Pagination = ({ currentPage, totalPages, onChange }) => (
  <div className="pagination">
    <button onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>
      {"<"}
    </button>
    <span style={{ margin: "0 8px" }}>
      Página {currentPage} de {totalPages}
    </span>
    <button onClick={() => onChange(currentPage + 1)} disabled={currentPage === totalPages}>
      {">"}
    </button>
  </div>
);

export default Pagination;
