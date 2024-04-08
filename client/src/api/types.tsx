export type TTarefa = {
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao: Date
};

export type _dataTarefas = {
  _data : TTarefa
}

export type DadosComSenha = {
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao: Date,
  usuarioSenha : string
}