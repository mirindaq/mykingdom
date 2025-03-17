import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

export default function FilterCheckbox({
  id,
  label,
  handleCheckboxChange,
  isChecked,
}) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const onCheckedChange = (checked) => {
    setChecked(checked);
    handleCheckboxChange(id, checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
      <label
        htmlFor={id}
        className="cursor-pointer py-1 text-base leading-none select-none"
      >
        {label}
      </label>
    </div>
  );
}
