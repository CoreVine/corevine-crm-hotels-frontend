"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCompanies } from "../../companies/_helpers/hooks";

import { SearchableData } from "@/components/common/form/searchable-data";
import { useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  company: number | undefined;
  setCompany: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const HotelReservationCompanyFilter = ({ company, setCompany }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { modifiedCompanies, isCompaniesLoading, isCompaniesRefetching } =
    useCompanies(debouncedSearch);

  const exe = (value: number) => {
    setCompany(value);
  };

  return (
    <SearchableData
      data={modifiedCompanies}
      search={search}
      setSearch={setSearch}
      loading={isCompaniesLoading || isCompaniesRefetching}
      label={"Select Company"}
      executeFunctionWithId={exe}
    />
  );
};
