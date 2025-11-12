import { ArrowRight, Loader2 } from "lucide-react";
import { SearchBox } from "./search-box";
import { ActiveCheckIcon } from "../active-check-icon";
import { Label } from "@/components/ui/label";
import { CommandItem } from "@/components/ui/command";

type Props = {
  formLabel?: string;
  value: string;
  isLoading: boolean;
  data?: { value: string; label: string; id: number }[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  onCommandSelect: (value: string, id: number) => void;
};

export const FilterBySearch = ({
  formLabel,
  value,
  setValue,
  isLoading,
  data,
  onCommandSelect,
  error
}: Props) => {
  return (
    <section>
      <Label className='mb-2'>{formLabel}</Label>
      <SearchBox value={value} buttonClassName='w-full' setValue={setValue}>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          data && (
            <>
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={String(item.value)}
                  onSelect={(currentValue) => onCommandSelect(currentValue, item.id)}
                >
                  <ActiveCheckIcon active={value === item.value} />
                  {item.label} - ID <ArrowRight className='size-4' /> <b>{item.id}</b>
                </CommandItem>
              ))}
            </>
          )
        )}
      </SearchBox>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </section>
  );
};
