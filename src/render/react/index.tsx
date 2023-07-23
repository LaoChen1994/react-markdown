import { ITree, IRoot } from "../interface";
import * as DefaultComponent from "../Components";
import Content from "../../components/Content";
import { capitalizeFirstLetter } from "./utils";
import { MDXContextProvider } from "./context";

interface IRender {
  node: ITree;
}

const Render: React.FC<IRender> = (props) => {
  const { node } = props;

  const Component =
    DefaultComponent[
      capitalizeFirstLetter(node.type) as keyof typeof DefaultComponent
    ];


  if (!node.type) return null;

  if (node.type === "root") {
    return (
      <div>
        {node.children.map((child) => (
          <Render node={child} />
        ))}
      </div>
    );
  }

  return (
    <MDXContextProvider
      value={{
        components: {
          Content,
        },
      }}
    >
      <Component node={node}>
        {node.children && node.children.length
          ? node.children.map((child) => <Render node={child} />)
          : null}
      </Component>
    </MDXContextProvider>
  );
};

export default Render;
