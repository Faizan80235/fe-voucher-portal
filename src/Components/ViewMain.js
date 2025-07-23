import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import logo from '../Components/Aseest/Image/evergreen-school-logo.jpg';
import sign from '../Components/Aseest/Image/principal-signature.png';

export default function ViewMain() {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    section: '',
    feeAmount: '',
    dueDate: '',
  });

  const [studentImage, setStudentImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('voucher-preview');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('fee-voucher.pdf');
    });
  };

  return (
    <div className="d-flex">
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Form Section */}
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h4 className="mb-3">Fee Voucher Form</h4>

              <div className="mb-2">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  className="form-control"
                  value={formData.studentName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  className="form-control"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Section</label>
                <input
                  type="text"
                  name="section"
                  className="form-control"
                  value={formData.section}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Fee Amount</label>
                <input
                  type="number"
                  name="feeAmount"
                  className="form-control"
                  value={formData.feeAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Upload Student Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleStudentImageChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Upload Signature</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleSignatureImageChange}
                />
              </div>

              <button className="btn btn-primary mt-3" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="col-md-6">
            <div id="voucher-preview" className="card p-4 shadow" style={{ backgroundColor: '#fff' }}>
              <div className="d-flex align-items-center mb-3 border-bottom pb-3">
                <img
                  src={logo}
                  alt="School Logo"
                  style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-0 fw-bold">Evergreen Grammar School of Kasur</h5>
                  <p className="mb-0 text-muted">Fee Account - Session April 2024</p>
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-4 text-center">
                  {studentImage ? (
                    <img
                      src={studentImage}
                      alt="Student"
                      className="border"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="border d-flex justify-content-center align-items-center"
                      style={{ width: '100px', height: '100px' }}
                    >
                      <span className="text-muted small">No Image</span>
                    </div>
                  )}
                </div>
                <div className="col-8">
                  <table className="table table-bordered table-sm mb-0">
                    <tbody>
                      <tr>
                        <th>Student Name</th>
                        <td>{formData.studentName || '_________'}</td>
                      </tr>
                      <tr>
                        <th>Father Name</th>
                        <td>{formData.fatherName || '_________'}</td>
                      </tr>
                      <tr>
                        <th>Section</th>
                        <td>{formData.section || '_________'}</td>
                      </tr>
                      <tr>
                        <th>Due Date</th>
                        <td>{formData.dueDate || '_________'}</td>
                      </tr>
                      <tr>
                        <th>Month</th>
                        <td>April 2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h6 className="fw-bold">Fee Details</h6>
              <table className="table table-bordered table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Fee Code</th>
                    <th>Detail</th>
                    <th>Amount (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>001</td><td>Admission Fee</td><td>0</td></tr>
                  <tr><td>002</td><td>Printing Fee</td><td>0</td></tr>
                  <tr><td>003</td><td>Tuition Fee</td><td>{formData.feeAmount || '0'}</td></tr>
                  <tr><td>004</td><td>Generator Charges</td><td>100</td></tr>
                  <tr><td>005</td><td>Red Crescent Fund</td><td>300</td></tr>
                </tbody>
              </table>

              <div className="text-end mt-5">
                {signatureImage ? (
                  <>
                    <img
                      src={sign}
                      alt="Signature"
                      style={{ width: '150px', height: '50px', objectFit: 'contain' }}
                    />
                    <p className="mb-0 fw-bold">Principal Signature</p>
                  </>
                ) : (
                  <p className="text-muted"><i>No signature uploaded</i></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
