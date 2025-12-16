import React from 'react'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import GetStart from './Components/GetStart-Components/GetStart'
import Login from './Components/Login'
import AdminPannel from './Components/Admin Components/AdminPannel'
const App = () => {


  return (
    <div className='App-conatiner flex'>
      <AdminPannel/>
      {/* <Router>
        <Routes>
        <Route exact path="/" element={ <GetStart/>} />
        <Route path="/signIn/signUp" element={<Login/>} />
      </Routes>
   
    </Router>  */}
   

    </div>
  )
}

export default App