export interface PerguntaIdentificacao {
  id: string
  enunciado: string
  tipo: string
  quantidadeCaracteres: number
}

export interface UsuarioIdentificacaoResponseType {
  login: string
  termoUsoAceito: boolean
  perguntasIdentificacao: PerguntaIdentificacao[]
}

export interface UsuarioIdentificadoResponseType {
  id: string
  nome: string
  matricula: string
  emailCorporativo: string
  termoUsoAceito: boolean
}

export interface UsuarioLogadoResponseType {
  user: UsuarioLogadoType
  token: string

  bootStatus: BootstatusType
  refreshToken?: string
  error?: string
  permissoes: PermissaoUsuarioAuth[]
}

export interface UsuarioLogadoType {
  id: string
  nome: string
  email: string
  matricula: string
  foto: string
  centroCusto: string
  empresa: string
}

export interface BootstatusType {
  limiteTentativasAcesso: number
  expirarTermoUso: number
  expirarSenha: number
  expirarEmailCriarSenha: number
  expirarEmailRecuperarSenha: number
  expirarBloqueioUsuario: number
  expirarSessao: number
}

export interface PermissoesMenuResponseType {
  id: string
  descricao: string
  url: string
  icone: string
  idModulo: string
}

export interface PaginaUsuarioAuth {
  id: string
  descricao: string
  url: string
}

export interface AcaoUsuarioAuth {
  id: string
  descricao: string
}

export interface PermissaoUsuarioAuth {
  idPagina: string
  idAcao: string
  pagina: PaginaUsuarioAuth
  acao: AcaoUsuarioAuth
}
