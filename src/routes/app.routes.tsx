import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EspeciesListagem from 'pages/Especies/Listagem'
import EspeciesCadastro from 'pages/Especies/Cadastro'
import GruposCadastro from 'pages/Grupos/Cadastro'
import GruposListagem from 'pages/Grupos/Listagem'
import ArvoresCadastro from 'pages/Arvores/Cadastro'
import ArvoresListagem from 'pages/Arvores/Listagem'
import ColheitaCadastro from 'pages/Colheita/Cadastro'
import ColheitaListagem from 'pages/Colheita/Listagem'

const AppRoutes: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <EspeciesListagem />
    </Route>

    <Route path="/especies" exact>
      <EspeciesListagem />
    </Route>

    <Route path="/especies/cadastro" exact>
      <EspeciesCadastro />
    </Route>

    <Route path="/grupos" exact>
      <GruposListagem />
    </Route>

    <Route path="/grupos/cadastro" exact>
      <GruposCadastro />
    </Route>

    <Route path="/arvores" exact>
      <ArvoresListagem />
    </Route>

    <Route path="/arvores/cadastro" exact>
      <ArvoresCadastro />
    </Route>

    <Route path="/colheita" exact>
      <ColheitaListagem />
    </Route>

    <Route path="/colheita/cadastro" exact>
      <ColheitaCadastro />
    </Route>

    <Route path="*">
      <h1>404</h1>
      <h4>Página não encontrada</h4>
    </Route>
  </Switch>
)

export default AppRoutes
