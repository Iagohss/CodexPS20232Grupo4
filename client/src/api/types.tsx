export type TTarefa = {
  id: string,
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao?: Date
};

export type TarefaNoAutentication = {
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao?: Date
};

export type _dataTarefas = {
  _data : TTarefa
}

export type DadosComSenha = {
  id: string,
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao?: Date,
  usuarioSenha : string
}

export type DadosComSenhaNoId = {
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao?: Date,
  usuarioSenha : string
}

export type Autentication = {
  usuarioEmail: string,
  usuarioSenha : string
}