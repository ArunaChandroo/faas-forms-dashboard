/** Push mode — must match `minWidth` / `maxWidth` on `ModusWcSideNavigation`. */
export const SIDE_NAV_PUSH_COLLAPSED = "80px";
export const SIDE_NAV_PUSH_EXPANDED = "280px";

export const FORMS_SIDE_NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    to: "/dashboard",
    navigable: true,
  },
  {
    id: "form-templates",
    label: "Form templates",
    icon: "folder_closed",
    to: "/form-templates",
    navigable: false,
  },
  {
    id: "form-types",
    label: "Form types",
    icon: "view_list",
    to: "/form-types",
    navigable: false,
  },
  {
    id: "form-workflows",
    label: "Form workflows",
    icon: "share",
    to: "/form-workflows",
    navigable: false,
  },
  {
    id: "predefined-answers",
    label: "Predefined answers",
    icon: "check_circle",
    to: "/predefined-answers",
    navigable: false,
  },
  {
    id: "custom-variables",
    label: "Custom variables",
    icon: "settings",
    to: "/custom-variables",
    navigable: false,
  },
] as const;

export type SideNavItemId = (typeof FORMS_SIDE_NAV_ITEMS)[number]["id"];

export function activeSideNavIdFromPath(pathname: string): SideNavItemId {
  const match = FORMS_SIDE_NAV_ITEMS.find((item) => item.to === pathname);
  return match?.id ?? "dashboard";
}
