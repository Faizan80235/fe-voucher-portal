import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import logo from '../Components/Aseest/Image/evergreen-school-logo.jpg';
import sign from '../Components/Aseest/Image/principal-signature.png';

export default function Student() {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    classApplied: 'Play Group',
    address: '',
    contactNumber: '',
    admissionFee: '',
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
    const input = document.getElementById('admission-preview');
    html2canvas(input, {
      scale: window.devicePixelRatio * 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('admission-form.pdf');
    });
  };

  return (
    <div className="d-flex">
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Form Section */}
          <div className="col-md-6">
            <div className="card p-3 shadow">
              <h4 className="mb-3">Play Group Admission Form</h4>

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
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Class Applying For</label>
                <input
                  type="text"
                  name="classApplied"
                  className="form-control"
                  value={formData.classApplied}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Admission Fee (Optional)</label>
                <input
                  type="number"
                  name="admissionFee"
                  className="form-control"
                  value={formData.admissionFee}
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
            <div id="admission-preview" className="card p-4 shadow" style={{ backgroundColor: '#fff' }}>
              <div className="d-flex align-items-center mb-3 border-bottom pb-3">
                <img
                  src={logo}
                  alt="School Logo"
                  style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-0 fw-bold">Evergreen Grammar School of Kasur</h5>
                  <p className="mb-0 text-muted">Admission Form - Session 2024</p>
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
                      <tr><th>Student Name</th><td>{formData.studentName || '_________'}</td></tr>
                      <tr><th>Father Name</th><td>{formData.fatherName || '_________'}</td></tr>
                      <tr><th>Date of Birth</th><td>{formData.dob || '_________'}</td></tr>
                      <tr><th>Class</th><td>{formData.classApplied || '_________'}</td></tr>
                      <tr><th>Contact</th><td>{formData.contactNumber || '_________'}</td></tr>
                      <tr><th>Address</th><td>{formData.address || '_________'}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {formData.admissionFee && (
                <>
                  <h6 className="fw-bold">Admission Fee</h6>
                  <table className="table table-bordered table-sm">
                    <thead className="table-light">
                      <tr><th>Description</th><th>Amount (Rs)</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Admission Charges</td><td>{formData.admissionFee}</td></tr>
                    </tbody>
                  </table>
                </>
              )}

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
