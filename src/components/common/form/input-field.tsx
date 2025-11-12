import { Control } from "react-hook-form";
import { Input } from "../../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  formFieldDisabled?: boolean;
  formFieldDefaultValue?: string;
  isTextarea?: boolean;
  control: Control<any, any>;
  type?: string;
  disabled?: boolean;
  value?: string;
  register?: any;
  placeholder?: string;
  defaultValue?: string | number;
  valueAsNumber?: boolean;
  className?: ClassValue;
  step?: any;
};

export const InputField = ({
  name,
  disabled,
  label,
  isTextarea = false,
  formFieldDisabled,
  formFieldDefaultValue,
  placeholder,
  type,
  control,
  register,
  valueAsNumber,
  defaultValue,
  className,
  step
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={formFieldDefaultValue ?? ""}
      disabled={formFieldDisabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                disabled={disabled}
                className='resize-none h-32'
                placeholder={placeholder}
                {...field}
              >
                {defaultValue}
              </Textarea>
            ) : (
              <Input
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={cn(className)}
                step={step}
                {...field}
                {...register}
                onChange={
                  valueAsNumber
                    ? (e) =>
                        field.onChange(
                          isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
                        )
                    : field.onChange
                }
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
