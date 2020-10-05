import React from 'react'
import DataTable, {
  createTheme,
  IDataTableColumn,
  IDataTableStyles,
} from 'react-data-table-component'

import Button from 'components/Button'
import TextField from 'components/TextField'

import { vixStyles, vixTheme } from './table-theme'

interface ButtonProps {
  text: string
  color: 'green' | 'red' | 'blue' | 'orange' | 'yellow' | 'gray' | 'transparent'
  icon: string
  event: () => void
  inlineEvent: boolean
  hidden: boolean
  disabled?: boolean
}

interface Props {
  columns: any
  data: any
  setSelectedRows?: (selectedRows: any[]) => void
  selectedRows?: any[]
  onChangePage?: (newPage: number) => Promise<void> | void
  onChangeRowsPerPage?: (newPageSize: number) => Promise<void> | void
  paginationTotalRows?: number
  paginationServer?: boolean
  selectableRows?: boolean
  hideSearchField?: boolean
  buttons?: ButtonProps[]
  toggledClearRows?: boolean
  pagination?: boolean
  onSort?: (column: IDataTableColumn, direction: string) => Promise<void> | void
  expandableRows?: boolean
  expandableRowsComponent?: React.ReactNode
  customStyle?: IDataTableStyles
}

const Table: React.FC<Props> = ({
  columns,
  data,
  setSelectedRows,
  selectedRows,
  onChangePage,
  onChangeRowsPerPage,
  paginationTotalRows,
  paginationServer = true,
  hideSearchField = true,
  selectableRows = true,
  buttons,
  toggledClearRows = false,
  pagination = true,
  onSort,
  customStyle = undefined,
  expandableRows = false,
  expandableRowsComponent,
}: Props) => {
  createTheme('vixTheme', customStyle ? {} : vixTheme)

  const handleSelected = ({ selectedRows }) => {
    if (setSelectedRows) setSelectedRows(selectedRows)
  }

  return (
    <div className="table-content">
      {(!hideSearchField || buttons) && (
        <div className="table-actions">
          {!hideSearchField && (
            <div className="text-form">
              <TextField
                id=""
                type="text"
                format="string"
                placeholder="Nome do campo"
                hasConfirmButton
                iconButton="fas fa-search"
              />
            </div>
          )}

          {buttons && (
            <div className="buttons-bar">
              {buttons.map((button) => (
                <Button
                  key={button.text}
                  text={button.text}
                  color={button.color}
                  icon={button.icon}
                  handleClick={button.event}
                  disabled={
                    (button.inlineEvent &&
                      (!selectedRows || selectedRows.length <= 0)) ||
                    button.disabled
                  }
                  hidden={button.hidden}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="table-content-body">
        <DataTable
          noHeader
          data={data}
          onSort={onSort}
          theme="vixTheme"
          columns={columns}
          sortServer={!!onSort}
          pagination={pagination}
          selectableRowsHighlight
          customStyles={customStyle || vixStyles}
          onChangePage={onChangePage}
          selectableRows={selectableRows}
          dense
          expandableRows={expandableRows}
          progressComponent="Carregando..."
          noDataComponent="Nenhum registro encontrado."
          expandableRowsComponent={expandableRowsComponent}
          paginationComponentOptions={{
            rowsPerPageText: 'Registros por página',
            rangeSeparatorText: 'de',
          }}
          onSelectedRowsChange={handleSelected}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={paginationTotalRows}
          paginationServer={paginationServer}
          clearSelectedRows={toggledClearRows}
        />
      </div>
    </div>
  )
}
export default Table
