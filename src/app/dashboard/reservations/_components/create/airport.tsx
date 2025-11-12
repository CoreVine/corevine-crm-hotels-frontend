import { InputField } from "@/components/common/form/input-field";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { PlaneIcon } from "lucide-react";

type Props = {
  form: any;
};

export const AirportForm = ({ form }: Props) => {
  return (
    <div className='space-y-4 border p-4 rounded-md shadow'>
      <div className='flex gap-2 items-center mb-4'>
        <div className='p-2 rounded-md bg-amber-700 text-white'>
          <PlaneIcon size={16} />
        </div>
        <h3 className='text-lg font-medium flex gap-2'>Airplane Details</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <InputField
          name='airport.airport_name'
          label='Airport Name'
          placeholder='JFK International Airport'
          control={form.control}
        />

        <InputField
          name='airport.airline'
          label='Airline'
          placeholder='Delta Airlines'
          control={form.control}
        />

        <InputField
          name='airport.runner'
          label='Runner'
          placeholder='John Doe'
          control={form.control}
        />

        <InputField
          name='airport.flight_number'
          label='Flight Number'
          placeholder='DL123'
          control={form.control}
        />

        <InputField
          name='airport.coming_from'
          label='Coming From'
          placeholder='New York'
          control={form.control}
        />

        <InputField
          name='airport.passenger_count'
          label='Passenger Count'
          placeholder='1'
          type='number'
          valueAsNumber
          control={form.control}
        />

        <SelectField name='airport.status' control={form.control} label='Status'>
          <SelectItem value='pending'>Pending</SelectItem>
          <SelectItem value='done'>Done</SelectItem>
          <SelectItem value='cancelled'>Cancelled</SelectItem>
        </SelectField>

        <InputField
          name='airport.persons_count'
          label='Persons Count'
          valueAsNumber
          type='number'
          placeholder='1'
          control={form.control}
        />

        <InputField
          name='airport.statment'
          valueAsNumber
          label='Statement'
          type='number'
          placeholder='0'
          control={form.control}
        />

        <InputField name='airport.price' label='Price' placeholder='0' control={form.control} />

        <InputField
          name='airport.arrival_date'
          label='Arrival Date'
          type='date'
          control={form.control}
        />

        <InputField
          name='airport.arrival_time'
          label='Arrival Time'
          type='time'
          control={form.control}
        />
      </div>
    </div>
  );
};
