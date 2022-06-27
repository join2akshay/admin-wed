import { Box, Button, Dialog, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'

import { SketchPicker } from 'react-color';
import { toast } from "react-toastify";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

// import Files from "react-butterfiles";
import ConfirmDialog from '../../delete';
import { AdminAxios } from '../../actions/utils';
import Header from '../../Nav';


export default function CategoryListAdmin() {
const [allData, setallData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const[selectCategory,setSelectCateogry]=useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setSelectCateogry(null)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

useEffect(() => {
getList()

}, [])

const getList=()=>{
  AdminAxios.get(`/category`)
    .then((response) => {
      console.log(response.data)
      setallData(response.data)
      // dispatch(loaderMasterStopAction());
    })
    .catch((err) => {
      // dispatch(loaderMasterStopAction());
    });

};

  const deletePost =(id)=>{
    AdminAxios.delete(`/category/${selectCategory.id}`)
      .then((response) => {
        setSelectCateogry(null)

        getList();
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });

}

  const editCategory=(data)=>{
    setSelectCateogry(data)
    handleClickOpen()
  }

  return (
    <div>
      <Header />

      <Grid container style={{marginTop:'5rem'}}>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handleClickOpen2} style={{ background: '#FFD64E',color:'black',fontWeight:'600' }}>
            Add New Category
          </Button>
        </Grid>
      </Grid>



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
                <TableCell align="right"><img src={row.iconImage}/> </TableCell>
                <TableCell align="right"><img src={row.image} width='125' height='125' /> </TableCell>

                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">  <IconButton aria-label="delete" onClick={() =>{setSelectCateogry(row); setOpenD(true)}}>
                  <DeleteIcon />
                </IconButton>
                  <ConfirmDialog
                    title="Delete Post?"
                    open={openD}
                    setOpen={setOpenD}
                    onConfirm={deletePost}
                  >
                    Are you sure you want to delete this post?
                  </ConfirmDialog>
                </TableCell>
                <TableCell align="right" onClick={()=>editCategory(row)}>
                  <Button variant="outlined" size="medium">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleDialog

        selectCategory={selectCategory}
        open={open}
        onClose={handleClose}
        getList={getList}
      />
    </div>
  )
}


function SimpleDialog(props) {
  const { onClose, open, selectCategory,getList } = props;
  console.log(selectCategory)
  const [bgColor, setBgColor] = useState(selectCategory ? selectCategory.background : null)

  const [category, setCategory]=useState(
    selectCategory ? selectCategory :
    {
      "isDeleted": false,
      "name": "",
      "image": "",
      "iconImage": "",
      "description": "",
      "background": "",
      "id": ""
    }
  )

  useEffect(() => {

    if(selectCategory){

      setCategory(selectCategory)
    }else{
      setCategory(null)

    }


  }, [selectCategory])


  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const update=()=>{
    AdminAxios.put(`/category/${category.id}`, {update: category })
      .then((response) => {
        console.log(response.data)
        onClose()
        getList()
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  }

  const create =()=>{
    AdminAxios.post(`/category`, { document:category })
      .then((response) => {
        console.log(response.data)
        onClose()
        getList()

        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  }

  const handleSuccess=()=>{

    if(category.id){
      update()
    }else{
      create()
    }


  }

  const handleChangeComplete = (color) => {
    setCategory({ ...category, background: color.hex });
  };

  const handlefilechange = async (e,type) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ythigm1q');
    data.append('cloud_name', 'dhdv5nqpb');
    const resp = await toast.promise(
      axios.post(
        `https://api.cloudinary.com/v1_1/dhdv5nqpb/image/upload/?api_key=${process.env.REACT_APP_CLOUDINARY_KEY
        }&timestamp=${Date.now()}`,
        data,
      ),
      {
        pending: 'Uploading profile image',
        success: 'Uploaded 👌',
        error: 'Upload failed 🤯',
      },
    );
    if(type== 'image'){
      setCategory({ ...category, image: resp?.data?.secure_url });

    }else{

      setCategory({ ...category, iconImage: resp?.data?.secure_url });
    }
  };



  return (
    <Dialog onClose={handleClose} open={open} style={{overFlowX:'hidden'}}>
      <DialogTitle>Add New Category</DialogTitle>
      <Divider/>
      <Grid container style={{margin:'1rem'}} >
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Name
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField id="standard-basic" label="Name" variant="standard" placeholder='Enter vendor Name'value={category?.name} onChange={(e) => { setCategory({ ...category, name: e.target.value }); }} />
          </Box>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container style={{margin:'1rem'}}>
        <Grid item xs={12}>
          <Box>
            <label>
              Icon Image
            </label>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <div className="image_wrapper">
              <img
              width='125'
              height='125'

                className="profile_image"
                src={
                  category?.iconImage ||
                  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                }
                alt="profile"
              />
              <input
                id="standard-password-input"
                type="file"
                variant="standard"
                fullWidth
                style={{ marginBottom: '15px' }}
                onChange={(e) => handlefilechange(e,'')}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{margin:'1rem'}}>
        <Grid item xs={12}>
          <Box>
            <label>
              Image
            </label>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <div className="image_wrapper">
              <img
                width='125'
                height='125'
                className="profile_image"
                src={
                  category?.image ||
                  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                }
                alt="profile"
              />
              <input
                id="standard-password-input"
                type="file"
                variant="standard"
                fullWidth
                style={{ marginBottom: '15px' }}
                onChange={(e) => handlefilechange(e,'image')}
              />
            </div>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid container style={{margin:'1rem'}}>
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Description
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField id="standard-basic" value={category?.description} label="Description" variant="standard" onChange={(e) => { setCategory({ ...category, description: e.target.value }); }} />
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{margin:'1rem'}}>
        <Grid item xs={12}>
          <Box>
            <label>
              Background Color
            </label>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <SketchPicker
              color={category?.background}
              onChangeComplete={handleChangeComplete}
            />
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid container style={{margin:'1rem'}} justifyContent="center">
        <Grid item xs={12} justifyContent="center">
          <Box display='flex' justifyContent="center">
            <Button onClick={handleSuccess} variant="contained" style={{ background: '#FFD64E', color: 'black',fontWeight:'600' }}>
              Add
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Dialog>
  );
}
