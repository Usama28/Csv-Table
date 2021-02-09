import React,{useEffect, useState} from 'react';
import { Container,Table,Button } from 'reactstrap';
import { CSVLink } from "react-csv";
import './style/CsvTable.css'

function CsvTable() {

    const [csvData,setCsvData]=useState('')
    useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res=> res.json())
            .then(data=>setCsvData(data))
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
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Website</th>
                </tr>
            </thead>
            <tbody>
                    {csvData && csvData.map((items,index)=>{
                        return(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{items.name}</td>
                            <td>{items.phone}</td>
                            <td>{items.email}</td>
                            <td>{items.website}</td>
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
