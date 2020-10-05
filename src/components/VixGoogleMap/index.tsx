import React, { useCallback, useState } from 'react'
import { LoadScript, GoogleMap, Marker, Circle } from '@react-google-maps/api'

type coord = {
  lat: number
  lng: number
}

interface Props {
  center?: coord
  radius?: number
  disabled?: boolean
  draggable?: boolean
  handleDrag?: (e) => any
}
const VixGoogleMap: React.FC<Props> = ({
  center = {
    lat: parseFloat('-20.263407'),
    lng: parseFloat('-40.29923'),
  },
  radius = 0,
  disabled = false,
  handleDrag,
  draggable = false,
}: Props) => {
  const [map, setMap] = useState(null)

  const containerStyle = {
    width: '100%',
    height: '400px',
    margin: '14px',
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_DEV_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          draggable: draggable,
          disableDefaultUI: disabled,
          center: center,
          zoom: 16,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: true,
        }}
      >
        <Marker position={center} cursor="Minha localização" draggable={draggable} onDragEnd={handleDrag} />

        <Circle
          options={{
            strokeColor: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 0.3,
          }}
          center={center}
          radius={radius}
        />
      </GoogleMap>
    </LoadScript>
  )
}
export default VixGoogleMap
