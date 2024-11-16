import React from "react";
import {Route, Routes} from 'react-router-dom'
import MessagePages from "./pages/MessagePage";

const App: React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<MessagePages />} />
    </Routes>
  )
}

export default App