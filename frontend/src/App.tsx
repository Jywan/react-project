import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import WritePage from "./pages/WritePage"
import DetailPage from "./pages/DetailPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import NavigationBar from "./components/NavigationBar"

function App() {
  return (
  <div className="text-center">
    <NavigationBar />
    <Routes>
      <Route path="/" element= {<MainPage/>}/>
      <Route path="/write" element= {<WritePage/>}/>
      <Route path="/detail" element= {<DetailPage/>}/>
      <Route path="/login" element= {<LoginPage/>}/>
      <Route path="/profile" element= {<ProfilePage/>}/>
    </Routes>
  </div>
  )
}

export default App
