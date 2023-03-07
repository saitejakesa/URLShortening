import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import env from "./environment";
import SendIcon from "@mui/icons-material/Send";
import {  useNavigate, useParams} from "react-router-dom";


function URLinputCode() {
  let [oldURL, seturl] = useState("");
  let [shortUrl, setshortUrl] = useState("");
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  let handleLogin = async () => {
    let res = await axios.post(`${env.apiurl}/users/shorturl`, {
      oldURL: oldURL,
    });
    // setshortUrl(res.data.urlCode);
    // console.log(res.data)

    if (res.data.statusCode === 200) {
      console.log(res.data.url.urlCode)
      setToggle(false);
      setshortUrl(res.data.url.urlCode);
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
        {shortUrl}
      </div>
      <div>
        {toggle ? <Spinner animation="border" color="primary" /> : <></>}
        {message ? <div style={{ color: "red" }}>{message}</div> : <></>}
      </div>
    </div>
  );
}

export default URLinputCode;
