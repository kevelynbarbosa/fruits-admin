import React, { ReactNode, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFilter } from '../../store/reducers/layout/actions'
import { ReduxState } from '../../store/types'

interface Props {
  children: ReactNode
  title?: string
  icon?: string
  onSubmit: () => void
  showMessageEmptyFields?: boolean
  clear: () => void
}

export const FilterButton = () => {
  const dispatch = useDispatch()

  const filterToggled = useSelector<ReduxState, boolean>((state) => state.layoutReducer.filterToggled)

  function handleOpen() {
    dispatch(toggleFilter(!filterToggled))
  }

  useEffect(() => {
    return () => {
      dispatch(toggleFilter(false))
    }
  }, [])

  return (
    <button type="button" className={`btn-vix gray${filterToggled ? ' active' : ''}`} onClick={handleOpen}>
      <i className="fas fa-filter" /> Filtros
    </button>
  )
}

const FilterModal: React.FC<Props> = ({ children, onSubmit, showMessageEmptyFields = false, clear }: Props) => {
  const dispatch = useDispatch()

  const filterToggled = useSelector<ReduxState, boolean>((state) => state.layoutReducer.filterToggled)

  const handleOpen = () => {
    dispatch(toggleFilter(!filterToggled))
  }

  const handleClick = () => {
    if (!children && !showMessageEmptyFields) {
      dispatch(toggleFilter(!filterToggled))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`${filterToggled ? 'show' : 'hide'} filter-modal`}>
        <div className="box-body">
          {children}
          {showMessageEmptyFields && (
            <div className="row">
              <div className="col">
                <Alert variant="warning">Informe pelo menos um filtro para que a consulta seja realizada.</Alert>
              </div>
            </div>
          )}
        </div>
        <div className="box-footer">
          <button
            type="button"
            className="btn-vix pull-left"
            style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            onClick={clear}
          >
            Limpar filtros
          </button>
          <button type="button" className="btn-vix transparent" onClick={handleOpen}>
            Cancelar
          </button>

          <button type="submit" className="btn-vix gray" onClick={handleClick}>
            Filtrar
          </button>
        </div>
      </div>
    </form>
  )
}

export default FilterModal
