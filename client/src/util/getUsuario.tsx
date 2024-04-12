import { TUsuario, _dataUsuarios } from "./types";

export async function doGETusuario(email: string): Promise<TUsuario> {
  const response = await fetch(
    `https://codexps20232grupo4-2.onrender.com/v1/usuarios/${email}`
  );
  const saida: _dataUsuarios = await response.json();
  return saida._data;
}
