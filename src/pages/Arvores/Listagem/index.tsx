/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AcoesRapidas from 'components/AcoesRapidas'
import Breadcrumb from 'components/Breadcrumb'
import Table from 'components/Table'

import { http } from 'hooks/useHttpInterceptor'
import { handleLoading } from 'store/reducers/layout/actions'

interface ReloadFilters {
  description: string
}

interface InputsType {
  description: string
}

const ArvoresListagem: React.FC = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [trees, setTrees] = useState<any[]>([])

  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [toggledClearRows, setToggledClearRows] = useState<boolean>(false)

  const [count, setCount] = useState<number>()

  const [reloadFilters, setReloadFilters] = useState<ReloadFilters>(
    {} as ReloadFilters,
  )

  const { register, handleSubmit, errors, reset } = useForm<InputsType>({})

  const loadTerms = useCallback(async () => {
    dispatch(handleLoading(true))

    const { data } = await http.get<any>('trees', {
      params: reloadFilters,
    })

    setTrees(data)
    setCount(data.length)
    setToggledClearRows(false)

    dispatch(handleLoading(false))
  }, [reloadFilters, dispatch])

  useEffect(() => {
    loadTerms()
  }, [loadTerms])

  const columns = [
    {
      name: 'Ações',
      selector: 'actions',
      sortable: false,
      width: '50px',
      cell: (row) => (
        <AcoesRapidas
          links={[
            {
              id: `${row.id}`,
              title: 'Detalhar',
              url: `/especies/detalhe/${row.id}`,
              disabledLink: true,
              isEvent: false,
            },
          ]}
        />
      ),
    },
    {
      name: 'Descrição',
      selector: 'description',
      sortable: false,
    },
    {
      name: 'Idade',
      selector: 'age',
      sortable: false,
    },
    {
      name: 'Espécie',
      selector: 'treeSpecie.description',
      sortable: false,
    },
    {
      name: 'Grupo',
      selector: 'treeGroup.name',
      sortable: false,
    },
    {
      name: 'Data de cadastro',
      selector: '-',
      sortable: false,
      cell: () => '-',
    },
    {
      name: 'Data de inativação',
      selector: '-',
      sortable: false,
      cell: () => '-',
    },
  ]

  const statusOptions = [
    {
      id: 'situacaoAtivo',
      value: '1',
      label: 'Ativo',
      defaultChecked: true,
    },
    {
      id: 'situacaoInativo',
      value: '0',
      label: 'Inativo',
      defaultChecked: false,
    },
  ]

  const breadcrumb = [
    {
      title: 'Árvores',
      url: '/#',
      readonly: true,
    },
  ]

  const buttons: any[] = [
    {
      text: 'Adicionar',
      color: 'green',
      icon: 'fas fa-user-plus',
      event: () => {
        history.push('/arvores/cadastro')
      },
      inlineEvent: false,
    },
  ]

  return (
    <>
      <div className="container-head">
        <div className="head-title">
          <h1>Árvores</h1>
          <Breadcrumb data={breadcrumb} />
        </div>
      </div>

      <Table
        columns={columns}
        data={trees}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        paginationTotalRows={count}
        buttons={buttons}
        toggledClearRows={toggledClearRows}
        paginationServer={false}
      />
    </>
  )
}

export default ArvoresListagem
