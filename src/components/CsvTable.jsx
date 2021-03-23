import React,{useEffect, useState} from 'react';
import { Container,Table,Button, Row, Col ,Input} from 'reactstrap';
import {Link} from 'react-router-dom'
import { CSVLink } from "react-csv";
import socketIO, { io, Socket } from "socket.io-client";
const axios = require('axios');

var socket;
function CsvTable() {

    const [csvData,setCsvData] = useState('')
    const [data,setData] = useState([])
    const [str,SetStr] = useState(null)
    const [flag, setFlag] = useState(false);
    
    var racelist = {};
    var _cookie = ["tpd_ws_io", null];


    const handleConnect = (e) => {
      e.preventDefault();
      var username = document.getElementById('user-name').value;
      var pwd = document.getElementById('password-id').value;

      if(username === "" || pwd === "" ) {
        alert("Username or password can't be empty");
      }
      else {
        _connect(username, pwd);
        
      }
    }
  
    const _connect = (username, pwd) => {
      document.getElementById('connect-btn').innerHTML = "Connecting...";
      socket = new io("wss://www.tpd-viewer.com",
                  {"withCredentials": true,
                  "path": "/xb_socket.io",
                  "origins": ["www.tpd-viewer.com"],
                  "transportOptions":{
                    "polling": {
                      "extraHeaders": {
                        "LoginAuth-User": username,
                        "LoginAuth-Passwd": pwd
                      }
                    }
                  }
                });
      console.log("joining socket");
  
      socket.connect();

      socket.on('connect', function(msg) {

        if(msg !== undefined) {
          setFlag(true);
        }
        else {
          setFlag(false)
          // alert("You are not connected")
        }
        
      });
  
      socket.on("get_racelist", function(msg) {
        var arr = []
        let s = "";
        Object.keys(msg).forEach(function(key) {
          arr.push(msg[key])
          racelist[key] = msg[key];
          s = s + "\n" + JSON.stringify(msg[key]);
        });
        setData(arr)
        console.log(arr)
        // console.log("get_race_list",JSON.parse("[" + s +"]"))
        SetStr(s)

      });
  
      socket.on("gmax_updates", function(msg) {
        console.log(msg);
        let s = "";
        Object.keys(msg).forEach(function(key) {
          s = s + "\n" + JSON.stringify(msg[key]);
        });
        console.log('gmaxUpdates',s)
        // document.getElementById("textdump").value = s;
      });
  
      socket.on("pong", function(msg) {
        console.log("pong");
        // document.getElementById("textdump").value = 'pong';
      });

      socket.on("join_race", function(msg) {
        console.log(msg);
        // document.getElementById("textdump").value = 'pong';
      });
    }
    const emit = (name,data) =>  {
      socket.emit(name, data);
    }
  
    const send = (name) => {
      socket.send(name);
    }
  
    const ping = () => {
      socket.emit('ping', {});
    }
  
    const get_racelist = (date) =>  {
      console.log("flag", flag)
      if(flag) {
        emit("get_racelist", {"date": date});
      }
      else {
        alert("You are not connected")
      }
      
    }
  
    const join_race = () => {
      let sc = document.getElementById("sharecode-id").value;
      if (sc === "") {
        alert('No Share code Selected')
        return;
      }
      else 
        emit("join_race", {"sc": sc});
    }
  
    const join_all = () => {
      for (let sc in racelist) {
        join_race(sc);
      }
    }
  
    const disconnect = () => {
      socket.disconnect();
      setFlag(false)
    }
  
    const url = "http://www.tpd-viewer.com/replay_stream?port=23456&addr=%2280.90.100.110%22"
      const headers = [
        { label: "Name", key: "name" },
        { label: "Number", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Website", key: "website" }
      ];
      const csvReport = {
        data: csvData,
        headers: headers,
        filename: 'Report.csv'
      };
  return (
    <div className='text-center'>
       <Container> 
         <Row>
           <Col xs="12">
              <h1 className='my-4'>CSV TABLE</h1>
           </Col>

           <Col xs="12" >
             <Row>
               <Col md='6' >
                  <div className='d-flex mb-4'>
                    <Input type="text" id="user-name" placeholder="Username" className='mr-3'  />
                    <Input type="text"  id="password-id" placeholder="Password" />
                  </div>
               
               </Col>
               <Col md='6'>
                 <div className='d-flex mb-4'>
                   <Button color="primary" outline className='mx-1' style={{width:'50%'}} onClick={(e) => handleConnect(e)} id="connect-btn">{flag ? "Connected" : "Connect"}</Button>
                    <Button color="primary" outline className='mx-1' style={{width:'50%'}} onClick={() => get_racelist()}>Get Racelist</Button>
                 </div>
               </Col>
             </Row>

             <Row>
                <Col md='6'>
                    <div className='mb-2'>
                        <Input type="text" id="sharecode-id" placeholder="Sharecode" className='' />
                    </div>
                </Col>
                <Col md='6'>
                   <div className='d-flex mb-2'>
                        <Button onClick={e => join_race()} className="mx-1" color="primary" style={{width:'40%'}}>Join Race</Button> 
                        <Button onClick={e => join_all()} className="mx-1" color="primary" outline style={{width:'40%'}}>Join All Race</Button>
                        <Button color="primary" outline className='mx-1' style={{width:'40%'}} onClick={() => disconnect()}>Disconnect</Button>
                    </div>
                </Col>
             </Row>   
           </Col>

         </Row>
           
            <Table bordered>
            <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Share Code</th>
                  <th>PostTime</th>
                  <th>Published</th>
                  <th>Race Length</th>
                  <th>Race no</th>
                  <th>Race Type</th>
                  <th>Race Course</th>
                  <th>WBYSRacecourse</th>
                </tr>
            </thead>
            <tbody>
                    {data.length > 0 && data.map((items,index)=>{
                        return(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{items.I}</td>
                            <td>{items.PostTime}</td>
                            <td>{items.Published ? "True" : "False"}</td>
                            <td>{items.RaceLength}</td>
                            <td>{items.RaceNo}</td>
                            <td>{items.RaceType}</td>
                            <td>{items.Racecourse}</td>
                            <td>{items.WBYSRacecourse}</td>
                        </tr>
                        )
                    })}            
            </tbody>
            </Table>
            <Row>
              <Col xs="2">
                <CSVLink {...csvReport} >
                  <Button className="float-right" color='primary' block>Export to CSV</Button>
                </CSVLink>
              </Col>

              <Col xs="2">
                <Link to="/chart">
                  <Button color="warning" block>View Chart</Button>
                </Link>
              </Col>
            </Row>
            

            
        </Container>
    </div>
  );
}

export default CsvTable;
