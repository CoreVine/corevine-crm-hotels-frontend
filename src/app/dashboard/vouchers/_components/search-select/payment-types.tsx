"use client";

import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";
import { usePaymentTypes } from "@/app/dashboard/payment-types/_helpers/hooks";

export function PaymentTypesSelect({ name, form }: { name: string; form: any }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const {
    paymentTypes: data,
    isPaymentTypesLoading: isLoading,
    isPaymentTypesRefetching: isRefetching
  } = usePaymentTypes(search);

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
      formLabel='Payment Types'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading || isRefetching}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={values}
    />
  );
}
