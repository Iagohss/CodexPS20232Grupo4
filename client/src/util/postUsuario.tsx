import { _dataTarefas, TUsuario, _dataUsuarios } from "./types";

export async function doPOSTusuario(newUsuario: TUsuario): Promise<TUsuario> {
  const response = await fetch(`https://codexps20232grupo4-2.onrender.com/api/v1/usuarios`, {
    method: "POST",
    body: JSON.stringify(newUsuario),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida: _dataUsuarios = await response.json();
  return saida._data;
}
