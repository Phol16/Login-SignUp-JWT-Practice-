import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"

function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUpPage/>}/>
      <Route path="/logIn" element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
