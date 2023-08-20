import { ITree, IRoot } from "../interface";
import DefaultComponent from "../Components";
import Content from "../../components/Content";
import { MDXContextProvider } from "./context";
import { CSSProperties, useMemo } from "react";

import './index.css';

interface IBaseProps {
  className?: string;
  style?: CSSProperties
}

interface IRender extends IBaseProps {
  node: ITree | IRoot;
}

const Render: React.FC<IRender> = (props) => {
  const { node } = props;

  const Component = useMemo(() => {
    return DefaultComponent[node.type as keyof typeof DefaultComponent];
  }, [node.type])

  if (!node.type) return null;

  if (node.type === "root") {
    return (
      <>
        {node.children.map((child) => (
          <Render node={child} />
        ))}
      </>
    );
  }

  if (!Component) return null


  return (
    <MDXContextProvider
      value={{
        components: {
          Content,
        },
      }}
    >
      <Component node={node}>
        {('children' in node) && node.children.length
          ? node.children.map((child) => <Render node={child} />)
          : null}
      </Component>
    </MDXContextProvider>
  );
};

export default Render;
