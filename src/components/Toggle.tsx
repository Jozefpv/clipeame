import React from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <button
      type="button"
      onClick={onChange}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition \
        ${
          checked ? "justify-end bg-blue-600" : "justify-start bg-gray-600"
        }`}
    >
      <div className="w-4 h-4 bg-white rounded-full shadow" />
    </button>
  </div>
);

export default Toggle;