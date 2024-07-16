"use client";
import { useItems } from "@/context/ItemContext";
import JasonOutput from "@/components/home/JasonOutput";
import InitialBtns from "@/components/home/InitialBtns";
import Item from "@/components/lists/Item";

export default function Home() {
  const { items } = useItems();

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
          <InitialBtns />

          {/* items list  */}
          <ul className="flex flex-col gap-4 w-full">
            {items.length > 0 &&
              items.map((item, index) => <Item item={item} index={index} />)}
          </ul>
        </div>
        {/* JSON section  */}
        <JasonOutput />
      </div>
    </main>
  );
}
