"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
BoltIcon,
BoxCubeIcon,
CalenderIcon,
ChatIcon,
ChevronDownIcon,
DocsIcon,
DollarLineIcon,
FolderIcon,
GridIcon,
HorizontaLDots,
ListIcon,
PageIcon,
PieChartIcon,
PlugInIcon,
ShootingStarIcon,
TableIcon,
TaskIcon,
TimeIcon,
UserCircleIcon,
} from "../icons/index";
import { Clock, Computer, Group, Plane } from "lucide-react";
import { Asset } from "next/font/google";
import { FLIGHT_HEADERS } from "next/dist/client/components/app-router-headers";

type NavItem = {
name: string;
icon: React.ReactNode;
path?: string;
subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
{
  icon: <GridIcon />,
  name: "Dashboard",
  path: "/",
},
{
  icon: <DocsIcon />,
  name: "HR Services",
  subItems: [
    { name: "Employee Hub", path: "/employee-hub" },
    { name: "HR Policies & Handbooks", path: "/hr-policies" },
    { name: "Onboarding & Offboarding", path: "/onboarding-offboarding" },
    { name: "Employment Details", path: "/employment-details" },
    { name: "Company Letters", path: "/company-letters" },
    { name: "Background Verification", path: "/background-verification" },
    { name: "Transfer & Relocation", path: "/transfer-relocation" },
    { name: "Queries & Support", path: "/hr-queries-support" },
    { name: "Grievances", path: "/grievances" },
  ],
},
{
  icon: <DollarLineIcon />,
  name: "Pay",
  subItems: [
    { name: "My Payslips", path: "/payslips" },
    { name: "Tax", path: "/tax" },
    { name: "Total Rewards", path: "/total-rewards" },
    { name: "Bonus history", path: "/bonus-history" },
    { name: "Claims", path: "/claims" },
    { name: "Reimbursements", path: "/reimbursements" },
    { name: "Reimbursable Allowances", path: "/reimbursable-allowances" },
    { name: "Expenses", path: "/expenses" },
    { name: "Salary Advance & Loans", path: "/salary-advance-loans" },
    { name: "Bank & Payment Details", path: "/bank-payment-details" },
    { name: "Queries & Support", path: "/payroll-queries-support" },
  ],
},
{
  icon: <TaskIcon />,
  name: "Benefits",
  path: "/benefits",
},
{
  icon: <Clock />,
  name: "Time Management",
  subItems: [
    { name: "Request Absence", path: "/request-absence" },
    { name: "Manage Absence", path: "/manage-absence" },
    { name: "Time off - Balance", path: "/time-off-balance" },
    { name: "Calendar", path: "/calendar" },
    { name: "Holiday List", path: "/holiday-list" },
    { name: "Timesheet", path: "/timesheet" },
    { name: "Attendance", path: "/attendance" },
    { name: "Shift Management", path: "/shift-management" },
    { name: "Work From Home", path: "/work-from-home" },
    { name: "Overtime & Extra Hours", path: "/overtime-extra-hours" },
    { name: "Queries & Support", path: "/time-management-queries-support" },
  ],
},
{
  icon: <Computer />,
  name: "Asset Management",
  subItems: [
    { name: "My Assets", path: "/my-assets" },
    { name: "Request Asset", path: "/request-asset" },
    { name: "Return Asset", path: "/return-asset" },
    { name: "Exchange Asset", path: "/exchange-asset" },
    { name: "Asset Issue", path: "/asset-issue" },
    { name: "Asset Documentation", path: "/asset-documentation" },
    { name: "Exit Clearance", path: "/asset-exit-clearance" },
  ],
},
{
  icon: <Group />,
  name: "Workplace",
  subItems: [
    { name: "Employee Directory", path: "/employee-directory" },
    { name: "Organizational Chart", path: "/organizational-chart" },
    { name: "Announcements", path: "/announcements" },
    { name: "Company News", path: "/company-news" },
    { name: "Appreciate", path: "/appreciate" },
    { name: "Feedback", path: "/feedback" },
    { name: "Frequently Asked Questions", path: "/faq" },
  ],
},
{
  icon: <Plane />,
  name: "Travel",
  subItems: [
    { name: "Travel Request", path: "/travel-request" },
    { name: "Visa & Immigration", path: "/visa-immigration" },
    { name: "Foreign Exchange", path: "/foreign-exchange" },
    { name: "Travel Policy & Guidelines", path: "/travel-policy-guidelines" },
    { name: "Queries & Support", path: "/travel-management-queries-support" },
  ],
},
{
  icon: <ChatIcon />,
  name: "Support & Engagement",
  subItems: [
    { name: "Help Desk", path: "/helpdesk" },
    { name: "Appreciate", path: "/appreciate" },
    { name: "Announcements", path: "/announcements" },
  ],
},
{
  icon: <ShootingStarIcon />,
  name: "Learning & Training",
  subItems: [
    { name: "My Learning Dashboard", path: "/my-learning-dashboard" },
    { name: "Course Catalog", path: "/course-catalog" },
    { name: "My Courses", path: "/my-courses" },
    { name: "Learning Paths", path: "/learning-paths" },
    { name: "Mandatory & Compliance Trainings", path: "/mandatory-compliance-trainings" },
    { name: "Assessments & Quizzes", path: "/assessments-quizzes" },
    { name: "Surveys & Feedbacks", path: "/surveys-feedbacks" },
  ],
},
{
  icon: <UserCircleIcon />,
  name: "Resignation & Exit",
  subItems: [
    { name: "Submit Resignation", path: "/submit-resignation" },
    { name: "Resignation Status", path: "/resignation-status" },
    { name: "Withdraw Resignation", path: "/withdraw-resignation" },
    { name: "Notice Period Management", path: "/notice-period-management" },
    { name: "Exit Clearance Checklist", path: "/exit-clearance-checklist" },
    { name: "HR Clearance", path: "/hr-clearance" },
    { name: "IT Clearance", path: "/it-clearance" },
    { name: "Finance/Accounts Clearance", path: "/finance-clearance" },
    { name: "Admin/Facilities Clearance", path: "/admin-clearance" },
    { name: "Knowledge Transfer (KT)", path: "/knowledge-transfer" },
    { name: "Exit Interview", path: "/exit-interview" },
    { name: "Full & Final Settlement", path: "/full-final-settlement" },
    { name: "Exit Documents", path: "/exit-documents" },
    { name: "Post-Exit Support", path: "/post-exit-support" },
  ],
},
{
  icon: <UserCircleIcon />,
  name: "Admin",
  path: "/admin",
  // Recommended: Hide via role-based access control
},
];


const othersItems: NavItem[] = [

];

const AppSidebar: React.FC = () => {
const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
const pathname = usePathname();

const renderMenuItems = (navItems: NavItem[], menuType: "main") => (
  <ul className="flex flex-col gap-1"> {/* Reduced gap for tighter accordion look */}
    {navItems.map((nav, index) => {
      const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;

      return (
        <li key={nav.name} className="relative">
          {nav.subItems ? (
            <>
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group w-full flex items-center p-3 rounded-lg transition-all ${
                  isOpen 
                    ? "bg-brand-50/50 text-brand-600 dark:bg-brand-500/10" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
              >
                <span className={`${isOpen ? "text-brand-600" : "text-gray-500"}`}>
                  {nav.icon}
                </span>
                
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="ml-3 text-sm font-medium">{nav.name}</span>
                    <ChevronDownIcon
                      className={`ml-auto w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-brand-500" : "text-gray-400"
                      }`}
                    />
                  </>
                )}
              </button>

              {/* VERTICAL ACCORDION SUBMENU */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen && (isExpanded || isHovered || isMobileOpen)
                    ? "max-h-[1000px] opacity-100 mt-1" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="ml-9 border-l border-gray-200 dark:border-gray-700 space-y-1">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive(subItem.path)
                            ? "text-brand-600 font-semibold bg-brand-50/50 dark:bg-brand-500/10"
                            : "text-gray-600 dark:text-gray-400 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <Link
              href={nav.path || "/"}
              className={`menu-item group flex items-center p-3 rounded-lg transition-all ${
                isActive(nav.path || "") 
                  ? "bg-brand-50 text-brand-600 shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
            >
              <span className={isActive(nav.path || "") ? "text-brand-600" : "text-gray-500"}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="ml-3 text-sm font-medium">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      );
    })}
  </ul>
);

const [openSubmenu, setOpenSubmenu] = useState<{
  type: "main";
  index: number;
} | null>(null);
const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
  {}
);
const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

// const isActive = (path: string) => path === pathname;
const isActive = useCallback((path: string) => path === pathname, [pathname]);

useEffect(() => {
  // Check if the current path matches any submenu item
  let submenuMatched = false;
  ["main"].forEach((menuType) => {
    const items = menuType === "main" ? navItems : othersItems;
    items.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: menuType as "main",
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });
  });

  // If no submenu item matches, close the open submenu
  if (!submenuMatched) {
    setOpenSubmenu(null);
  }
}, [pathname, isActive]);

useEffect(() => {
  // Set the height of the submenu items when the submenu is opened
  if (openSubmenu !== null) {
    const key = `${openSubmenu.type}-${openSubmenu.index}`;
    if (subMenuRefs.current[key]) {
      setSubMenuHeight((prevHeights) => ({
        ...prevHeights,
        [key]: subMenuRefs.current[key]?.scrollHeight || 0,
      }));
    }
  }
}, [openSubmenu]);

const handleSubmenuToggle = (index: number, menuType: "main") => {
  setOpenSubmenu((prevOpenSubmenu) => {
    if (
      prevOpenSubmenu &&
      prevOpenSubmenu.type === menuType &&
      prevOpenSubmenu.index === index
    ) {
      return null;
    }
    return { type: menuType, index };
  });
};

return (
  <aside
    className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
      ${isExpanded || isMobileOpen
        ? "w-[290px]"
        : isHovered
          ? "w-[290px]"
          : "w-[90px]"
      }
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
    onMouseEnter={() => !isExpanded && setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div
      className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
    >
      <Link href="/">
        {isExpanded || isHovered || isMobileOpen ? (
          <>
            <Image
              className="dark:hidden"
              src="/images/logo/logo.svg"
              alt="Logo"
              width={150}
              height={40}
            />
            <Image
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
              width={150}
              height={40}
            />
          </>
        ) : (
          <Image
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        )}
      </Link>
    </div>
    <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav className="mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2
              className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                ? "lg:justify-center"
                : "justify-start"
                }`}
            >
              {isExpanded || isHovered || isMobileOpen ? (
                "Menu"
              ) : (
                <HorizontaLDots />
              )}
            </h2>
            {renderMenuItems(navItems, "main")}
          </div>

          {/* <div className="">
            <h2
              className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                ? "lg:justify-center"
                : "justify-start"
                }`}
            >
              {isExpanded || isHovered || isMobileOpen ? (
                "Others"
              ) : (
                <HorizontaLDots />
              )}
            </h2>
            {renderMenuItems(othersItems, "others")}
          </div> */}
        </div>
      </nav>
      {isExpanded || isHovered || isMobileOpen}
    </div>
  </aside>
);
};

export default AppSidebar;
