
import { _dataTarefas, TUsuario, _dataUsuarios, dadosPUTusuario } from "./types";

export async function doPUTusuario(user : dadosPUTusuario) : Promise<TUsuario>{
  const response = await fetch(`http://localhost:5000/api/v1/usuarios/${user.email}`, {
    method: "PUT",
    body: JSON.stringify(
      user
    ),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const saida : _dataUsuarios = await response.json();
  return saida._data;
}