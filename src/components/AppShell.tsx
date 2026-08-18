import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ModusWcAvatar,
  ModusWcButton,
  ModusWcDropdownMenu,
  ModusWcIcon,
  ModusWcMenuItem,
  ModusWcSideNavigation,
  ModusWcTypography,
} from "../../Modus components";
import { TrimbleFormsHeaderLogo } from "./TrimbleFormsHeaderLogo";
import {
  FORMS_SIDE_NAV_ITEMS,
  SIDE_NAV_PUSH_COLLAPSED,
  SIDE_NAV_PUSH_EXPANDED,
  activeSideNavIdFromPath,
} from "../constants/navigation";

export function AppShell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sideNavExpanded, setSideNavExpanded] = useState(false);
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);
  const activeSideNavId = activeSideNavIdFromPath(pathname);

  return (
    <div className="forms-shell flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="forms-topbar flex h-[60px] shrink-0 items-center border-b px-3">
        <ModusWcButton
          aria-expanded={sideNavExpanded}
          aria-label="Main navigation"
          color="tertiary"
          customClass="shrink-0"
          pressed={sideNavExpanded}
          shape="square"
          size="sm"
          type="button"
          variant="borderless"
          onButtonClick={() => setSideNavExpanded((v) => !v)}
        >
          <ModusWcIcon decorative name="menu" size="sm" variant="solid" />
        </ModusWcButton>
        <div className="ml-2 flex shrink-0 items-center">
          <TrimbleFormsHeaderLogo />
        </div>
        <div className="min-w-0 flex-1" />
        <div className="flex shrink-0 items-center gap-2">
          <ModusWcDropdownMenu
            buttonAriaLabel="Apps"
            buttonColor="tertiary"
            buttonSize="sm"
            buttonVariant="borderless"
            customClass="forms-app-switcher shrink-0"
            menuBordered
            menuOffset={10}
            menuPlacement="bottom-end"
            menuSize="sm"
            menuVisible={appsMenuOpen}
            onMenuVisibilityChange={(e) => setAppsMenuOpen(e.detail.isVisible)}
          >
            <div slot="button" className="flex items-center justify-center">
              <ModusWcIcon decorative name="apps" size="sm" variant="solid" />
            </div>
            <div slot="menu">
              <ModusWcMenuItem
                label="Trimble Forms"
                value="forms"
                onItemSelect={() => setAppsMenuOpen(false)}
              />
              <ModusWcMenuItem
                label="Project Management"
                value="projects"
                onItemSelect={() => setAppsMenuOpen(false)}
              />
              <ModusWcMenuItem
                label="Analytics"
                value="analytics"
                onItemSelect={() => setAppsMenuOpen(false)}
              />
            </div>
          </ModusWcDropdownMenu>
          <ModusWcButton
            aria-label="Notifications"
            color="tertiary"
            shape="square"
            size="sm"
            type="button"
            variant="borderless"
            onButtonClick={() => undefined}
          >
            <ModusWcIcon decorative name="notifications" size="sm" variant="solid" />
          </ModusWcButton>
          <ModusWcButton
            aria-label="Account menu"
            color="tertiary"
            shape="circle"
            size="sm"
            type="button"
            variant="borderless"
            onButtonClick={() => undefined}
          >
            <ModusWcAvatar alt="User" initials="AJ" shape="circle" size="xs" />
          </ModusWcButton>
        </div>
      </header>

      <div className="forms-shell-body relative flex min-h-0 flex-1 overflow-hidden">
        <ModusWcSideNavigation
          collapseOnClickOutside={false}
          customClass="forms-app-side-navigation"
          expanded={sideNavExpanded}
          maxWidth={SIDE_NAV_PUSH_EXPANDED}
          mode="push"
          targetContent="#forms-main-content"
          onExpandedChange={(e: CustomEvent) => {
            setSideNavExpanded(Boolean(e.detail));
          }}
          // @ts-expect-error minWidth on web component; React wrapper types omit it.
          minWidth={SIDE_NAV_PUSH_COLLAPSED}
        >
          <nav
            aria-label="Forms navigation"
            className={
              sideNavExpanded
                ? "forms-side-nav-list flex flex-col gap-1 px-[24px] pb-[24px] pt-[16px]"
                : "forms-side-nav-list forms-side-nav-list--collapsed flex flex-col items-center gap-1 px-[24px] pb-[24px] pt-[16px]"
            }
          >
            {FORMS_SIDE_NAV_ITEMS.map((item) => (
              <ModusWcButton
                key={item.id}
                aria-current={activeSideNavId === item.id ? "page" : undefined}
                aria-label={item.label}
                color="tertiary"
                customClass={[
                  sideNavExpanded
                    ? "forms-side-nav-item w-full justify-start"
                    : "forms-side-nav-item forms-side-nav-item--collapsed w-full justify-center",
                  activeSideNavId === item.id ? "forms-side-nav-item--selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                shape="rectangle"
                size="sm"
                type="button"
                variant="borderless"
                onButtonClick={() => {
                  if (!item.navigable) return;
                  navigate(item.to);
                  if (sideNavExpanded) setSideNavExpanded(false);
                }}
              >
                <span
                  className={
                    sideNavExpanded
                      ? "inline-flex items-center gap-3"
                      : "inline-flex items-center justify-center"
                  }
                >
                  <ModusWcIcon
                    decorative
                    name={item.icon}
                    size="sm"
                    variant="outlined"
                  />
                  {sideNavExpanded ? (
                    <ModusWcTypography
                      customClass="forms-side-nav-item-label"
                      hierarchy="p"
                      label={item.label}
                      size="sm"
                      weight="normal"
                    />
                  ) : null}
                </span>
              </ModusWcButton>
            ))}
          </nav>
        </ModusWcSideNavigation>

        <div
          className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-[24px] pb-[24px] pt-0"
          id="forms-main-content"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
