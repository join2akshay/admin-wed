import React, { useEffect, useState } from 'react'
import Header from '../../Nav'
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../firebase';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
export default function Query() {
  const [data, setData] = useState(null)
  const[keys,setKeys]=useState([])
  useEffect(() => {
    return onValue(ref(db, '/query'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let queryData = { ...data };
      setData(queryData);
    });


  }, [])
  useEffect(() => {

    if(data){

      const queryKeys = Object.keys(data);
      setKeys(queryKeys)
    }

  }, [data])

  return (
   <>
   <Header/>
      <TableContainer component={Paper} style={{marginTop:'5rem'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Query</TableCell>
              {/* <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data[row].name}
                </TableCell>
                <TableCell align="right">{data[row].email} </TableCell>
                <TableCell align="right">{data[row].phone} </TableCell>

                <TableCell align="right">{data[row].quote}</TableCell>
                {/* <TableCell align="right">{data[row].status}</TableCell> */}

                {/* <TableCell align="right">  <IconButton aria-label="delete" >
                  <DeleteIcon />
                </IconButton>

                </TableCell>
                <TableCell align="right" >
                  <Button variant="outlined" size="medium">
                    Edit
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   </>
  )
}
