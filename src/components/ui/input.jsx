import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex w-2xl rounded-3xl bg-white px-3 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const SearchInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute text-red-500 left-4 w-5 h-5" />
      <input
        type={type}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex lg:w-2xl md:w-xs rounded-3xl bg-white pl-11 pr-4 py-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
