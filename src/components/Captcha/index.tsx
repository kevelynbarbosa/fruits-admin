/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from 'react'

import TextField from 'components/TextField'

type Props = {
  register: (Ref, validateRule?) => void
}

const Captcha: React.FC<Props> = ({ register }: Props) => {
  const [state, setState] = useState({
    parcela1: 0,
    parcela2: 0,
    soma: '',
  })

  useMemo(() => {
    setState({
      ...state,
      parcela1: Math.ceil(Math.random() * 10),
      parcela2: Math.ceil(Math.random() * 10),
    })
  }, [])

  return (
    <>
      <TextField type="hidden" id="captchaParcela1" register={register} defaultValue={state.parcela1} />
      <TextField type="hidden" id="captchaParcela2" register={register} defaultValue={state.parcela2} />
      <TextField
        type="number"
        id="captchaSoma"
        label={`Quanto é ${state.parcela1} + ${state.parcela2}?`}
        placeholder={`${state.parcela1} + ${state.parcela2}?`}
        register={register}
        defaultValue={state.soma}
        onChange={(event) => {
          setState({
            ...state,
            soma: event.target.value,
          })
        }}
        required
        form
      />
    </>
  )
}

export default Captcha
