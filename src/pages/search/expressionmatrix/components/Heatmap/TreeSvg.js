import { useEffect } from 'react';
import TreeNode from './TreeNode';

export const Tree = ({ data, yScale, toggleCollapse, labelFont }) => {
  console.log(`[Tree] data:\n${JSON.stringify(data)}`);
  // order hierachical structure recursively
  // function sortChildrenByLabel(nodes) {
  //   nodes.forEach(node => {
  //       if (node.children && node.children.length > 0) {
  //           // Sort the current node's children by label
  //           node.children.sort((a, b) => a.label.localeCompare(b.label));
  //           // Recursively sort the children of the children
  //           sortChildrenByLabel(node.children);
  //       }
  //   });
  // }

  // const dataOrdered = JSON.parse(JSON.stringify(data));
  // useEffect(() => {
  //   sortChildrenByLabel(dataOrdered);
  //   console.log(`[Tree] data (ordered):\n${JSON.stringify(dataOrdered)}`);
  // }, []);

  return (
    <>
    {data && data.map((node, index) => (
      <TreeNode 
        key={node.id}
        node={node}
        depth={0}
        index={index}
        yScale={yScale}
        toggleCollapse={toggleCollapse}
        labelFont={labelFont}
      />
    ))}
    </>
  );
};

export default Tree;