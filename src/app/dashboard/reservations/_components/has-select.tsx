import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Props = {
  label: string;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export function HasSelect({ label, onChange }: Props) {
  return (
    <Select onValueChange={(val) => onChange(val === "yes" ? true : false)}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='yes'>Yes</SelectItem>
        <SelectItem value='no'>No</SelectItem>
      </SelectContent>
    </Select>
  );
}
