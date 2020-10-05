/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AcoesRapidas from 'components/AcoesRapidas'
import Breadcrumb from 'components/Breadcrumb'
import Table from 'components/Table'

import { http } from 'hooks/useHttpInterceptor'
import FilterModal, { FilterButton } from 'components/FilterModal'
import SelectField from 'components/SelectField'
import OptionType from 'interfaces/option-type'
import { toggleFilter, handleLoading } from 'store/reducers/layout/actions'
import { format } from 'date-fns'
import DatepickerField from 'components/DatepickerField'

interface ReloadFilters {
  idTree?: string
  idTreeSpecie?: string
  idTreeGroup?: string
  initialDate?: string
  finalDate?: string
}

interface InputsType {
  initialDate: string
  finalDate: string
}

const ColheitaListagem: React.FC = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [harvests, setHarvests] = useState<any[]>([])

  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [toggledClearRows, setToggledClearRows] = useState<boolean>(false)

  const [count, setCount] = useState<number>()

  const [treeOptions, setTreeOptions] = useState<OptionType[]>([])
  const [tree, setTree] = useState<OptionType>()

  const [groupOptions, setGroupOptions] = useState<OptionType[]>([])
  const [group, setGroup] = useState<OptionType>()

  const [specieOptions, setSpecieOptions] = useState<OptionType[]>([])
  const [specie, setSpecie] = useState<OptionType>()

  const [reloadFilters, setReloadFilters] = useState<ReloadFilters>(
    {} as ReloadFilters,
  )

  const { register, handleSubmit, errors, reset } = useForm<InputsType>({})

  const loadTerms = useCallback(async () => {
    dispatch(handleLoading(true))

    let { data } = await http.get<any>('harvests', {
      params: reloadFilters,
    })

    data = data.map((x) => ({
      ...x,
      date: format(new Date(x.date), 'dd/MM/yyyy'),
    }))

    setHarvests(data)
    setCount(data.length)
    setToggledClearRows(false)

    dispatch(handleLoading(false))
  }, [reloadFilters, dispatch])

  useEffect(() => {
    loadTerms()
  }, [loadTerms])

  useEffect(() => {
    const loadTrees = async () => {
      const { data } = await http.get<any>('trees')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setTreeOptions(options)
    }

    loadTrees()
  }, [setTreeOptions, dispatch])

  useEffect(() => {
    const loadGroups = async () => {
      const { data } = await http.get<any>('tree-groups')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setGroupOptions(options)
    }

    loadGroups()
  }, [setGroupOptions, dispatch])

  useEffect(() => {
    const loadSpecies = async () => {
      const { data } = await http.get<any>('tree-species')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setSpecieOptions(options)
    }

    loadSpecies()
  }, [setSpecieOptions, dispatch])

  const clear = () => {
    reset({})
  }

  const handleSubmitFilters = ({ initialDate, finalDate }: InputsType) => {
    setReloadFilters({
      ...reloadFilters,
      initialDate: initialDate,
      finalDate: finalDate,
      idTree: tree?.value,
      idTreeGroup: group?.value,
      idTreeSpecie: specie?.value,
    })

    // Close filter modal
    dispatch(toggleFilter(false))
  }

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
      name: 'Informação',
      selector: 'information',
      sortable: false,
    },
    {
      name: 'Data',
      selector: 'date',
      sortable: false,
    },
    {
      name: 'Peso bruto',
      selector: 'grossWeight',
      sortable: false,
    },
    {
      name: 'Data de cadastro',
      sortable: false,
      cell: () => '-',
    },
    {
      name: 'Data de inativação',
      sortable: false,
      cell: () => '-',
    },
  ]

  const breadcrumb = [
    {
      title: 'Colheita',
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
        history.push('/colheita/cadastro')
      },
      inlineEvent: false,
    },
  ]

  return (
    <>
      <div className="container-head">
        <div className="head-title">
          <h1>Colheita</h1>
          <Breadcrumb data={breadcrumb} />
        </div>

        <div className="head-buttons">
          <FilterButton />
        </div>
      </div>

      <Table
        columns={columns}
        data={harvests}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        paginationTotalRows={count}
        buttons={buttons}
        toggledClearRows={toggledClearRows}
        paginationServer={false}
      />

      <FilterModal onSubmit={handleSubmit(handleSubmitFilters)} clear={clear}>
        <div className="row form-row">
          <div className="col-4">
            <SelectField
              id="tree"
              options={treeOptions}
              label="Árvore"
              isClearable
              handleChange={(inputs: OptionType) => setTree(inputs)}
              defaultValue={tree}
            />
          </div>
          <div className="col-4">
            <SelectField
              id="group"
              options={groupOptions}
              label="Grupo"
              isClearable
              handleChange={(inputs: OptionType) => setGroup(inputs)}
              defaultValue={group}
            />
          </div>
          <div className="col-4">
            <SelectField
              id="specie"
              options={specieOptions}
              label="Espécie"
              isClearable
              handleChange={(inputs: OptionType) => setSpecie(inputs)}
              defaultValue={specie}
            />
          </div>
          <div className="col-6">
            <DatepickerField
              register={register}
              errors={errors}
              id="initialDate"
              form
              label="Data inicial"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div className="col-6">
            <DatepickerField
              register={register}
              errors={errors}
              id="finalDate"
              form
              label="Data final"
              placeholder="dd/mm/aaaa"
            />
          </div>
        </div>
      </FilterModal>
    </>
  )
}

export default ColheitaListagem
