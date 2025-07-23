import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"
export default function Sidebar() {
  return (
    <div className="d-flex">
      <div 
        className="bg-dark text-white p-3"
        style={{ width: '250px', height: '150vh' }} // changed from minHeight
      >
        <h5 className="text-center">Evergreen System Helper</h5>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/FeeVoucher">📄 Fee Voucher</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Teacher">👨‍🏫 Teacher Form</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/Student">👨‍🎓 Student</Link>
          </li>
    
        </ul>
      </div>
    </div>
  );
}
