import { cn } from "@/lib/utils";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { Loader, LucideIcon } from "lucide-react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: LucideIcon;
}

export const LoadingButton = ({
  loading,
  variant,
  size,
  className,
  children,
  icon: Icon,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      loading={loading}
      icon={Icon}
    >
      {loading && <Loader className='animate-spin size-4' />}
      {children}
    </Button>
  );
};
