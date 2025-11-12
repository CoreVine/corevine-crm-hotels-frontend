"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckIcon, Loader2, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SearchableItem = {
  id: number;
  label: string;
};

type Props = {
  data: SearchableItem[] | undefined;
  search: string;
  setSearch: (value: string) => void;
  defaultSelected?: string;
  label: string;
  defaultSelectedId?: number;
  loading?: boolean;
  form?: any;
  error?: string;
  formItem?: string;
  executeFunctionWithId?: (value: number | undefined) => void;
};

export const SearchableData = ({
  data,
  label,

  search,
  setSearch,

  defaultSelected,
  defaultSelectedId,
  error,
  loading,
  form,
  formItem,
  executeFunctionWithId
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState(defaultSelected);
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  const [searchedValue, setSearchedValue] = useState(search);

  const handleChangeSeleceted = (item: SearchableItem) => {
    if (item) {
      setSelectedValue(item.label);
      setSearchedValue(item.label);
      setSelectedId(item.id);
      if (form) form.setValue(formItem, item.id);
      if (executeFunctionWithId) executeFunctionWithId(item.id);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!searchedValue) {
      setSelectedValue("");
      setSelectedId(undefined);
      if (executeFunctionWithId) executeFunctionWithId(undefined);
    }
  }, [searchedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <div>
        <Label className='mb-2'>{label}</Label>
        <div className='relative'>
          <SearchIcon
            size={18}
            className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400'
          />
          <Input
            value={searchedValue}
            placeholder='Search...'
            className='pl-10'
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchedValue(e.target.value);
            }}
          />
        </div>
        {error && <p className='text-red-500 my-1'>{error}</p>}
      </div>

      {isOpen && (
        <div className='absolute w-full mt-1 border rounded-md shadow bg-white p-2 max-h-96 overflow-y-auto z-50'>
          <div>
            {loading ? (
              <Loader2 size={24} className='text-primary animate-spin' />
            ) : (
              <div>
                {data && data.length > 0 ? (
                  <div className='space-y-1'>
                    {data?.map((item) => (
                      <div
                        key={`item-${item.id}-${item.label}`}
                        className={cn(
                          "flex gap-2 items-center p-2 px-4 rounded-md hover:bg-gray-100 select-none cursor-pointer",
                          selectedId == item.id ? "bg-gray-100 text-black" : "text-gray-700"
                        )}
                        onClick={() => handleChangeSeleceted(item)}
                      >
                        {selectedId == item.id && <CheckIcon size={16} />}
                        {item.label} - {item.id}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No data found</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
