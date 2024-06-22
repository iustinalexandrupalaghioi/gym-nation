import { ReactNode, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
  menuTitle: string;
  menuId: string;
  children: ReactNode;
  styleClass?: string;
  isExpanded?: boolean;
}
const CollapseMenuItem = ({
  menuTitle,
  menuId,
  isExpanded,
  styleClass,
  children,
}: Props) => {
  const [expanded, setExpand] = useState<boolean>(
    isExpanded ? isExpanded : false
  );

  return (
    <li className="nav-item">
      <div className="p-0 d-flex flex-column">
        <button
          className={`bg-body-tertiary border-0 d-flex flex-row justify-content-between text-sm-start align-items-center gap-1 ${styleClass}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${menuId}`}
          aria-expanded="false"
          aria-controls="collapseWidthExample"
          onClick={() => setExpand(!expanded)}
        >
          <p
            className={`mb-0 px-2 ${
              expanded ? "text-light" : "text-body-secondary"
            }`}
          >
            {menuTitle}
          </p>
          {expanded ? (
            <p className="mb-0 fs-5">
              <IoIosArrowUp />
            </p>
          ) : (
            <p className="mb-0 fs-5">
              <IoIosArrowDown />
            </p>
          )}
        </button>
        <div
          className={`collapse fade collapse-vertical ${expanded && "show"}`}
          id={menuId}
        >
          {children}
        </div>
      </div>
    </li>
  );
};

export default CollapseMenuItem;
