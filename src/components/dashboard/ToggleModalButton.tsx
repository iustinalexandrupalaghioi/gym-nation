import { SetStateAction } from "react";
import { GrFormAdd } from "react-icons/gr";

interface Props {
  textContent: string;
  modalId: string;
  isActive: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  styleClass?: string;
}
const ToggleModalButton = ({
  textContent,
  modalId,
  setActive,
  isActive,
  styleClass,
}: Props) => {
  return (
    <button
      className={
        styleClass
          ? styleClass
          : `nav-link hover hover-primary text-start d-flex align-items-center gap-1 ${
              isActive ? "text-primary" : "text-body-secondary"
            }`
      }
      onClick={() => setActive(true)}
      data-bs-toggle="modal"
      data-bs-target={`#${modalId}`}
    >
      <GrFormAdd size={"1rem"} />
      {textContent}
    </button>
  );
};

export default ToggleModalButton;
