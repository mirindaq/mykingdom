import { Checkbox } from "../ui/checkbox";

export default function FilterCheckbox({ id, label }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label htmlFor={id} className="text-base leading-none py-1">
        {label}
      </label>
    </div>
  );
}
