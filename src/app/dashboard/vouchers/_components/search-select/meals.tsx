"use client";

import { useMeals } from "@/app/dashboard/meals/_helpers/hooks";
import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";

export function MealsSelect({ name, form }: { name: string; form: any }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const {
    meals: data,
    isMealsLoading: isLoading,
    isMealsRefetching: isRefetching
  } = useMeals(search);

  const values = data?.map((item) => ({
    id: item.id,
    label: item.meal_type,
    value: item.meal_type
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelected(currentValue);
    form.setValue(name, id);
  };

  return (
    <FilterBySearch
      formLabel='Meal'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading || isRefetching}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={values}
    />
  );
}
