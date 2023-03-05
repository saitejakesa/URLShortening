import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import env from "./environment";
import SendIcon from "@mui/icons-material/Send";
import {  useNavigate, useParams} from "react-router-dom";


function URLinputCode() {
  let [oldURL, seturl] = useState("");
  let [shorturl, setshorturl] = useState("");
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  // let [urlCode,seturlCode]=useState("")
  let [state,setstate]=useState("")
  let navigate = useNavigate();
  let params = useParams()
  let handleLogin = async () => {
    let res = await axios.post(`${env.apiurl}/users/shorturl`, {
      oldURL: oldURL,
    });
    
    console.log(res.data)

    if (res.data.statusCode === 200) {
      setToggle(false);
      setshorturl(res.data.urlCode);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }
  let handleSubmit = async () => {
    let res2 = await axios.get(`http://localhost:9000/index/${shorturl}`)
    console.log(res2.data)
    setstate(res2.data)
    // window.navigator.navigate(res2.data)
  // if (res2.data.status === 200) {
    
  // }
  // else {
  //   setMessage(res2.data.message)
  // }
}

  return (
    
    <div className="App">
      <h1>Shortening URL</h1>
      <div>
        <Form>
          <FormGroup>
            
            <Input
              id="url"
              name="url"
              placeholder="Full URL"
              type="url"
              onChange={(e) => seturl(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>
      <div>
        <Button color="primary" onClick={() => handleLogin()} >
          Shortening
        </Button>
      </div>
      <div>
        <FormGroup>
            <div className="shortening">
          <Input
            id="url"
            name="url"
            placeholder="Shortened URL"
            type="url"
            value={oldURL ? shorturl : ""}
            onChange={(e)=>setshorturl(e.target.value)}
          >
          </Input> 
          <Button variant="contained" color="primary" endIcon={<SendIcon /> } onClick={() => handleSubmit(shorturl)}>
            Click Here First
            </Button>         
            </div>
             
            <a href={state}>click Here after send to navigate to full URL</a>
        </FormGroup>
      </div>
      <div>
        {toggle ? <Spinner animation="border" color="primary" /> : <></>}
        {message ? <div style={{ color: "red" }}>{message}</div> : <></>}
      </div>
    </div>
  );
}

export default URLinputCode;
