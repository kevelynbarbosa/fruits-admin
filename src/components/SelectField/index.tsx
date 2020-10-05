import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { NestDataObject, FieldError, useForm } from 'react-hook-form'
import Select from 'react-select'

import HelperTooltip from 'components/HelperTooltip'

import OptionType from '../../interfaces/option-type'

interface Props {
  id: string
  options?: OptionType[]
  label?: string
  handleChange?: (option: any) => void
  defaultValue?: OptionType[] | OptionType | null
  readonly?: boolean
  isMulti?: boolean
  isClearable?: boolean
  helperIdentifier?: string
  tabIndex?: number
  required?: boolean
  showMessageValidateFields?: boolean
  isSearchable?: boolean
  register?: (Ref, validateRule?) => void
  errors?: NestDataObject<any, FieldError>
}

const SelectField: React.FC<Props> = ({
  id,
  options,
  label = 'Selecione',
  handleChange,
  defaultValue = null,
  readonly = false,
  isMulti = false,
  isClearable = false,
  helperIdentifier,
  tabIndex,
  required = false,
  showMessageValidateFields = false,
  isSearchable = true,
  register,
  errors,
}: Props) => {
  const [value, setValue] = useState<OptionType | OptionType[] | null>(null)
  const [empty, setEmpty] = useState<boolean>(!defaultValue)

  useEffect(() => {
    if (value !== defaultValue) {
      if (Array.isArray(defaultValue)) {
        setValue(defaultValue as OptionType[])
        setEmpty(false)
      } else if (defaultValue) {
        setValue(defaultValue as OptionType)
        setEmpty(false)
      } else {
        setValue(null)
        setEmpty(true)
      }
    }
  }, [setValue, defaultValue, value])

  const onChangeValue = (selected) => {
    setValue(selected as OptionType)
    setEmpty(!selected)
    if (handleChange) handleChange(selected)
  }

  const noop = (e) => e

  return (
    <div className="form-group group-field-button select-form">
      {label && (
        <label
          htmlFor={id}
          className={
            !defaultValue && errors && errors[id]?.type === 'required'
              ? 'error'
              : ''
          }
        >
          {label}
        </label>
      )}

      <Select
        id={id}
        name={id}
        value={value}
        onChange={onChangeValue}
        placeholder="Selecione"
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={readonly}
        noOptionsMessage={() => 'Não há registros'}
        tabIndex={`${tabIndex}`}
        className={[
          !defaultValue && errors && errors[id]?.type === 'required'
            ? 'input-error'
            : '',
        ].join(' ')}
      />

      <input
        name={id}
        tabIndex={-1}
        autoComplete="off"
        style={{
          opacity: 0,
          width: '100%',
          height: 0,
          position: 'absolute',
        }}
        value={!empty ? JSON.stringify(value) : ''}
        onChange={noop}
        ref={register}
      />
      {!defaultValue && errors && errors[id]?.type === 'required' && (
        <span className="error-select">
          preenchimento
          <br /> obrigatório
        </span>
      )}
    </div>
  )
}
export default SelectField
