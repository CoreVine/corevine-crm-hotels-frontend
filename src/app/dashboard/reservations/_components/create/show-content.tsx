import { Switch } from "@/components/ui/switch";
import React from "react";

type Props = {
  label: string;
  include: boolean;
  setInclude: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShowContent({ label, include, setInclude }: Props) {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airport-toggle' checked={include} onCheckedChange={setInclude} />
      <label htmlFor='airport-toggle' className='text-lg font-medium'>
        {label}
      </label>
    </div>
  );
}
