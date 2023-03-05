import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import URLinputCode from "./URLinputCode";
import Outputcode from "./Outputcode";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<URLinputCode/>}/>
        <Route path='/:urlcode' element={<URLinputCode/>}/>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
