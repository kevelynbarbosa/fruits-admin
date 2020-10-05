export type Event = { id: string; descricao: string; data: string }

export type DayClickResponse = {
  value: string | Date
  type: 'Mensal' | 'Anual'
}

export type EventYear = {
  id: string
  startDate: Date
  endDate: Date
  name: string
}
