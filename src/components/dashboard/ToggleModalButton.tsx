import { SetStateAction } from "react";

interface Props {
  textContent: string;
  modalId: string;
  isActive: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
}
const ToggleModalButton = ({
  textContent,
  modalId,
  setActive,
  isActive,
}: Props) => {
  return (
    <button
      className={`nav-link hover hover-primary gap-1 ${
        isActive ? "text-primary" : "text-body-secondary"
      }`}
      onClick={() => setActive(true)}
      data-bs-toggle="modal"
      data-bs-target={`#${modalId}`}
    >
      {textContent}
    </button>
  );
};

export default ToggleModalButton;
