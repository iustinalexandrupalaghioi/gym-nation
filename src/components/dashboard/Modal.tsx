import React, { FormEvent, ReactNode, SetStateAction } from "react";

interface Props {
  modalId: string;
  modalTitle: string;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}
const Modal = ({
  modalId,
  modalTitle,
  children,
  setActive,
  handleSubmit,
}: Props) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
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
              onClick={() => setActive(false)}
            ></button>
          </div>
          <div className="modal-body bg-body-tertiary">
            <form
              className="mb-4"
              onSubmit={(event: FormEvent<HTMLFormElement>) =>
                handleSubmit(event)
              }
            >
              {children}
            </form>
            <div className="modal-footer d-flex align-items-end gap-1">
              <button
                type="button"
                className="btn btn-outline-info"
                data-bs-dismiss="modal"
                onClick={() => setActive(false)}
              >
                Anulează
              </button>
              <button type="submit" className="btn btn-primary text-light">
                Adaugă
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
