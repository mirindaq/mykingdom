import React from 'react';

export default function AddressSelect({ options = [], onChange, label, value }) {
  return (
    <select
      className="w-full p-2 border rounded text-black"
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value || ""} // Thêm value để đồng bộ với formData
    >
      <option value="" disabled>
        Chọn {label}
      </option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}