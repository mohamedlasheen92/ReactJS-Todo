// import { cn } from "../../lib/utils";
// import { VariantProps, cva } from "class-variance-authority";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode } from "react";

const buttonVariants = cva("rounded-md font-medium text-white duration-300 dark:text-black", {
  variants: {
    variant: {
      // ** FILLED
      default:
        "bg-slate-900 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700",
      danger:
        "bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-red-700",
      cancel:
        "bg-gray-300 text-gray-700 dark:bg-[#f5f5fa] dark:text-dark hover:bg-gray-400 dark:hover:bg-gray-200",

      // ** OUTLINE
      outline:
        "border border-indigo-400 hover:text-white bg-transparent text-black hover:border-transparent hover:bg-indigo-600 dark:text-gray-700 dark:hover:text-white",
    },
    size: {
      default: "p-3",
      sm: "text-sm px-4 py-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
}
);

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const Button = ({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button type="submit"
      className={className}>
      {children}
    </button>
    // className={cn(buttonVariants({ variant, size, fullWidth, className }))} {...props}>
  );
};

export default Button;