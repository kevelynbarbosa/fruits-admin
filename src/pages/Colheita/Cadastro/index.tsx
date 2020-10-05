import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import ContentBox from 'components/ContentBox/ContentBox'

import TextFieldForm from 'components/TextFieldForm'
import { http } from 'hooks/useHttpInterceptor'

import { handleLoading } from 'store/reducers/layout/actions'
import Swal from 'sweetalert2'
import SelectField from 'components/SelectField'
import OptionType from 'interfaces/option-type'
import DatepickerField from 'components/DatepickerField'

interface InputsType {
  information: string
  date: string
  grossWeight: number
}

const ColheitaCadastro: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [tree, setTree] = useState<OptionType>()
  const [treeOptions, setTreeOptions] = useState<OptionType[]>([])

  const { register, handleSubmit, errors } = useForm<InputsType>({})

  useEffect(() => {
    const loadTrees = async () => {
      dispatch(handleLoading(true))

      const { data } = await http.get<any>('trees')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setTreeOptions(options)

      dispatch(handleLoading(false))
    }

    loadTrees()
  }, [setTreeOptions, dispatch])

  const handleSubmitTerm = async ({
    information,
    grossWeight,
    date,
  }: InputsType) => {
    const harvest = {
      information: information,
      idTree: tree?.value,
      grossWeight: +grossWeight,
      date: date,
    }

    dispatch(handleLoading(true))

    const { data } = await http.post('harvests', harvest)

    if (data) {
      Swal.fire('', 'Registro inserido com sucesso.', 'success')
      history.goBack()
    }

    dispatch(handleLoading(false))
  }

  const handleCancellation = () => {
    history.goBack()
  }

  return (
    <div>
      <h1>Colheita</h1>

      <ContentBox>
        <form onSubmit={handleSubmit(handleSubmitTerm)}>
          <div className="row form-row">
            <div className="col-6">
              <TextFieldForm
                id="information"
                label="Informação"
                placeholder="Informação"
                register={register({
                  required: true,
                  maxLength: 250,
                })}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextFieldForm
                id="grossWeight"
                label="Peso bruto"
                placeholder="Peso bruto"
                register={register({
                  required: true,
                  maxLength: 250,
                })}
                errors={errors}
                type="number"
              />
            </div>

            <div className="col-6">
              <SelectField
                id="tree"
                options={treeOptions}
                label="Árvore"
                handleChange={(option) => {
                  setTree(option)
                }}
                defaultValue={tree}
                required
                errors={errors}
                register={register({ required: true })}
              />
            </div>

            <div className="col-6">
              <DatepickerField
                register={register}
                errors={errors}
                id="date"
                form
                label="Data"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>

          <div className="box-footer right">
            <div className="col-12 text-right">
              <Button
                text="Cancelar"
                color="red"
                icon="fa fa-ban"
                handleClick={handleCancellation}
              />
              <Button
                text="Salvar"
                color="green"
                icon="fa fa-floppy-o"
                type="submit"
              />
            </div>
          </div>
        </form>
      </ContentBox>
    </div>
  )
}

export default ColheitaCadastro
