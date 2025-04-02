
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartConfig } from "./types"

interface ChartTooltipProps extends React.ComponentProps<typeof RechartsPrimitive.Tooltip> {
  className?: string
}

const ChartTooltip = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Tooltip>,
  ChartTooltipProps
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Tooltip
    cursor={{ opacity: 0.6 }}
    wrapperStyle={{ outline: "none" }}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps {
  className?: string
  active?: boolean
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string | number;
    color?: string; // Added the color property that might be present
  }>
  label?: string
  formatter?: (value: number, name: string) => [string, string]
  labelFormatter?: (label: string) => string
  itemSorter?: (a: any, b: any) => number
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      formatter,
      labelFormatter,
      itemSorter,
      label,
      ...props
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    let payloadItems = payload
    if (itemSorter) {
      payloadItems = [...payload].sort(itemSorter)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background px-3 py-2 text-sm shadow-md",
          className
        )}
        {...props}
      >
        {label && (
          <div className="border-b pb-1 mb-1 font-medium">
            {labelFormatter ? labelFormatter(label) : label}
          </div>
        )}
        <div className="grid gap-1">
          {payloadItems.map((item, index) => {
            return (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: item.color || '#888888', // Provide a fallback color if item.color is undefined
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {formatter ? formatter(item.value, item.name)[1] : item.name}
                    :
                  </span>
                </div>
                <span className="font-medium tabular-nums">
                  {formatter
                    ? formatter(item.value, item.name)[0]
                    : item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartTooltip, ChartTooltipContent }
