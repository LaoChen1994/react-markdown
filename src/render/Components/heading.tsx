import { Heading as HeadingType } from "mdast";
import { PropsWithChildren } from "react";
import { IMetaComponentBase } from "../interface";

export const Heading: React.FC<
  PropsWithChildren<IMetaComponentBase<HeadingType>>
> = (props) => {
  const { children, node } = props;

  const Component = `h${node.depth}` as keyof JSX.IntrinsicElements;

  return <Component>{children}</Component>;
};

export default Heading;
