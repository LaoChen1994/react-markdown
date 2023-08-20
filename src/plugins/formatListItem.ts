import { ListItem, List } from 'mdast';
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const plugin: Plugin = () => (tree) => {
  if (!tree) return;

  visit(tree, "listItem", (node: ListItem, index, parent: List) => {
    if (parent.type !== "list") {
      parent.children.splice(index, 1)
      return;
    }

    if (parent.ordered) {
      parent.children[index].order = true;
      parent.children[index].index = index + 1

      return
    }
  })
}

export default plugin