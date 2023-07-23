import { IMetaComponentBase } from "../interface"
import { Paragraph as ParagraphType } from 'mdast'

import { PropsWithChildren } from "react"

const Paragraph: React.FC<PropsWithChildren<IMetaComponentBase<ParagraphType>>> = (props) => {
  const { children } = props;

  return (
    <p>
      {children}
    </p>
  )
}

export default Paragraph