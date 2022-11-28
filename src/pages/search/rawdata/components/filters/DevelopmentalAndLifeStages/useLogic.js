import { useCallback } from 'react';

const flattenNode = (node) => {
  const flattenedNodes = [];
  const queue = [node];

  while (queue.length) {
    const current = queue.shift();

    if (current) {
      flattenedNodes.push(current);
      queue.unshift(...(current.descendants || []));
    }
  }

  return flattenedNodes;
};

const flattenList = (devStages) => {
  const flattenedNodes = devStages.map((node) => flattenNode(node));
  return flattenedNodes.reduce((acc, list) => [...acc, ...list], []);
};

const useLogic = ({ devStages }) => {
  const getOptionsFunction = useCallback(() => {
    const list = flattenList(devStages);
    return list.map((item) => ({
      label: `${item.id} - ${item.name}`,
      value: item.id,
      level: item.level - 1,
    }));
  }, [devStages]);

  return { getOptionsFunction };
};

export default useLogic;
