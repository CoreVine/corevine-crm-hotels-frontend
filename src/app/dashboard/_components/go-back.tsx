"use client";

import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: ClassValue;
};

export const GoBack = ({ className }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button onClick={handleClick} type='button' variant='outline'>
      <ArrowLeft className='size-4' />
      Go Back
    </Button>
  );
};
