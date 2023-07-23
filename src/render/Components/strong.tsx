import { IMetaComponentBase } from "../interface";
import { Strong } from "mdast";
import React, { PropsWithChildren } from "react";


const Component: React.FC<PropsWithChildren<IMetaComponentBase<Strong>>> = (props) => {
  const { children } = props

  return (
    <strong>
      {props.children}
    </strong>
  )
}

export default Component;
