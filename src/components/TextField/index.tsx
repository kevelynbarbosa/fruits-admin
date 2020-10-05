/* eslint-disable no-shadow */
import React, { useState, ChangeEvent, useCallback } from 'react'
import DatePicker from 'react-date-picker'

type PropTypes = {
  id: string
  type: string
  placeholder?: string
  format?: 'number' | 'string'
  required?: boolean
  label?: string
  hasConfirmButton?: boolean
  iconButton?: string
  textButton?: string
  readonly?: boolean
  form?: boolean
  defaultValue?: string | number
  ref?: React.Ref<HTMLInputElement>
  register?: (Ref, validateRule?) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  mask?: 'celular' | 'cpf' | 'telefoneFixo' | 'cnpj' | 'cep'
}

const TextField: React.FC<PropTypes> = ({
  id,
  type,
  placeholder,
  label,
  hasConfirmButton,
  iconButton,
  textButton,
  required = false,
  form = false,
  readonly = false,
  defaultValue,
  register,
  maxLength = 250,
  mask,
}: PropTypes) => {
  const [value, setValue] = useState(defaultValue)
  const [date, setDate] = useState(new Date())
  const [isValid, setIsValid] = useState(true)

  const handleValidate = useCallback(() => {
    const valid = required && value !== ''
    setIsValid(valid)
  }, [value, required])

  // eslint-disable-next-line no-shadow
  function handleMask(value: string) {
    switch (mask) {
      case 'celular':
        return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
      case 'telefoneFixo':
        return value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3')
      case 'cpf':
        return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
      case 'cnpj':
        return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
      case 'cep':
        return value.replace(/^(\d{5})(\d{3}).*/, '$1-$2')
      default:
        return value
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, hasMask) {
    const valor = event.target.value
    let valorFormatado = event.target.value
    if (hasMask && hasMask !== undefined) {
      valorFormatado = handleMask(valor)
    }
    setValue(valorFormatado)
    handleValidate()
  }

  function handleChangeDate(date) {
    setDate(date)
  }

  return (
    <>
      {type === 'hidden' ? (
        <input type="hidden" id={id} name={id} ref={register} value={value} />
      ) : (
        <div className="form-group group-field-button">
          {label && (
            <label htmlFor={id} className={required && !isValid ? 'error' : ''}>
              {label}
            </label>
          )}
          {type !== 'datepicker' && (
            <>
              <input
                id={id}
                name={id}
                type={type}
                ref={register}
                placeholder={placeholder}
                readOnly={readonly}
                maxLength={maxLength}
                autoComplete="off"
                value={value}
                onChange={(e) => handleChange(e, mask)}
                required={required}
                onKeyUp={handleValidate}
                className={[
                  'form-control text-field hide-arrows-input',
                  form ? 'form' : '',
                  required && !isValid ? 'error' : '',
                  readonly ? 'readonly' : '',
                ].join(' ')}
              />

              {required && !isValid && (
                <span className="error">
                  preenchimento
                  <br />
                  obrigatório
                </span>
              )}
              {hasConfirmButton && (
                <button type="button" className="confirm-button">
                  {iconButton && <i className={iconButton} />}
                  {textButton && <i className={textButton} />}
                </button>
              )}
            </>
          )}

          {type === 'datepicker' && (
            <DatePicker
              onChange={handleChangeDate}
              value={date}
              calendarIcon={null}
              clearIcon={null}
              format="dd/MM/yyyy"
              dayPlaceholder="__"
              monthPlaceholder="__"
              yearPlaceholder="____"
              required
              className={[
                'form-control text-field',
                form ? 'form' : '',
                required ? 'error' : '',
                readonly ? 'readonly' : '',
              ].join(' ')}
            />
          )}
        </div>
      )}
    </>
  )
}

export default TextField
