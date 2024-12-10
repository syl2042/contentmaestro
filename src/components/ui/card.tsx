import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', icon: Icon, title, description, children, ...props }, ref) => {
    const variants = {
      default: "bg-[rgb(var(--color-surface))]",
      bordered: [
        "bg-gradient-to-br from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface)/0.9)]",
        "border border-[rgb(var(--color-border))]",
        "shadow-sm hover:shadow-md transition-all duration-300"
      ],
      elevated: [
        "shadow-md hover:shadow-lg transition-all duration-300",
        "bg-gradient-to-br from-[rgb(var(--color-surface))] to-[rgb(var(--color-surface)/0.95)]"
      ],
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6",
          "hover:translate-y-[-2px] transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        {(Icon || title || description) && (
          <div className="flex items-start gap-4 mb-6">
            {Icon && (
              <div className="flex-shrink-0">
                <div className="p-2 rounded-lg bg-[rgb(var(--color-primary))/10]">
                  <Icon className="h-5 w-5 text-[rgb(var(--color-primary))]" />
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1">
              {title && (
                <h3 className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between mb-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold text-[rgb(var(--color-text-primary))]", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[rgb(var(--color-text-secondary))]", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end mt-6 pt-4",
        "border-t border-[rgb(var(--color-border))]",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};