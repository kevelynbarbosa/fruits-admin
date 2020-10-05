/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react'
import { NestDataObject, FieldError } from 'react-hook-form'

import HelperTooltip from 'components/HelperTooltip'
import Tooltip from 'components/Tooltip'

interface LabelInfo {
  icon: string
  message: string
}

interface Props {
  id: string
  placeholder?: string
  label?: string
  register: (Ref, validateRule?) => void
  errors: NestDataObject<any, FieldError>
  readonly?: boolean
  helperIdentifier?: string
  labelInfo?: LabelInfo
  tabIndex?: number
  type?: 'text' | 'email' | 'number' | 'tel'
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  size?: 'small'
  numberType?: 'decimal'
}

type StateProp = {
  pattern: string
  step?: string
}

const TextFieldForm: React.FC<Props> = ({
  id,
  placeholder,
  label,
  register,
  errors,
  readonly = false,
  helperIdentifier,
  labelInfo,
  tabIndex,
  type = 'text',
  minLength,
  maxLength,
  min,
  max,
  size,
  numberType,
}: Props) => {
  const [prop, setProp] = useState<StateProp>({} as StateProp)
  const [hasErros, setHasErros] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'number') {
      setProp({
        pattern: '[0-9]*',
      })
    }
    if (numberType === 'decimal') {
      setProp({
        pattern: '[0-9]*',
        step: '0.01',
      })
    }
  }, [])

  const styles = {
    paddingRight: type === 'number' ? 15 : 'inherit',
  }
  const hadleChange = (e) => {
    if (numberType && maxLength && e.target.value.lenght > maxLength) setHasErros(true)
    else setHasErros(false)
  }
  return (
    <div className="form-group group-field-button">
      {label && (
        <label htmlFor={id} className={errors[id] ? 'error' : ''}>
          {label}
        </label>
      )}

      {helperIdentifier && (
        <span className="pl-1">
          <HelperTooltip identifier={helperIdentifier} />
        </span>
      )}

      {labelInfo && (
        <span className="pl-1">
          <Tooltip icon={labelInfo.icon} message={labelInfo.message} />
        </span>
      )}

      <input
        id={id}
        name={id}
        type={type}
        ref={register}
        placeholder={placeholder}
        autoComplete="off"
        readOnly={readonly}
        className={[
          'form text-field',
          size !== 'small' ? 'form-control' : 'campo-pequeno',
          errors[id] ? 'error' : '',
          readonly ? 'readonly' : '',
        ].join(' ')}
        tabIndex={tabIndex}
        autoFocus={tabIndex === 0}
        style={styles}
        maxLength={maxLength}
        minLength={minLength}
        onChange={hadleChange}
        min={min}
        max={max}
        {...prop}
      />

      {errors[id]?.type === 'required' && (
        <span className="error">
          preenchimento
          <br /> obrigatório
        </span>
      )}

      {hasErros ||
        (errors[id]?.type === 'maxLength' && (
          <span className="error">
            limite de caracteres
            <br /> excedido
          </span>
        ))}
    </div>
  )
}

export default TextFieldForm
