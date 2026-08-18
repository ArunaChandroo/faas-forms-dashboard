export type DateRangeId = "7" | "30" | "90";

export type FormType = "Safety" | "Operations" | "Quality" | "General";

export type SubmissionStatus = "Completed" | "In review" | "Returned";

export type KpiCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
  /** `up` = favorable change (green); `down` = unfavorable (red). */
  trend: "up" | "down";
  icon: string;
};

export type TrendPoint = {
  label: string;
  submissions: number;
};

export type FormTypeSlice = {
  name: FormType;
  value: number;
};

export type RecentSubmission = {
  id: string;
  template: string;
  formType: FormType;
  project: string;
  status: SubmissionStatus;
  submittedAt: string;
};

const PROJECTS = [
  "Riverside Office Complex",
  "Highway Interchange 5",
  "Metro Line Extension",
  "Port Logistics Hub",
  "North District Site",
] as const;

const TEMPLATES: { name: string; formType: FormType }[] = [
  { name: "Daily Safety Inspection", formType: "Safety" },
  { name: "Equipment Maintenance Log", formType: "Operations" },
  { name: "Quality Control Checklist", formType: "Quality" },
  { name: "Incident Report Form", formType: "Safety" },
  { name: "Site Inspection Checklist", formType: "Safety" },
];

const RANGE_KPIS: Record<DateRangeId, KpiCard[]> = {
  "7": [
    { id: "submissions", label: "Submissions", value: "184", delta: "+12% vs prior 7 days", trend: "up", icon: "file" },
    { id: "templates", label: "Active templates", value: "28", delta: "+2 new this week", trend: "up", icon: "folder_closed" },
    { id: "completion", label: "Completion rate", value: "91%", delta: "+3.1 pts", trend: "up", icon: "check_circle" },
    { id: "duration", label: "Avg. completion time", value: "11 min", delta: "−1.4 min", trend: "up", icon: "clock" },
  ],
  "30": [
    { id: "submissions", label: "Submissions", value: "742", delta: "+8% vs prior 30 days", trend: "up", icon: "file" },
    { id: "templates", label: "Active templates", value: "28", delta: "+4 this month", trend: "up", icon: "folder_closed" },
    { id: "completion", label: "Completion rate", value: "88%", delta: "+1.6 pts", trend: "up", icon: "check_circle" },
    { id: "duration", label: "Avg. completion time", value: "13 min", delta: "−0.8 min", trend: "up", icon: "clock" },
  ],
  "90": [
    { id: "submissions", label: "Submissions", value: "2,186", delta: "+15% vs prior 90 days", trend: "up", icon: "file" },
    { id: "templates", label: "Active templates", value: "31", delta: "+6 this quarter", trend: "up", icon: "folder_closed" },
    { id: "completion", label: "Completion rate", value: "86%", delta: "−0.4 pts", trend: "down", icon: "check_circle" },
    { id: "duration", label: "Avg. completion time", value: "14 min", delta: "+0.6 min", trend: "down", icon: "clock" },
  ],
};

const RANGE_TRENDS: Record<DateRangeId, TrendPoint[]> = {
  "7": [
    { label: "Wed", submissions: 22 },
    { label: "Thu", submissions: 28 },
    { label: "Fri", submissions: 31 },
    { label: "Sat", submissions: 14 },
    { label: "Sun", submissions: 11 },
    { label: "Mon", submissions: 38 },
    { label: "Tue", submissions: 40 },
  ],
  "30": [
    { label: "W1", submissions: 148 },
    { label: "W2", submissions: 171 },
    { label: "W3", submissions: 196 },
    { label: "W4", submissions: 227 },
  ],
  "90": [
    { label: "Jun", submissions: 612 },
    { label: "Jul", submissions: 704 },
    { label: "Aug", submissions: 870 },
  ],
};

const RANGE_MIX: Record<DateRangeId, FormTypeSlice[]> = {
  "7": [
    { name: "Safety", value: 86 },
    { name: "Operations", value: 41 },
    { name: "Quality", value: 33 },
    { name: "General", value: 24 },
  ],
  "30": [
    { name: "Safety", value: 318 },
    { name: "Operations", value: 176 },
    { name: "Quality", value: 149 },
    { name: "General", value: 99 },
  ],
  "90": [
    { name: "Safety", value: 912 },
    { name: "Operations", value: 504 },
    { name: "Quality", value: 438 },
    { name: "General", value: 332 },
  ],
};

const STATUSES: SubmissionStatus[] = ["Completed", "In review", "Returned"];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatSubmittedAt(daysAgo: number, hour: number, minute: number): string {
  const d = new Date(2026, 7, 18);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const ALL_SUBMISSIONS: RecentSubmission[] = Array.from({ length: 12 }, (_, i) => {
  const template = TEMPLATES[i % TEMPLATES.length];
  return {
    id: String(i + 1),
    template: template.name,
    formType: template.formType,
    project: PROJECTS[i % PROJECTS.length],
    status: STATUSES[i % STATUSES.length],
    submittedAt: formatSubmittedAt(i, 8 + (i % 9), (i * 7) % 60),
  };
});

const RANGE_SUBMISSION_COUNT: Record<DateRangeId, number> = {
  "7": 6,
  "30": 10,
  "90": 12,
};

export function getDashboardData(range: DateRangeId) {
  return {
    kpis: RANGE_KPIS[range],
    trend: RANGE_TRENDS[range],
    mix: RANGE_MIX[range],
    submissions: ALL_SUBMISSIONS.slice(0, RANGE_SUBMISSION_COUNT[range]),
  };
}
