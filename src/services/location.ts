export interface CurrentPosition {
  lat: number
  lng: number
  accuracy: number
}

export function getLocation(): CurrentPosition | null {
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position
    const latLng = {
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy,
    }
    return latLng
  })
  return null
}
