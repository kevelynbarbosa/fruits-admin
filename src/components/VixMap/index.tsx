/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl'
import { useDispatch } from 'react-redux'

import Axios from 'axios'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { handleLoading } from 'store/reducers/layout/actions'

type AddressType = {
  id?: string
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  uf?: string
  radius?: number
  latitude?: string
  longitude?: string
  readOnly?: boolean
  onSave?: () => void
}

type MapTypes = {
  latitude?: number
  longitude?: number
  zoom?: number
  width?: string
  height?: string
}

const VixMapComponent: React.FC<AddressType> = ({
  id,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  latitude,
  longitude,
  radius,
  readOnly,
  onSave,
}: AddressType) => {
  const [update, setUpdate] = useState<number>(0)

  const [viewPort, setViewPort] = useState<MapTypes>({
    latitude: -20.355671,
    longitude: -40.396278,
    zoom: 13,
    width: '100%',
    height: '400px',
  })

  const token = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
  const [raio, setRaio] = useState(0)

  useEffect(() => {
    async function getLocation(findAddress) {
      const location = await Axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${findAddress}.json?types=address&access_token=${token}`,
      )

      const coord = location.data.features.length > 0 ? location.data.features[0].geometry.coordinates : null

      setViewPort({
        ...viewPort,
        longitude: coord == null ? -40.33812 : coord[0],
        latitude: coord == null ? -20.3222 : coord[1],
      })
    }

    if (latitude && longitude) {
      setViewPort({
        ...viewPort,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      })
    } else if (rua && numero && bairro && cidade && uf) {
      const findAddress = `${rua} ${numero} ${bairro} ${cidade} ${uf} BR`
      getLocation(findAddress)
    }

    if (radius) setRaio(radius)
    else setRaio(0)
  }, [bairro, cidade, numero, rua, uf, latitude, longitude, radius, update])

  const handleChangeRadius = (e) => {
    setRaio(parseInt(e.target.value))
  }

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="row form-row">
          <div className="col-3">
            <TextField
              type="text"
              id="latitude"
              label="Latitude"
              placeholder="Latitude"
              defaultValue={viewPort.latitude}
              form
              readonly
            />
          </div>
          <div className="col-3">
            <TextField
              type="text"
              id="longitude"
              label="Longitude"
              placeholder="Longitude"
              defaultValue={viewPort.longitude}
              form
              readonly
            />
          </div>
          <div className="col-2">
            <div className="form-group group-field-button">
              <label htmlFor="raio">Raio</label>

              <input
                id="raio"
                name="raio"
                type="number"
                placeholder="Raio em metros"
                autoComplete="off"
                value={raio}
                onChange={handleChangeRadius}
                required
                disabled={readOnly}
                className={readOnly ? 'form-control text-field readonly form' : 'form-control text-field form'}
              />
            </div>
          </div>
        </div>
        <ReactMapGL
          mapboxApiAccessToken={token}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          latitude={viewPort.latitude}
          longitude={viewPort.longitude}
          zoom={viewPort.zoom}
          width={viewPort.width}
          height={viewPort.height}
        >
          <Source
            id="teste"
            type="geojson"
            data={{
              type: 'Feature',
              properties: {
                radius: 443.0003055263856,
              },
              geometry: { type: 'Point', coordinates: [viewPort.longitude, viewPort.latitude] },
            }}
          >
            <Layer
              type="circle"
              source="teste"
              paint={{
                'circle-color': '#60bed4',
                'circle-opacity': 0.2,
                'circle-radius': raio,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#60bed4',
              }}
            />
          </Source>

          <Marker latitude={viewPort.latitude} longitude={viewPort.longitude} className="marker-map">
            <i className="fas fa-map-marker-alt" />
          </Marker>
        </ReactMapGL>
      </div>
      {!readOnly && (
        <div className="box-footer">
          <Button
            type="button"
            color="red"
            text="Cancelar"
            icon="fa fa-ban"
            handleClick={() => setUpdate(update + 1)}
          />
          <Button type="submit" color="green" text="Salvar" icon="fa fa-save" />
        </div>
      )}
    </form>
  )
}
export default VixMapComponent
