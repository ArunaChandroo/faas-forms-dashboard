import type { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

type ChartFrameProps = {
  heightPx: number;
  initialWidthPx?: number;
  children: ReactNode;
};

/** Pixel-height wrapper so Recharts 3 measures a real box inside Modus cards. */
export function ChartFrame({
  heightPx,
  initialWidthPx = 480,
  children,
}: ChartFrameProps) {
  return (
    <div className="min-h-0 w-full min-w-0" style={{ height: heightPx }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={{ width: initialWidthPx, height: heightPx }}
        minWidth={0}
        minHeight={heightPx}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}
