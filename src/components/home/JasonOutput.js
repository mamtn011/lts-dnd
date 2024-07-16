import { useItems } from "@/context/ItemContext";

const JasonOutput = () => {
  const { items, changeJsonValue } = useItems();
  // handle change json value
  const handleJsonChange = (e) => {
    try {
      const updatedItems = JSON.parse(e.target.value);
      changeJsonValue(updatedItems);
    } catch (error) {
      alert("invalid input");
    }
  };
  return (
    <div className="w-full sm:mx-auto lg:w-1/3 flex gap-4 flex-col">
      <h2 className="text-lg text-center sm:text-left font-semibold">
        JSON Output
      </h2>
      <textarea
        value={JSON.stringify(items, null, 2)}
        onChange={handleJsonChange}
        className="border-2 border-gray-900 h-72 rounded overflow-y-scroll p-2 focus:outline-none"
      ></textarea>
    </div>
  );
};

export default JasonOutput;
