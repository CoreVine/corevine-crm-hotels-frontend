"use client";

import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";
import { Hotel } from "@/types/models";

type Props = {
  name: string;
  form: any;
  hotels?: Hotel[];
  isLoading?: boolean;
};

export function HotelsSelect({ isLoading, name, form, hotels }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const values = hotels?.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.name
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelected(currentValue);
    form.setValue(name, id);
  };

  return (
    <FilterBySearch
      formLabel='Hotel'
      value={selected}
      setValue={setSearch}
      isLoading={!!isLoading}
      onCommandSelect={onCommandSelect}
      error={form?.formState?.errors?.[name]?.message}
      data={values}
    />
  );
}
