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
}

const EspeciesCadastro: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { register, handleSubmit, errors } = useForm<InputsType>({})

  const handleSubmitTerm = async ({ description }: InputsType) => {
    const specie = {
      description: description,
    }

    dispatch(handleLoading(true))

    const { data } = await http.post('tree-species', specie)

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
      <h1>Espécies</h1>

      <ContentBox>
        <form onSubmit={handleSubmit(handleSubmitTerm)}>
          <div className="row form-row">
            <div className="col-12">
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

export default EspeciesCadastro
