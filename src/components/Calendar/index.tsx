import React, { useState, JSXElementConstructor } from 'react'

import SelectField from 'components/SelectField'
import OptionType from 'interfaces/option-type'

import MonthlyView from './MonthlyView'
import { Event, DayClickResponse } from './types'
import YearlyView from './YearlyView'

type Props = {
  events: Event[]
  ListView: JSX.Element
  handleDayClick(data: DayClickResponse): void
  initialDate?: Date
}

const Calendar: React.FC<Props> = ({ events, ListView, handleDayClick, initialDate }: Props) => {
  const [viewType, setViewType] = useState<OptionType>({
    value: '2',
    label: 'Mensal',
  })

  const options: OptionType[] = [
    { value: '1', label: 'Lista' },
    { value: '2', label: 'Mensal' },
    { value: '3', label: 'Anual' },
  ]

  return (
    <div className="">
      <div className="row d-flex justify-content-end">
        <div className="col-4">
          <SelectField
            id="exibicao"
            options={options}
            label="Exibição"
            handleChange={(option: OptionType) => setViewType(option)}
            defaultValue={viewType}
            isSearchable={false}
          />
        </div>
        {(() => {
          switch (viewType.value) {
            case '1':
              return <div className="col-12">{ListView}</div>
            case '2':
              return <MonthlyView handleDayClick={handleDayClick} events={events} initialDate={initialDate} />
            case '3':
              return <YearlyView handleDayClick={handleDayClick} events={events} initialDate={initialDate} />
            default:
              return <MonthlyView handleDayClick={handleDayClick} events={events} initialDate={initialDate} />
          }
        })()}
      </div>
    </div>
  )
}

export default Calendar
