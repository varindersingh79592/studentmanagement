import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from './components/student/AddStudent';
import StudentView from './components/student/StudentView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentView />}>
          <Route path="addStudent" element={<AddStudent />} />
        </Route>
        <Route index element={<StudentView />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
