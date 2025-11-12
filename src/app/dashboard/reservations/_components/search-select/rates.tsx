"use client";

import { useRates } from "@/app/dashboard/rates/_helpers/hooks";
import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";

export function RatesSelect({ name, form }: { name: string; form: any }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const {
    rates: data,
    isRatesLoading: isLoading,
    isRatesRefetching: isRefetching
  } = useRates(search);

  const values = data?.map((item) => ({
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
      formLabel='Rate'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading || isRefetching}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={values}
    />
  );
}
