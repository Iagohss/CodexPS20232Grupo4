import { TUsuario, _dataUsuarios } from "./types";

export async function doGETusuario(email: string): Promise<TUsuario> {
  const response = await fetch(
    `http://localhost:5000/api/v1/usuarios/${email}`
  );
  const saida: _dataUsuarios = await response.json();
  return saida._data;
}
