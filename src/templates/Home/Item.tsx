import React from "react";
import { Box } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { Todo } from "../../types";

interface ItemProps {
  parentId: string;
  itemData: { pos: number; text: string };
  color: string;
}

const Item: React.FC<ItemProps> = ({ parentId, itemData, color }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    {
      type: "TodoItem",
      item: {
        columnFrom: parentId,
        todo: itemData,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    [parentId, itemData]
  );
  return (
    <Box
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      borderTop={`4px solid ${color}`}
      borderTopLeftRadius={2}
      borderTopRightRadius={2}
      color={"gray.600"}
      bg={"gray.200"}
      mt={2}
      p={2}
    >
      {itemData.text}
    </Box>
  );
};

export default Item;