import React,{useEffect, useState} from 'react';
import { Container,Table,Button } from 'reactstrap';
import { CSVLink } from "react-csv";
import './style/CsvTable.css'
const axios = require('axios');

function CsvTable() {

    const [csvData,setCsvData] = useState('')
    const [data,setData] = useState([])
    const url = "http://www.tpd-viewer.com/replay_stream?port=23456&addr=%2280.90.100.110%22"
    useEffect(()=>{
        console.log('hello')
        axios.get(url).then(function(response){
          console.log(response)
        })
        .catch(function(error){
            alert(error.message);
        })
            
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
           <h1  className='my-4'>CSV TABLE</h1>
            <Table bordered>
            <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Age</th>
                  <th>class</th>
                  <th>code</th>
                  <th>country</th>
                  <th>distance</th>
                  <th>ground</th>
                  <th>obstacle</th>
                  <th>off_timestamp</th>
                  <th>pa_meeting</th>
                  <th>pa_race</th>
                  <th>post_time</th>
                  <th>race_type</th>
                  <th>racecourse</th>
                  <th>sc</th>
                  <th>surface</th>
                  <th>win_time</th>
                </tr>
            </thead>
            <tbody>
                    {data.length > 0 && data.map((items,index)=>{
                        return(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{items.age}</td>
                            <td>{items.class}</td>
                            <td>{items.code}</td>
                            <td>{items.country}</td>
                            <td>{items.distance}</td>
                            <td>{items.ground}</td>
                            <td>{items.obstacle}</td>
                            <td>{items.off_timestamp}</td>
                            <td>{items.pa_meeting}</td>
                            <td>{items.pa_race}</td>
                            <td>{items.post_time}</td>
                            <td>{items.race_type}</td>
                            <td>{items.racecourse}</td>
                            <td>{items.sc}</td>
                            <td>{items.surface}</td>
                            <td>{items.win_time}</td>

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
