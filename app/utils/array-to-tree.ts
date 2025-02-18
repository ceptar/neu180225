export type HasParent = { id: string; parentId: string | null };
export type TreeNode<T extends HasParent> = T & {
  children: Array<TreeNode<T>>;
};
export type RootNode<T extends HasParent> = {
  id?: string;
  children: Array<TreeNode<T>>;
};

/**
 * Builds a tree from an array of nodes which have a parent.
 * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
 */
export function arrayToTree<T extends HasParent>(nodes: T[]): RootNode<T> {
    const topLevelNodes: Array<TreeNode<T>> = [];
    const mappedArr: { [id: string]: TreeNode<T> } = {};
  
    // First map the nodes of the array to an object -> create a hash table.
    for (const node of nodes) {
      mappedArr[node.id] = { ...node, children: [] };
    }
  
    for (const node of nodes) {
      if (node.parent && node.parent.id) {
        const parentNode = mappedArr[node.parent.id];
        if (parentNode) {
          parentNode.children.push(mappedArr[node.id]);
        } else {
          topLevelNodes.push(mappedArr[node.id]);
        }
      } else {
        topLevelNodes.push(mappedArr[node.id]);
      }
    }
  
    return { children: topLevelNodes };
  }