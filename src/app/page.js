"use client";
import { useItems } from "@/context/ItemContext";
import JasonOutput from "@/components/home/JasonOutput";
import InitialBtns from "@/components/home/InitialBtns";
import Item from "@/components/lists/Item";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Home() {
  const { items, changeJsonValue } = useItems();
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      changeJsonValue(updatedItems);
    }
  };
  // JSX
  return (
    <main className="max-w-7xl mx-auto py-8">
      <div className="w-full flex flex-col justify-between gap-6 lg:flex-row p-4">
        {/* List section  */}
        <div className="w-full lg:w-2/3  flex gap-4 flex-col">
          <h2 className="text-lg text-center sm:text-left font-semibold">
            Browser Instruction List
          </h2>
          {/* clear, add, undo, and redo button  */}
          <DndContext onDragEnd={handleDragEnd}>
            <ul className="flex flex-col gap-4 w-full">
              <InitialBtns />
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {/* items list  */}
                {items.length > 0 &&
                  items.map((item, index) => (
                    <Item key={item.id} item={item} index={index} />
                  ))}
              </SortableContext>
            </ul>
          </DndContext>
        </div>
        {/* JSON section  */}
        <JasonOutput />
      </div>
    </main>
  );
}
