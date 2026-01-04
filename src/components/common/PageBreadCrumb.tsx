import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  pageTitle: string;            // existing (DO NOT BREAK)
  items?: BreadcrumbItem[];     // new (optional)
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  items,
}) => {
  const breadcrumbItems: BreadcrumbItem[] =
    items && items.length > 0
      ? items
      : [
        { label: "Home", href: "/" },
        { label: pageTitle },
      ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      {/* PAGE TITLE */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>

      {/* BREADCRUMB */}
      <nav>
        <ol className="flex items-center gap-1.5 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 dark:text-white/90 font-medium">
                  {item.label}
                </span>
              )}

              {index < breadcrumbItems.length - 1 && (
                <svg
                  className="stroke-current text-gray-400"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
