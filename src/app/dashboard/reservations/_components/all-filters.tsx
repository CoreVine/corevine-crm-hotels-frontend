"use client";

import { useState } from "react";
import { SearchFilter } from "../../_components/search";
import { HotelReservationCompanyFilter } from "./company-filter";
import { HotelReservationDateFilters } from "./date-filters";
import { HotelReservationHotelFilter } from "./hotel-filter";
import { HotelReservationOptionDateFilters } from "./option-date-filters";
import { Button } from "@/components/ui/button";
import { build } from "search-params";
import { useRouter } from "next/navigation";

import moment from "moment";
import { HotelReservationSearchFilter } from "./search-filter";

export const HotelReservationsAllFilters = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [optionDateFrom, setOptionDateFrom] = useState<Date | undefined>();
  const [optionDateTo, setOptionDateTo] = useState<Date>();

  const [company, setCompany] = useState<number | undefined>();
  const [hotel, setHotel] = useState<number | undefined>();
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const filterAll = () => {
    const params = build({
      check_in: checkInDate ? moment(checkInDate).format("YYYY-MM-DD") : undefined,
      check_out: checkOutDate ? moment(checkOutDate).format("YYYY-MM-DD") : undefined,
      option_date_from: optionDateFrom ? moment(optionDateFrom).format("YYYY-MM-DD") : undefined,
      option_date_to: optionDateTo ? moment(optionDateTo).format("YYYY-MM-DD") : undefined,
      company_id: company ?? undefined,
      search,
      hotel_id: hotel ?? undefined
    });
    console.log("params", params);
    router.push(`?${params}`);
  };

  const clearAll = () => {
    const params = build({});
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setOptionDateFrom(undefined);
    setOptionDateTo(undefined);
    setCompany(undefined);
    setHotel(undefined);
    router.push(`?${params}`);
  };

  return (
    <div className='grid xl:gri-cols-2 grid-cols-2 gap-4 p-4 rounded-md bg-white border shadow-md'>
      <div className='col-span-2 space-y-2'>
        <label className='text-sm font-medium'>Search</label>
        <HotelReservationSearchFilter search={search} setSearch={setSearch} />
      </div>
      <HotelReservationHotelFilter hotel={hotel} setHotel={setHotel} />
      <HotelReservationCompanyFilter company={company} setCompany={setCompany} />
      <HotelReservationDateFilters
        checkIn={checkInDate}
        setCheckIn={setCheckInDate}
        checkOut={checkOutDate}
        setCheckOut={setCheckOutDate}
      />
      <HotelReservationOptionDateFilters
        optionDateFrom={optionDateFrom}
        setOptionDateFrom={setOptionDateFrom}
        optionDateTo={optionDateTo}
        setOptionDateTo={setOptionDateTo}
      />
      <div className='col-span-2 flex gap-2'>
        <Button onClick={filterAll}>Filter</Button>
        <Button onClick={clearAll} variant='outline'>
          Clear
        </Button>
      </div>
    </div>
  );
};
