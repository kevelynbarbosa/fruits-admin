import React from 'react'

interface PropTypes {
  data: {
    title: string
    url: string
    target?: string
    readonly?: boolean
  }[]
}
const Breadcrumb: React.FC<PropTypes> = ({ data }: PropTypes) => (
  <ul className="breadcrumbs">
    <li>
      <a href="/#">
        <i className="fas fa-home" />
        &nbsp; Início
      </a>
    </li>
    {data.map((item, i, arr) => (
      <li key={`${item.url}-${i}`}>
        {arr.length - 1 === i || item.readonly ? item.title : <a href={item.url}>{item.title}</a>}
      </li>
    ))}
  </ul>
)

export default Breadcrumb
