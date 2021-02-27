import React,{useEffect, useState} from 'react';
import { Container,Table,Button, Row, Col } from 'reactstrap';
import { CSVLink } from "react-csv";
import './style/CsvTable.css'
import socketIO, { io, Socket } from "socket.io-client";
const axios = require('axios');

function CsvTable() {

    const [csvData,setCsvData] = useState('')
    const [data,setData] = useState([])
    const [str,SetStr] = useState(null)
    var socket;
    var racelist = {};
    var _cookie = ["tpd_ws_io", null];
  
    const _connect = () => {
      socket = new io("wss://www.tpd-viewer.com",
                  {"withCredentials": true,
                  "path": "/xb_socket.io",
                  "origins": ["www.tpd-viewer.com"],
                  "transportOptions":{
                    "polling": {
                      "extraHeaders": {
                        "LoginAuth-User": "ws_test",
                        "LoginAuth-Passwd": "ws_test"
                      }
                    }
                  }
                });
      console.log("joining socket");
  
      socket.connect();

      socket.on('connect', function(msg) {
        console.log(msg);
      });
  
      socket.on("get_racelist", function(msg) {
        console.log(msg);
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
      emit("get_racelist", {"date": date});
    }
  
    const join_race = (sc) => {
      if (sc == null) {
        let sc = document.getElementById("sharecode").value;
      }
      if (sc == null) {
        console.log("No sharecode selected")
        alert('No Share code Selected')
        // document.getElementById("textdump").value = "No sharecode selected";
        return;
      }
      emit("join_race", {"sc": sc});
    }
  
    const join_all = () => {
      for (let sc in racelist) {
        join_race(sc);
      }
    }
  
    const disconnect = () => {
      socket.disconnect();
    }
  
  

    const url = "http://www.tpd-viewer.com/replay_stream?port=23456&addr=%2280.90.100.110%22"
    useEffect(()=>{
        // console.log('hello')
        // axios.get(url).then(function(response){
        //   console.log(response)
        // })
        // .catch(function(error){
        //     alert(error.message);
        // })
        _connect()
        get_racelist()
            
    },[])
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
           <Col xs="12" className="mb-2">
             <Button onClick={e => join_race()} className="float-right ml-2" color="primary">Join Race</Button>
             <Button onClick={e => join_all()} className="float-right" color="primary" outline>Join All Race</Button>
           </Col>

         </Row>
           
            <Table bordered>
            <thead>
                <tr>
                  <th>S.No.</th>
                  <th>I</th>
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
            <CSVLink {...csvReport} >
                <Button className="float-right" color='primary'>Export to CSV</Button>
            </CSVLink>
        </Container>
    </div>
  );
}

export default CsvTable;
