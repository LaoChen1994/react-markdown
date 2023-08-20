import { FC, PropsWithChildren } from 'react'
import { IMetaComponentBase } from '.'
import {  TableBody as TableBodyType } from '../../typings'


const TableBodyCell: FC<PropsWithChildren<IMetaComponentBase<TableBodyType>>> = (props) => {
  const { children } = props

  return <tbody>{children}</tbody>
}


export default TableBodyCell