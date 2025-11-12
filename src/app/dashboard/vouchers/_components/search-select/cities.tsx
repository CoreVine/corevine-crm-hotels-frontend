"use client";

import React, { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";
import { useCities } from "@/app/dashboard/cities/_helpers/hooks";

type Props = {
  name: string;
  form: any;
  setSelectedCityId: React.Dispatch<React.SetStateAction<number>>;
};

export function CitiesSelect({ name, form, setSelectedCityId }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const {
    cities: data,
    isCitiesLoading: isLoading,
    isCitiesRefetching: isRefetching
  } = useCities(search);

  const values = data?.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.name
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelected(currentValue);
    form.setValue(name, id);
    setSelectedCityId(id);
  };

  return (
    <FilterBySearch
      formLabel='City'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading || isRefetching}
      onCommandSelect={onCommandSelect}
      error={form?.formState?.errors?.[name]?.message}
      data={values}
    />
  );
}
