import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdAccountBalance, MdOutlineCreditCard } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

export const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("dashboard");

  const menuItems = [
    {
      label: "Dashboard",
      icon: RxDashboard,
      href: "#",
    },
    {
      label: "Accounts",
      icon: MdAccountBalance,
      href: "#",
    },
    {
      label: "Credits",
      icon: MdOutlineCreditCard,
      href: "#",
    },
    {
      label: "Investments",
      icon: LuChartNoAxesCombined,
      href: "#",
    },
    {
      label: "Reports",
      icon: HiDocumentReport,
      href: "#",
    },
  ];

  const bottomItems = [
    {
      label: "Settings",
      icon: IoMdSettings,
      href: "#",
    },
  ];

  const listItemStyle = (label: string) => {
    const initialStyle =
      "flex items-center p-1 pl-4 border-l-2 dark:hover:border-l-2    dark:hover:text-primary-dark hover:text-primary-light ";
    return label.toLowerCase() !== selectedItem
      ? initialStyle +
          "border-transparent text-secondary-light dark:text-secondary-dark"
      : initialStyle +
          "text-primary-light dark:text-primary-dark border-l-2 border-primary-light dark:border-primary-dark scale-105 ml-2";
  };

  return (
    <nav
      aria-label="Sidebar Navigation"
      className="relative bg-[linear-gradient(135deg,#ffffff,#edf0f4)] dark:bg-[linear-gradient(135deg,#10131a,#0b0e12)] py-4 rounded-lg h-full"
    >
      <ul className="space-y-4 text-sm">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <li
            key={label}
            onClick={() => {
              setSelectedItem(label.toLocaleLowerCase());
            }}
          >
            <a href={href} className={listItemStyle(label)}>
              <Icon className="mr-2 w-5 h-5" />
              <span>{label}</span>
            </a>
          </li>
        ))}

        {bottomItems.map(({ label, icon: Icon, href }) => (
          <li
            key={label}
            className="bottom-4 absolute"
            onClick={() => setSelectedItem(label.toLocaleLowerCase())}
          >
            <a href={href} className={listItemStyle(label)}>
              <Icon className="mr-2 w-5 h-5" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
