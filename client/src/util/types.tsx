export type TTarefa = {
  id: string,
  usuarioEmail: string,
  titulo: string,
  descricao: string,
  dataAdicionada: Date,
  dataLimite: Date,
  dataConclusao?: Date
};

export type TUsuario = {
  email: string,
  primeiroNome: string,
  restoNome: string,
  dataNascimento: Date,
  genero: string,
  senha: string
}

export type dadosPUTusuario = {
  email: string,
  primeiroNome: string,
  restoNome: string,
  dataNascimento: Date,
  genero: string,
  senhaAntiga: string,
  senhaNova: string
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

export type _dataUsuarios = {
  _data : TUsuario
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