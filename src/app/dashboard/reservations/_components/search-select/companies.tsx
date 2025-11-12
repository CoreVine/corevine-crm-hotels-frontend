"use client";

import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";
import { useCompanies } from "@/app/dashboard/companies/_helpers/hooks";

export function CompaniesSelect({ name, form }: { name: string; form: any }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const {
    companies: data,
    isCompaniesLoading: isLoading,
    isCompaniesRefetching: isRefetching
  } = useCompanies(search);

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
      formLabel='Company'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading || isRefetching}
      onCommandSelect={onCommandSelect}
      error={form?.formState?.errors?.[name]?.message}
      data={values}
    />
  );
}
