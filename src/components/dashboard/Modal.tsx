import React, { ReactNode, SetStateAction } from "react";

interface Props {
  modalId: string;
  modalTitle: string;
  setActive?: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}
const Modal = ({ modalId, modalTitle, children, setActive }: Props) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content ">
          <div className="modal-header">
            <h1
              className="modal-title text-light fs-5"
              id="staticBackdropLabel"
            >
              {modalTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setActive && setActive(false)}
            ></button>
          </div>
          <div className="modal-body bg-body-tertiary">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
