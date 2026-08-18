import { useMemo, useState } from "react";
import type { ISelectOption } from "@trimble-oss/moduswebcomponents/types/components/modus-wc-select/modus-wc-select";
import type { ITableColumn } from "@trimble-oss/moduswebcomponents/types/components/modus-wc-table/modus-wc-table";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ModusWcCard,
  ModusWcIcon,
  ModusWcSelect,
  ModusWcTable,
  ModusWcTypography,
} from "../../Modus components";
import { ChartFrame } from "../components/charts/ChartFrame";
import {
  type DateRangeId,
  getDashboardData,
} from "../data/dashboardMocks";
import { readInputString } from "../utils/modusFormEvents";

const DATE_RANGE_OPTIONS: ISelectOption[] = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

const CHART_COLORS = [
  "var(--modus-wc-color-primary)",
  "var(--modus-wc-color-warning)",
  "var(--modus-wc-color-success)",
  "var(--modus-wc-color-error)",
  "var(--modus-wc-color-secondary)",
];

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "var(--modus-wc-color-base-100)",
    border: "1px solid var(--modus-wc-color-base-200)",
    borderRadius: "var(--radius-button, 8px)",
    color: "var(--modus-wc-color-base-content)",
    padding: "8px 12px",
  },
  itemStyle: { color: "var(--modus-wc-color-base-content)" },
  labelStyle: { color: "var(--modus-wc-color-base-content)" },
  cursor: { fill: "var(--modus-wc-color-base-200)" },
};

const AXIS_TICK = { fontSize: 11, fill: "var(--modus-wc-color-base-content-low-contrast)" };

function isDateRangeId(value: string): value is DateRangeId {
  return value === "7" || value === "30" || value === "90";
}

const SUBMISSION_COLUMNS: ITableColumn[] = [
  { id: "template", header: "Template", accessor: "template", sortable: true },
  { id: "formType", header: "Form type", accessor: "formType", width: "140px", sortable: true },
  { id: "project", header: "Project", accessor: "project", sortable: true },
  { id: "status", header: "Status", accessor: "status", width: "140px", sortable: true },
  { id: "submittedAt", header: "Submitted", accessor: "submittedAt", width: "180px", sortable: true },
];

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRangeId>("30");
  const data = useMemo(() => getDashboardData(dateRange), [dateRange]);

  return (
    <div className="dashboard-page flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">
      <div className="forms-page-header flex shrink-0 items-end justify-between gap-3 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <ModusWcIcon decorative name="dashboard" size="md" variant="outlined" />
          <ModusWcTypography
            customClass="forms-page-secondary-title"
            hierarchy="h1"
            label="Dashboard"
            weight="semibold"
          />
        </div>
        <div className="dashboard-date-select shrink-0">
          <ModusWcSelect
            bordered
            label="Date range"
            options={DATE_RANGE_OPTIONS}
            size="sm"
            value={dateRange}
            onInputChange={(e: CustomEvent) => {
              const next = readInputString(e);
              if (isDateRangeId(next)) setDateRange(next);
            }}
          />
        </div>
      </div>

      <div className="dashboard-stack pb-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi) => (
            <div key={kpi.id} className="min-h-0 min-w-0">
              <ModusWcCard
                bordered={false}
                className="flex h-full min-h-0 w-full flex-col"
                customClass="box-border flex h-full min-h-0 w-full flex-col"
                padding="compact"
              >
                <div slot="title" className="flex w-full min-w-0 items-center justify-start gap-2">
                  <ModusWcIcon decorative name={kpi.icon} size="sm" variant="outlined" />
                  <ModusWcTypography
                    hierarchy="h2"
                    label={kpi.label}
                    size="sm"
                    weight="semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <ModusWcTypography
                    hierarchy="p"
                    label={kpi.value}
                    size="xl"
                    weight="semibold"
                  />
                  <ModusWcTypography
                    customClass={
                      kpi.trend === "up"
                        ? "dashboard-kpi-delta--up"
                        : "dashboard-kpi-delta--down"
                    }
                    hierarchy="p"
                    label={kpi.delta}
                    size="sm"
                  />
                </div>
              </ModusWcCard>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <ModusWcCard bordered={false} padding="compact">
              <div slot="title" className="mb-4 flex w-full min-w-0 items-center justify-start gap-2">
                <ModusWcIcon decorative name="line_graph" size="sm" variant="outlined" />
                <ModusWcTypography
                  hierarchy="h2"
                  label="Submissions over time"
                  size="md"
                  weight="semibold"
                />
              </div>
              <ChartFrame heightPx={256}>
                <AreaChart data={data.trend}>
                  <CartesianGrid stroke="var(--modus-wc-color-base-200)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    stroke="var(--modus-wc-color-base-content-low-contrast)"
                    tick={AXIS_TICK}
                  />
                  <YAxis
                    stroke="var(--modus-wc-color-base-content-low-contrast)"
                    tick={AXIS_TICK}
                  />
                  <Tooltip {...CHART_TOOLTIP_STYLE} />
                  <Area
                    dataKey="submissions"
                    fill="var(--modus-wc-color-primary)"
                    fillOpacity={0.16}
                    name="Submissions"
                    stroke="var(--modus-wc-color-primary)"
                    strokeWidth={2}
                    type="monotone"
                    dot={{ fill: "var(--modus-wc-color-base-100)" }}
                  />
                </AreaChart>
              </ChartFrame>
            </ModusWcCard>
          </div>
          <div className="min-w-0 xl:col-span-2">
            <ModusWcCard bordered={false} padding="compact">
              <div slot="title" className="mb-4 flex w-full min-w-0 items-center justify-start gap-2">
                <ModusWcIcon decorative name="bar_graph" size="sm" variant="outlined" />
                <ModusWcTypography
                  hierarchy="h2"
                  label="Form type mix"
                  size="md"
                  weight="semibold"
                />
              </div>
              <ChartFrame heightPx={256} initialWidthPx={320}>
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={data.mix}
                    dataKey="value"
                    innerRadius={52}
                    nameKey="name"
                    outerRadius={88}
                    stroke="var(--modus-wc-color-base-100)"
                  >
                    {data.mix.map((slice, index) => (
                      <Cell
                        key={slice.name}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip {...CHART_TOOLTIP_STYLE} />
                </PieChart>
              </ChartFrame>
            </ModusWcCard>
          </div>
        </div>

        <ModusWcCard bordered={false} padding="compact">
          <div slot="title" className="mb-4 flex w-full min-w-0 items-center justify-start gap-2">
            <ModusWcIcon decorative name="view_list" size="sm" variant="outlined" />
            <ModusWcTypography
              hierarchy="h2"
              label="Recent submissions"
              size="md"
              weight="semibold"
            />
          </div>
          <div className="min-w-0 overflow-x-auto">
            <ModusWcTable
              caption="Recent form submissions"
              columns={SUBMISSION_COLUMNS}
              customClass="forms-page-table-host"
              data={data.submissions as unknown as Record<string, unknown>[]}
              density="compact"
              hover
              paginated={false}
            />
          </div>
        </ModusWcCard>
      </div>
    </div>
  );
}
