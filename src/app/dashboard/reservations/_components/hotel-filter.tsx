"use client";

import { SearchableData } from "@/components/common/form/searchable-data";

import { useState } from "react";
import { useHotels } from "../../hotels/_helpers/hooks";
import { useDebounce } from "use-debounce";

type Props = {
  hotel: number | undefined;
  setHotel: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const HotelReservationHotelFilter = ({ hotel, setHotel }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { modifiedHotels, isHotelsLoading, isHotelsRefetching } = useHotels(debouncedSearch);

  const exe = (value: number | undefined) => {
    setHotel(value);
  };

  return (
    <SearchableData
      data={modifiedHotels}
      search={search}
      defaultSelected={search}
      loading={isHotelsLoading || isHotelsRefetching}
      defaultSelectedId={search ? hotel : undefined}
      setSearch={setSearch}
      label={"Select Hotel"}
      executeFunctionWithId={exe}
    />
  );
};
