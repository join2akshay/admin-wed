import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../actions/utils';
import Header from '../../Nav';
// import { AdminAxios } from '../actions/utils';

export default function SubcategoryList() {
  const [allData, setallData] = useState([])

  useEffect(() => {
    AdminAxios.get(`/sub-category`)
      .then((response) => {
        console.log(response.data)
        setallData(response.data)
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });


  }, [])


  return (
    <div>
      <Header />

      <div>
        <p>
          Add New Category
        </p>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="right">Icon Image</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right"><img src={row.iconImage} /> </TableCell>
                <TableCell align="right"><img src={row.image} width='200' height='200' /> </TableCell>

                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
