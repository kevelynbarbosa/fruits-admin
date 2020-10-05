/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react'

export interface CurrentPosition {
  latitude: number
  longitude: number
  accuracy: number
}

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<CurrentPosition>()
  const [erro, setErro] = useState<string>()

  const handleSuccess = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords

    setLocation({
      latitude,
      longitude,
      accuracy,
    })
  }

  const handleError = (error) => {
    if (error.code === 1) {
      setErro('Precisamos de permissão para acessar sua localização.')
    } else {
      setErro(error.message)
    }
  }

  useEffect(() => {
    const { geolocation } = navigator
    if (!geolocation) {
      setErro('Não foi possível obter sua localização. Verifique as permissões do navegador.')
      return
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options)
  }, [options])

  return { location, erro }
}

export default useCurrentLocation
