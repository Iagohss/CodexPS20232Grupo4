import { _dataTarefas, Autentication } from "./types";

export async function doDELETEtarefa(autentication: Autentication, id: string) {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas/${id}`, {
    method: "DELETE",
    body: JSON.stringify(autentication),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
