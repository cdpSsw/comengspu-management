import React, { useState, useEffect } from "react";

const Modal = ({
  modalID,
  modalHeaderStyle,
  modalTitleStyle,
  modalTitle,
  modalClosedBTNStyle,
  modalContentStyle,
  modalBodyStyle,
  modalBodyContent,
  modalFooterStyle,
  modalFooterContent,
  modalSize,
  isOpen,  // New prop to control modal visibility
  closeModal // Function to close the modal
}) => {

  useEffect(() => {
    if (isOpen) {
      // Add focus management when modal is opened
      const modalElement = document.getElementById(modalID);
      const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus(); // Focus the first element inside the modal
      }
    }
  }, [isOpen, modalID]);

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      id={modalID}
      style={{ display: isOpen ? "block" : "none" }}
      aria-hidden={!isOpen}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={modalTitle}
      aria-modal="true"
    >
      <article className={`modal-dialog modal-dialog-centered ${modalSize}`}>
        <section className={`modal-content ${modalContentStyle}`}>
          <div className={`modal-header ${modalHeaderStyle}`}>
            <h1 className={modalTitleStyle}>{modalTitle}</h1>
            <button
              className={`btn-close ${modalClosedBTNStyle}`}
              data-bs-dismiss="modal"
              onClick={closeModal} // Ensure this closes the modal correctly
              aria-label="Close"
            ></button>
          </div>

          <div className={`modal-body ${modalBodyStyle}`}>
            {modalBodyContent}
          </div>

          <div className={`modal-footer ${modalFooterStyle}`}>
            {modalFooterContent}
          </div>
        </section>
      </article>
    </div>
  );
};

export default Modal;
