"use client";

import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, infer as ZodInfer } from "zod";

import { Form } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { LucideIcon, Plus, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { InputField } from "@/components/common/form/input-field";
import { SelectField } from "@/components/common/form/select-field";
import { CheckboxField } from "@/components/common/form/checkbox-field";
import { SelectItem } from "@/components/ui/select";
import { LoadingButton } from "@/components/common/loading-button";

type FieldType = {
  name: string;
  label: string;
  valueAsNumber?: boolean;
  fieldType: string;
  type: "input" | "select" | "checkbox" | "textarea";
  options?: { value: string; label: string }[];
};

type ResourceModalProps<T extends ZodType<any>> = {
  title: string;
  schema: T;
  mutation: any;
  fields: FieldType[];
  isButtonLoading?: boolean;
  buttonLabel?: string;
  buttonVariant?: any;
  icon?: LucideIcon;
};

export const ResourceModal = <T extends ZodType<any>>({
  title,
  schema,
  mutation,
  fields,
  icon: Icon = PlusIcon,
  isButtonLoading,
  buttonVariant = "outline",
  buttonLabel = "Create"
}: ResourceModalProps<T>) => {
  const form = useForm<ZodInfer<T>>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = (data: ZodInfer<T>) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={Icon} variant={buttonVariant}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {fields.map(({ name, fieldType, valueAsNumber, label, type, options }) => {
              switch (type) {
                case "select":
                  return (
                    <SelectField key={name} control={form.control} name={name} label={label}>
                      {options?.map(({ value, label }, idx) => (
                        <SelectItem key={`item-${value}-${idx}`} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectField>
                  );
                case "checkbox":
                  return (
                    <CheckboxField key={name} control={form.control} name={name} label={label} />
                  );
                case "textarea":
                  return (
                    <InputField
                      key={name}
                      control={form.control}
                      name={name}
                      label={label}
                      isTextarea
                    />
                  );
                default:
                  return (
                    <InputField
                      type={fieldType}
                      valueAsNumber={valueAsNumber}
                      key={name}
                      control={form.control}
                      name={name}
                      label={label}
                    />
                  );
              }
            })}
            <LoadingButton loading={isButtonLoading} icon={Plus}>
              {buttonLabel}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
