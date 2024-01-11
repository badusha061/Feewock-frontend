import React from 'react'
import  Modal from 'react-modal'
import './EditMainService.css';
import AdminLayouts from '../../../layouts/AdminLayouts';

function EditMainService() {
  return (
    <AdminLayouts>

    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button>
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="input-container">
        <input required="" placeholder="Service Name"  type="text" />
        <button className="invite-btn" type="button">
            Edit
        </button>
        
        </div>
        <div className="footer">
          <button id="cancelBtn">
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
</AdminLayouts>
  )
}

export default EditMainService