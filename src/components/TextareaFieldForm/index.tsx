import React from 'react'
import { NestDataObject, FieldError } from 'react-hook-form'

import { kMaxLength } from 'buffer'

interface Props {
  id: string
  placeholder?: string
  label?: string
  register: (Ref, validateRule?) => void
  errors: NestDataObject<any, FieldError>
  readonly?: boolean
  helperIdentifier?: string
  rows?: number
  value?: string
  maxLength?: number
  size?: 'small'
  showMessageValidateFields?: boolean
}

const TextareaFieldForm: React.FC<Props> = ({
  id,
  placeholder,
  label,
  register,
  errors,
  readonly = false,
  helperIdentifier,
  rows,
  value,
  maxLength,
  size,
  showMessageValidateFields,
}: Props) => (
  <div className="form-group group-field-button">
    {label && (
      <label htmlFor={id} className={errors[id] ? 'error' : ''}>
        {label}
      </label>
    )}

    <textarea
      id={id}
      name={id}
      ref={register}
      placeholder={placeholder}
      autoComplete="off"
      rows={rows}
      maxLength={maxLength}
      disabled={readonly}
      className={[
        'form text-field',
        size !== 'small' ? 'form-control' : 'campo-pequeno',
        errors[id] ? 'error' : '',
        readonly ? 'readonly' : '',
      ].join(' ')}
    />

    {errors[id]?.type === 'required' && (
      <span className="error">
        preenchimento
        <br /> obrigatório
      </span>
    )}
    {errors[id]?.type === 'maxLength' && (
      <span className="error">
        limite de caracteres
        <br /> excedido
      </span>
    )}
  </div>
)

export default TextareaFieldForm
