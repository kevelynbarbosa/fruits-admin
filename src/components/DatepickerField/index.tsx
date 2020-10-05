import React, { useState, ChangeEvent } from 'react'
import { NestDataObject, FieldError } from 'react-hook-form'

type Props = {
  // TODO: corrigir id no componente de tabela
  id: string
  placeholder?: string
  required?: boolean
  label?: string
  readonly?: boolean
  form?: boolean
  ref?: React.Ref<HTMLInputElement>
  register?: (Ref, validateRule?) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: NestDataObject<any, FieldError>
  max?: string
}

const DatepickerField: React.FC<Props> = ({
  id,
  placeholder,
  label,
  required = false,
  form = false,
  readonly = false,
  errors,
  register,
  max = '9999-12-31',
}: Props) => {
  const [, setDate] = useState(new Date())

  function handleChangeDate(data) {
    setDate(data)
  }

  return (
    <>
      <div className="form-group group-field-button">
        {label && (
          <label htmlFor={id} className={required ? 'error' : ''}>
            {label}
          </label>
        )}
        <input
          onChange={handleChangeDate}
          type="date"
          id={id}
          name={id}
          placeholder={placeholder}
          ref={register}
          required={required}
          style={{ paddingRight: 15 }}
          className={[
            'form-control text-field',
            form ? 'form' : '',
            required ? 'error' : '',
            readonly ? 'readonly' : '',
          ].join(' ')}
          max={max}
          disabled={readonly}
        />
        {errors[id]?.type === 'required' && (
          <span className="error">
            preenchimento
            <br /> obrigatório
          </span>
        )}
        {errors[id]?.type === 'max' && (
          <span className="error">
            data maior que a
            <br /> permitida
          </span>
        )}
        {errors[id]?.type === 'maxLength' && (
          <span className="error">
            limite de caracteres
            <br /> excedido
          </span>
        )}
      </div>
    </>
  )
}

export default DatepickerField
