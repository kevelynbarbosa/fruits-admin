import React from 'react'

interface RadioType {
  id: string
  value: string
  label: string
}

interface Props {
  options: RadioType[]
  label?: string
  register?: (Ref, validateRule?) => void
  readonly?: boolean
}

const ChecksField: React.FC<Props> = ({
  options,
  label = 'Situação',
  register,
  readonly = false,
}: Props) => (
  <div className="form-group group-field-button">
    {label && <label>{label}</label>}

    <div className="row">
      {options.map((option) => (
        <div className="col" key={option.id}>
          <input
            type="checkbox"
            id={option.id}
            name={option.id}
            ref={register}
            disabled={readonly}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  </div>
)

export default ChecksField
