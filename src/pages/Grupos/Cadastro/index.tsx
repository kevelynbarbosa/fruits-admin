import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import ContentBox from 'components/ContentBox/ContentBox'

import TextFieldForm from 'components/TextFieldForm'
import { http } from 'hooks/useHttpInterceptor'

import { handleLoading } from 'store/reducers/layout/actions'
import Swal from 'sweetalert2'

interface InputsType {
  description: string
  name: string
}

const GruposCadastro: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { register, handleSubmit, errors } = useForm<InputsType>({})

  const handleSubmitTerm = async ({ description, name }: InputsType) => {
    const group = {
      name: name,
      description: description,
    }

    dispatch(handleLoading(true))

    const { data } = await http.post('tree-groups', group)

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
      <h1>Grupos árvore</h1>

      <ContentBox>
        <form onSubmit={handleSubmit(handleSubmitTerm)}>
          <div className="row form-row">
            <div className="col-6">
              <TextFieldForm
                id="name"
                label="Nome"
                placeholder="Nome"
                register={register({
                  required: true,
                  maxLength: 250,
                })}
                errors={errors}
              />
            </div>
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

export default GruposCadastro
