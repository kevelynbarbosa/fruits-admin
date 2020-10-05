import React from 'react'

interface RadioType {
  id: string
  value: string
  label: string
  checked?: boolean
}

interface Props {
  name: string
  options: RadioType[]
  label?: string
  register?: (Ref, validateRule?) => void
  readonly?: boolean
  checked?: boolean
}

const RadiosField: React.FC<Props> = ({
  name,
  options,
  label = 'Situação',
  register,
  readonly = false,
}: Props) => (
  <div className="form-group group-field-button">
    {label && <label>{label}</label>}
    <div style={{ display: 'flex' }}>
      {options.map((option) => {
        let checkedDefault = {}
        if (option.checked && readonly && !register) {
          checkedDefault = { checked: true }
        }

        return (
          <div style={{ marginRight: 25 }} key={option.id}>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              ref={register}
              disabled={readonly}
              {...checkedDefault}
            />
            <label
              htmlFor={option.id}
              style={{
                verticalAlign: 'middle',
                marginLeft: 5,
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                fontWeight: 400,
              }}
            >
              {option.label}
            </label>
          </div>
        )
      })}
    </div>
  </div>
)

export default RadiosField
