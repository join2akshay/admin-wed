import React, { useEffect } from 'react'
import { Box, Button, Dialog, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AdminAxios } from '../../actions/utils';

export default function TableList({row,allData,i,setallData}) {
  const [openE, setOpenE] = React.useState(false);
  const [selectOption, setSelectOption] = React.useState(row.orderStatus);

  const updateData = (e, i) => {
    let tempData = allData;
    tempData[i].orderStatus=e.target.value
console.log(tempData)
setSelectOption(e.target.value)
    setallData(tempData)
  }
  const update = () => {
    console.log(row)
    AdminAxios.put(`/orders/${row._id}`, { update:row })
      .then((response) => {
        console.log(response.data)

        // onClose()
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  }

  useEffect(() => {
    if(!openE)
    {
update()
    }

  }, [openE])

  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="right">{i + 1}</TableCell>

      <TableCell component="th" scope="row">
        {row?.address?.name?.first} {' '}  {row?.address?.name?.last}
      </TableCell>
      <TableCell component="th" scope="row">
        {row?.address?.addressLine1} {' '}  {row?.address?.addressLine2} {' '} Pin Code - {row?.address?.pinCode}
      </TableCell>
      <TableCell align="right">{row?.total} </TableCell>
      <TableCell align="right">
        {row?.items?.length}
      </TableCell>

      <TableCell align="right">{row?.phone}</TableCell>
      <TableCell align="right">
        {
          openE ? <>
            <select value={selectOption} onChange={(e) => updateData(e,i)}>
              <option value="ORDERED">ORDERED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="OUT OF DELIVERY">OUT OF DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>

            </select>
          </> :
            <>
              {row?.orderStatus}</>
        }
      </TableCell>
      <TableCell align="right">{row?.paymentMode}</TableCell>
      <TableCell align="right">{row?.createdAt}</TableCell>

      <TableCell align="right">
        {
          openE ? <>

            <Button variant='contained' onClick={() => setOpenE(false)}>
              Save
            </Button>

            <Button variant='contained' onClick={() => setOpenE(false)}>
              Cancle
            </Button>

          </> :
            <IconButton aria-label="delete" onClick={() => { setOpenE(true) }}>
              <EditIcon />
            </IconButton>
        }
        {/* <Button variant='contained'>
                    Status change
                  </Button> */}
        {/* <IconButton aria-label="delete" onClick={() => { setSelectCateogry(row); setOpenE(true) }}>
                    <EditIcon />
                </IconButton> */}
        {/* <ConfirmDialog
          title="Delete Post?"
          open={openD}
          setOpen={setOpenD}
          onConfirm={deletePost}
        >
          Are you sure you want to delete this post?
        </ConfirmDialog> */}
      </TableCell>
      {/* <TableCell align="right" onClick={() => editCategory(row)}>
                  <Button variant="outlined" size="medium">
                    Edit
                  </Button>
                </TableCell> */}
    </TableRow>
  )
}
