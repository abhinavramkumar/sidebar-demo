import React, { useRef } from "react";
import { MenuDropdownOption } from "../MenuDropdown";

// interface TableMenuProps {
//   initialState?: boolean;
//   options: MenuDropdownOption[];
//   children: ReactNode | JSX.Element | JSX.Element[];
//   styles?: {
//     menuItem: string;
//     menuItems: string;
//   };
//   uniqueId: string | number;
//   tableId: string;
// }

export default function Dropdown({
  initialState,
  options,
  children,
  styles,
  uniqueId,
  tableId,
}) {
  const detailsRef = useRef(null);

  function onClick(e) {
    e.stopPropagation();
    const detailElements =
      document.querySelectorAll("details[open]");
    if (detailsRef.current) {
      if (detailsRef.current.open) {
        detailsRef.current.open = false;
      } else {
        detailsRef.current.open = true;
      }
      detailElements.forEach((element) => {
        if (detailsRef?.current?.id !== element.id) {
          element.open = false;
        }
      });
    }
  }

  return (
    <div className="w-auto">
      <button onClick={onClick}>{children}</button>
      <details
        open={initialState}
        id={`table-dropdown-${tableId}-${uniqueId}`}
        ref={detailsRef}
      >
        <summary className="block"></summary>
        <ol
          className={
            ("absolute bg-white right-4 rounded-md z-[99] border border-gray-200") + (styles?.menuItems ?? "")
          }
        >
          {options.map((opt, optIdx) => (
            // <button
            //   key={optIdx}
            //   onClick={(e) => {
            //     opt.action?.(e);
            //   }}
            //   className={
            //     ("group flex w-full items-center  py-2 text-sm first:hover:rounded-t-md hover:text-white") + (styles?.menuItem || "px-2")
            //   }
            // >
            //   {opt.name}
            // </button>
            <Dropdown options={opt.children}></Dropdown>
          ))}
        </ol>
      </details>
    </div>
  );
}
