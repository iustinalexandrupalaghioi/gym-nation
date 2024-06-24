import { ReactNode, SetStateAction } from "react";

interface Props {
  textContent: string;
  modalId: string;
  isActive: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  styleClass?: string;
  children?: ReactNode;
}
const ToggleModalButton = ({
  textContent,
  modalId,
  setActive,
  isActive,
  styleClass,
  children,
}: Props) => {
  return (
    <button
      className={
        styleClass
          ? styleClass
          : `nav-link hover hover-primary text-start  ${
              isActive ? "text-primary" : "text-body-secondary"
            }`
      }
      onClick={() => setActive(true)}
      data-bs-toggle="modal"
      data-bs-target={`#${modalId}`}
    >
      {textContent} {children && children}
    </button>
  );
};

export default ToggleModalButton;
