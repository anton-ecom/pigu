import type React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@core/components/ui/select";

interface GenericSelectProps<T> {
  list: T[]; // List of items to display
  selectedValue: string | number | null; // Currently selected value
  onValueChange: (value: string | number | null) => void; // Callback to update selected value
  renderItem: (item: T) => React.ReactNode; // Function to render each item
  getKey: (item: T) => string | number; // Function to extract a unique key from each item
  placeholder?: string; // Placeholder text
}

export function Select<T>({
  list,
  selectedValue,
  onValueChange,
  renderItem,
  getKey,
  placeholder = "Select an option",
}: GenericSelectProps<T>) {
  console.log(list);

  return (
    <div className="flex w-max space-x-2 px-2 border justify-start text-sm rounded md:w-max dark:border-neutral-700 text-secondary">
      <ShadcnSelect
        value={selectedValue?.toString() || ""}
        onValueChange={(value) =>
          onValueChange(value ? Number.parseInt(value) || value : null)
        }
      >
        <SelectTrigger
          className={`focus:border-none text-center text-secondary dark:text-neutral-300 text-neutral-600 flex border px-0 w-[100px] outline-0 h-10 border-none ring-0 dark:focus:ring-0 ${
            selectedValue ? "dark:text-white text-black" : ""
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list.map((item) => (
              <SelectItem key={getKey(item)} value={getKey(item).toString()}>
                {renderItem(item)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>

      {selectedValue !== null && (
        <button
          type="button"
          onClick={() => onValueChange(null)}
          className="flex items-center justify-center"
          aria-label="Clear selection"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
