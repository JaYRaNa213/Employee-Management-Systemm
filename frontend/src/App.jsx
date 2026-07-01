import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GetAllEmployees from "./pages/GetAllEmployees.jsx";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AddEmployee from "./pages/AddEmployee.jsx"



function App() {
  return (
    <>
      <BrowserRouter>
       <Header />


      <Routes>
        
        <Route path='/' element ={<GetAllEmployees/>}></Route>
        <Route path='/employees' element ={<GetAllEmployees/>}></Route>
      
        <Route path='/add-employee' element={<AddEmployee/>}></Route>

        <Route path='/update-employee/:id' element={<AddEmployee/>}> </Route>

      </Routes>
       

       

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
