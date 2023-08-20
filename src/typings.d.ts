import { TableRow, TableCell, PhrasingContent, ListItem as ListItemType } from 'mdast'

export interface TableHead {
  type: 'tableHead',
  children: TableContentMap[keyof TableContentMap][]
}

export interface TableHeadCell {
  type: 'tableHeadCell',
  children: PhrasingContent[]
}

export interface TableBody {
  type: 'tableBody',
  children: TableRow[]
}

declare module 'mdast' {
  interface TableContentMap {
    tableRow: TableRow;
    tableHead: TableHead;
    tableBody: TableBody;
  }

  interface RowContentMap {
    tableCell: TableCell;
    tableHeadCell: TableHeadCell;
  }

  interface ListItem extends ListItemType {
    order?: boolean;
    index?: number;
  }
}