// 'use client'

import React from "react";
import { LinkVerticalLine } from "@visx/shape";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { COLORS } from "@/data/icons";
import { Text } from "@visx/text";

const treeNode = (value) => {
  return {
    name: value,
    children: [],
  };
};

function arrayToBinaryTree(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }

  const root = treeNode(arr[0]);
  const queue = [root];

  let i = 1;
  while (i < arr.length && queue.length != 0) {
    const current = queue.shift();

    for (let j = 0; j < 2; j++) {
      if (i < arr.length && arr[i] !== null) {
        const child = treeNode(arr[i]);
        current.children.push(child);
        queue.push(child);
      }
      i++;
    }
  }

  return root;
}

const defaultMargin = { top: 50, left: 50, right: 50, bottom: 50 };

const BinaryTree = ({
  arr,
  widthAdjust = 1,
  heightAdjust = 1,
  nodeSize = 25,
  fontSize = 24,
}) => {
  if (arr.length < 1) return;

  const data = arrayToBinaryTree(arr);
  const stepPercent = 0.5;

  const depth = Math.log2(arr.length);

  const sizeWidth = Math.pow(2, depth) * 50 * widthAdjust;
  const sizeHeight = depth * 100 * heightAdjust;

  const totalWidth = sizeWidth + defaultMargin.left + defaultMargin.right;
  const totalHeight = sizeHeight + defaultMargin.top + defaultMargin.bottom;

  const LinkComponent = LinkVerticalLine;

  return totalWidth < 10 ? null : (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        <Group top={defaultMargin.top} left={defaultMargin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={0} left={0}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                ))}
                {tree.descendants().map((node, key) => {
                  const top = node.y;
                  const left = node.x;

                  return (
                    <Group top={top} left={left} key={key}>
                      <circle
                        r={nodeSize}
                        fill={
                          Object.values(COLORS)[
                            key % Object.keys(COLORS).length
                          ].bgColor
                        }
                      />
                      <Text
                        fill={
                          Object.values(COLORS)[
                            key % Object.keys(COLORS).length
                          ].textColor
                        }
                        textAnchor="middle"
                        dy=".33em"
                      >
                        {node.data.name}
                      </Text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
};

export default BinaryTree;
