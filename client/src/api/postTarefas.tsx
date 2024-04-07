type DadosComSenha = {
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao: Date,
  usuarioSenha : string
}

export async function postTarefa(dadosComSenha : DadosComSenha) {
  const response = await fetch(`http://localhost:5000/api/v1/tarefas`, {
    method: "POST",
    body: JSON.stringify({
      dadosComSenha
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}