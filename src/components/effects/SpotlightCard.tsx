import { HTMLAttributes, forwardRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card whose interior lights up under the cursor.
 * Writes --spot-x / --spot-y CSS variables on mouse move (no re-renders);
 * the .spotlight-card ::before pseudo-element renders the glow.
 * Drop-in container — CardHeader/CardContent from shadcn work inside as-is.
 */
const SpotlightCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, onMouseMove, ...props }, ref) => {
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      onMouseMove?.(event);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "spotlight-card glass-card rounded-lg text-card-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
