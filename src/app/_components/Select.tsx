import * as React from "react";

import {
  Select as SelectControl,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps {
  value: any;
  options: Array<SelectOption>;
  onValueChange: (value: string) => void;
}

export function Select({ value, options, onValueChange }: SelectProps) {
  return (
    <SelectControl
      defaultValue={value}
      onValueChange={(val) => onValueChange(val)}
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.label} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectControl>
  );
}
