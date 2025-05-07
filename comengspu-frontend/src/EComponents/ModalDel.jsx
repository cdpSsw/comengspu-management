import React from "react";
import Modal from './Modal';

import Axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ModalDel = ({ modalDelID, modalDelTitle, modalDelContent, modalDelPath }) => {
  // console.log(modalDelContent)
  // console.log(modalDelPath)

  const handleDelete = async (id) => {
    try{
      const res = await Axios.delete(`${API_URL}/${modalDelPath}/${id}`, { withCredentials: true } );
      // console.log('Status: ', res.status)
      if(res.status == 200){
        alert(`Delete ${modalDelTitle} Successfully!`);
        location.reload();

      } else {
        `Delete ${modalDelTitle} Failed, ${res.data}`;
      }

    } catch(err) {
      alert(`Error with: ${err}`);
    }
  };
  
  return (
    <Modal
      modalID={modalDelID}
      modalHeaderStyle="d-none"
      modalFooterStyle="d-none"
      modalContentStyle="bg-white"
      modalBodyContent={
        <section className="modal-delete-container py-3">
          <span className="del-icon">
            <i className="bi bi-trash3-fill"></i>
          </span>
          <h1 className="title">Delete {modalDelTitle}</h1>
          <span className="detail">
            <h5>You're going to delete</h5>

            {modalDelTitle === 'Member' ? (
              <h5 className="delete-topic">"{modalDelContent.student_id}", Are you sure ?</h5>

            ) : modalDelTitle === 'Showcase' ? (
              <h5 className="delete-topic">"{modalDelContent.scname}", Are you sure ?</h5>

            ) : modalDelTitle === 'Activities' ? (
              <h5><span className="delete-topic">"{modalDelContent.topic}</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === 'Career Path' ? (
              <h5><span className="delete-topic">"{modalDelContent.topic}</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === 'Faq' ? (
              <h5><span className="delete-topic">"{modalDelContent.question}</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === '(Student) Showcase' ? (
              <h5><span className="delete-topic">"{modalDelContent.topic}</span>", Are you sure ?</h5>
              
            ) : modalDelTitle === '(Student) ShowTiktok' ? (
              <h5><span className="delete-topic">"{modalDelContent.topic}</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === '(Admin) Showcase' ? (
              <h5><span className="delete-topic">"{modalDelContent.topic}</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === '(Admin) Member' ? (
              <h5><span className="delete-topic">"[{modalDelContent.studentID}] {modalDelContent.fname} {modalDelContent.lname}"</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === '(Admin) tools' ? (
              <h5><span className="delete-topic">{modalDelContent.name}</span>", Are you sure ?</h5>
              
            ) : modalDelTitle === '(Admin) Members' ? (
              <h5><span className="delete-topic">"[{modalDelContent.studentID}] {modalDelContent.fname} {modalDelContent.lname}"</span>", Are you sure ?</h5>
              
            ) : modalDelTitle === '(Admin) Teams' ? (
              <h5><span className="delete-topic">"{modalDelContent.name}"</span>", Are you sure ?</h5>
            
            ) : modalDelTitle === '(Admin) Youtube' ? (
              <h5><span className="delete-topic">"[{modalDelContent.studentID}] {modalDelContent.fname} {modalDelContent.lname}"</span>, Are you sure ?</h5>
            
            ) : modalDelTitle === '(Admin) Youtube-Shorts' ? (
              <h5><span className="delete-topic">"[{modalDelContent.studentID}] {modalDelContent.fname} {modalDelContent.lname}"</span>, Are you sure ?</h5>
  
            ) : null }
          </span>
          <span className="md-btn-container">
            <button data-bs-dismiss="modal">No, Keep it.</button>
            <button onClick={() => handleDelete(modalDelContent.id)}>
              Yes, Delete!
            </button>
          </span>
        </section>
      }
    />
  );
};

export default ModalDel;
