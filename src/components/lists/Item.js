import { findInputsValue } from "@/utils/findInputValues";
import BarIcon from "../icons/BarIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloneDelete from "./CloneDelete";
import SelectType from "./SelectType";
import SelectorInput from "./SelectorInput";
import DelayInput from "./DelayInput";
import TextInput from "./TextInput";
const Item = ({ item, index }) => {
  const { id } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const type = Object.keys(item)[1];
  const { selector, text, delay } = findInputsValue(type, item);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-1 border border-gray-400 rounded flex gap-1"
    >
      <button {...listeners}>
        <BarIcon />
      </button>
      <SelectType type={type} index={index} />

      <SelectorInput type={type} index={index} selector={selector} />
      <TextInput type={type} index={index} text={text} />
      <DelayInput type={type} index={index} delay={delay} />

      <CloneDelete index={index} selector={selector} />
    </li>
  );
};

export default Item;
