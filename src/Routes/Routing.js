import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ViewMain from '../Components/ViewMain';
import Teacher from '../Components/TeacherForm';
import Student from '../Components/Student';

export default function Routing() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/FeeVoucher" element={<ViewMain />} />
          {/* Add more routes here */}
          <Route
            path="/Teacher"
            element={<Teacher />}
          />    <Route
            path="/Student"
            element={<Student />}
          />
        </Routes>
      </div>
    </div>
  );
}
