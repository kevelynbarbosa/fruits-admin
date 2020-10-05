import React, { createRef, useState, useEffect } from 'react'

import FullCalendar, { EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { Event, DayClickResponse } from './types'

type Props = {
  events: Event[]
  handleDayClick(data: DayClickResponse): void
  initialDate?: Date
}

const MonthlyView: React.FC<Props> = ({ events, handleDayClick, initialDate }: Props) => {
  const [formattedEvents, setFormattedEvents] = useState<EventInput[]>()
  const calendarRef = createRef<FullCalendar>()

  useEffect(() => {
    setFormattedEvents(
      events.map(({ id, descricao, data: dateEvent }) => ({
        id,
        title: descricao,
        date: dateEvent,
      })),
    )
  }, [events])

  return (
    <div className="col-12" style={{ marginTop: 25 }}>
      <FullCalendar
        locale="pt-BR"
        ref={calendarRef}
        initialDate={initialDate ?? new Date()}
        events={formattedEvents}
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: '',
        }}
        eventClick={({ event }) => {
          handleDayClick({ value: event.id, type: 'Mensal' })
        }}
        dateClick={({ date }) => {
          handleDayClick({ value: date, type: 'Mensal' })
        }}
      />
    </div>
  )
}

export default MonthlyView
