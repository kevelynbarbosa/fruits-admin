import React, { useMemo } from 'react'
import { Chart } from 'react-charts'

const LineChart: React.FC = () => {
  const data = useMemo(
    () => [
      {
        label: 'Colaboradores VIX',
        data: [
          ['Jan', 9212],
          ['Fev', 9312],
          ['Mar', 9342],
          ['Abr', 9410],
          ['Mai', 9451],
        ],
      },
      {
        label: 'Usuários VAPT',
        data: [
          ['Jan', 1234],
          ['Fev', 2134],
          ['Mar', 2854],
          ['Abr', 3212],
          ['Mai', 4321],
        ],
      },
    ],
    [],
  )

  const axes = useMemo(
    () => [
      {
        primary: true,
        type: 'ordinal',
        position: 'bottom',
      },
      {
        type: 'linear',
        position: 'left',
      },
    ],
    [],
  )

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        paddingTop: '15px',
      }}
    >
      <Chart data={data} axes={axes} tooltip primaryCursor secondaryCursor />
    </div>
  )
}

export default LineChart
