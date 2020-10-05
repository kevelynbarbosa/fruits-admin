import React, { useEffect, useState } from 'react'

import Calendar from 'rc-year-calendar'
import 'rc-year-calendar/locales/rc-year-calendar.pt'

import { Event, DayClickResponse, EventYear } from './types'

type Props = {
  handleDayClick(data: DayClickResponse): void
  events: Event[]
  initialDate?: Date
}

const YearlyView: React.FC<Props> = ({ handleDayClick, events, initialDate }: Props) => {
  const [formattedEvents, setFormattedEvents] = useState<EventYear[]>()

  useEffect(() => {
    setFormattedEvents(
      events.map((event) => ({
        id: event.id,
        startDate: new Date(`${event.data} 00:00:00`),
        endDate: new Date(`${event.data} 23:59:00`),
        name: event.descricao,
        color: '#007bff',
      })),
    )
  }, [events])

  return (
    <div className="col-12" style={{ marginTop: 25 }}>
      <Calendar
        language="pt"
        defaultYear={initialDate ? initialDate.getFullYear() : new Date().getFullYear()}
        onDayClick={({ events: evt }) => {
          if (evt.length > 0) {
            handleDayClick({ value: evt[0].id, type: 'Anual' })
          }
        }}
        dataSource={formattedEvents}
        displayHeader={false}
      />
    </div>
  )
}

export default YearlyView
