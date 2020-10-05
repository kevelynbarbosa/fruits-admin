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

interface InputsType {
  description: string
  age: number
}

const ArvoresCadastro: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [specie, setSpecie] = useState<OptionType>()
  const [specieOptions, setSpecieOptions] = useState<OptionType[]>([])

  const [group, setGroup] = useState<OptionType>()
  const [groupOptions, setGroupOptions] = useState<OptionType[]>([])

  const { register, handleSubmit, errors } = useForm<InputsType>({})

  useEffect(() => {
    const loadSpecies = async () => {
      dispatch(handleLoading(true))

      const { data } = await http.get<any>('tree-species')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setSpecieOptions(options)

      dispatch(handleLoading(false))
    }

    loadSpecies()
  }, [setSpecieOptions, dispatch])

  useEffect(() => {
    const loadGroups = async () => {
      dispatch(handleLoading(true))

      const { data } = await http.get<any>('tree-groups')

      const options = data.map((specie) => ({
        value: specie.id,
        label: specie.description,
      }))

      setGroupOptions(options)

      dispatch(handleLoading(false))
    }

    loadGroups()
  }, [setGroupOptions, dispatch])

  const handleSubmitTerm = async ({ description, age }: InputsType) => {
    const tree = {
      description: description,
      age: +age,
      idTreeSpecie: specie?.value,
      idTreeGroup: group?.value,
    }

    dispatch(handleLoading(true))

    const { data } = await http.post('trees', tree)

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
      <h1>Árvores</h1>

      <ContentBox>
        <form onSubmit={handleSubmit(handleSubmitTerm)}>
          <div className="row form-row">
            <div className="col-6">
              <TextFieldForm
                id="description"
                label="Descrição"
                placeholder="Descrição"
                register={register({
                  required: true,
                  maxLength: 250,
                })}
                errors={errors}
              />
            </div>
            <div className="col-6">
              <TextFieldForm
                id="age"
                label="Idade"
                placeholder="Idade"
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
                id="specie"
                options={specieOptions}
                label="Espécie"
                handleChange={(option) => {
                  setSpecie(option)
                }}
                defaultValue={specie}
                required
                errors={errors}
                register={register({ required: true })}
              />
            </div>

            <div className="col-6">
              <SelectField
                id="group"
                options={groupOptions}
                label="Grupo"
                handleChange={(option) => {
                  setGroup(option)
                }}
                defaultValue={group}
                required
                errors={errors}
                register={register({ required: true })}
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

export default ArvoresCadastro
