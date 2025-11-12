"use client";

import { useState } from "react";

import { FilterBySearch } from "@/components/common/form/searchable-field";

import { useDrivers } from "@/app/dashboard/drivers/_helpers/hooks";

export function DriversSelect({ name, form }: { name: string; form: any }) {
  const [searchDrivers, setSearchDrivers] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [driverId, setDriverId] = useState<number>();

  const { drivers, isDriversLoading, isDriversRefetching } = useDrivers(searchDrivers);

  const driversValues = drivers?.map((driver) => ({
    id: driver.id,
    label: driver.name,
    value: driver.name
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedDriver(currentValue);
    form.setValue(name, id);
    setDriverId(id);
  };

  return (
    <FilterBySearch
      formLabel='Driver'
      value={selectedDriver}
      setValue={setSearchDrivers}
      isLoading={isDriversLoading || isDriversRefetching}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={driversValues}
    />
  );
}
