import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard.jsx";
import GetAllEmployees from "./pages/GetAllEmployees.jsx";
import GetAllDepartments from "./pages/GetAllDepartments.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import AddDepartment from "./pages/AddDepartment.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EmployeeProfile from "./pages/EmployeeProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Header />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<ProtectedRoute><GetAllEmployees /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><GetAllDepartments /></ProtectedRoute>} />
            <Route path="/add-employee" element={<ProtectedRoute allowedRoles={['ADMIN']}><AddEmployee /></ProtectedRoute>} />
            <Route path="/add-department" element={<ProtectedRoute allowedRoles={['ADMIN']}><AddDepartment /></ProtectedRoute>} />
            <Route path="/update-employee/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}><AddEmployee /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/employee/:id" element={<EmployeeProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
