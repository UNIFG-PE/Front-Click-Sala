// Recebe Lista, filtros e busca. Retorna lista filtrada e ordenada
export function filterAndSortUsers(users, { search, status, role, sort }) {
  let data = [...users];

  if (search)
    data = data.filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.matricula.includes(search)
    );

  if (status) data = data.filter(u => u.status === status);
  if (role) data = data.filter(u => u.role === role);

  switch (sort) {
    case "name-asc":
      data.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      data.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "matricula-asc":
      data.sort((a, b) => a.matricula.localeCompare(b.matricula));
      break;
    case "matricula-desc":
      data.sort((a, b) => b.matricula.localeCompare(a.matricula));
      break;
    case "status-asc":
      data.sort((a, b) => a.status.localeCompare(b.status));
      break;
    case "role-asc":
      data.sort((a, b) => a.role.localeCompare(b.role));
      break;
    default:
  }
  return data;
}
