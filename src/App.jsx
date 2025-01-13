import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./App.css";
import "./styles/styles.css";

const UserTable = React.lazy(() => import("./components/UserTable"));
const UserForm = React.lazy(() => import("./components/UserForm"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user-form/:id" element={<UserForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
