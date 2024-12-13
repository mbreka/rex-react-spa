import React, { FC, useEffect, useState } from "react";
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from "@mantine/core";
import { CategoryI } from "@/types/interfaces";

const groceries = ["🍎 Apples", "🍌 Bananas", "🥦 Broccoli", "🥕 Carrots", "🍫 Chocolate"];

const CategoriesSelect: FC<{
  categories: CategoryI[];
  onFilterChange: (categories: string[]) => void;
}> = ({ categories, onFilterChange }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) => (current.includes(val) ? current.filter((v) => v !== val) : [...current, val]));

  const handleValueRemove = (val: string) => setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {categories.filter((_category) => item === _category.slug)[0]!.name}
    </Pill>
  ));

  const options = categories
    // .filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item.slug} key={item.slug} active={value.includes(item.slug)}>
        <Group gap="sm">
          {value.includes(item.slug) ? <CheckIcon size={12} /> : null}
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  useEffect(() => {
    onFilterChange(value);
  }, [value]);

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput label="Search by category" description="Product category" onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Select categories"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export { CategoriesSelect };
