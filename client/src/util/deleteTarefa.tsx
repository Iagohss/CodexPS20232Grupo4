import { _dataTarefas, Autentication } from "./types";

export async function doDELETEtarefa(autentication: Autentication, id: string) {
  const response = await fetch(`https://codexps20232grupo4-2.onrender.com/api/v1/tarefas/${id}`, {
    method: "DELETE",
    body: JSON.stringify(autentication),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
