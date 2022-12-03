import { Box, Button, Dialog, DialogTitle, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Grid, Card, CardContent, Typography, CardActions } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import { AdminAxios } from '../actions/utils';
import { SketchPicker } from 'react-color';
import { toast } from "react-toastify";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../delete';
import { AdminAxios } from '../../actions/utils';
import Header from '../../Nav';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select';
import Loader from '../Loader';


// import Files from "react-butterfiles";

export default function ItemList() {
  const [allData, setallData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [openV, setOpenV] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [selectCategory, setSelectCateogry] = useState(null)
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

  const handleCloseV = (value) => {
    setOpenV(false);
  };

  useEffect(() => {
    getList()

  }, [])

  const getList = () => {
    setLoading(true)
    AdminAxios.get(`/product`)
      .then((response) => {
        console.log(response.data[0].data)
        setallData(response.data[0].data)
        setLoading(false)
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        setLoading(false)
        // dispatch(loaderMasterStopAction());
      });

  };

  const deletePost = (id) => {
    setLoading(true)
    console.log(selectCategory)
    AdminAxios.delete(`/product/${selectCategory._id}`)
      .then((response) => {
        setSelectCateogry(null)
        setLoading(false)
        getList();
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        setLoading(false)
        // dispatch(loaderMasterStopAction());
      });

  }

  const editCategory = (data) => {
    setSelectCateogry(data)
    handleClickOpen()
  }

  return (
    <div>
      <Header />

      <Grid container style={{ marginTop: '5rem' }}>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handleClickOpen2} style={{ background: '#FFD64E', color: 'black', fontWeight: '600' }}>
            Add New Item
          </Button>
        </Grid>
      </Grid>

<Grid container>

  {
    allData.map((item=>{
      return (
        <>
          <Grid xs={12} sm={3} md={3} lg={3} marginLeft={2} marginTop={2}>
            <Card >
              <CardContent>
                <Typography variant="h5" sx={{ fontSize: 16,fontWeight:600 }} color="text.secondary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="div">
                  {item.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Stock - {item.stock}
                </Typography>
                <Typography variant="body2">
                  Buying Price - {item.buyingPrice}
                  <br />

                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>{setSelectCateogry(item);setOpenV(true)} }>Open</Button>
                <Button size="small" onClick={()=>editCategory(item)}>Edit</Button>

                <Button size="small" onClick={() => { setSelectCateogry(item); setOpenD(true) }}>Delete</Button>

              </CardActions>
            </Card>

          </Grid>
          {
        loading &&
        <Loader/>
     
      }
        </>
      )
    }))
  }


</Grid>



      <SimpleDialog

        data={selectCategory}
        open={open}
        onClose={handleClose}
        getList={getList}
        loading={loading}
        setLoading={setLoading}
      />
      <Viewer

        data={selectCategory}
        open={openV}
        onClose={handleCloseV}
      />
      <ConfirmDialog
        title="Delete Product?"
        open={openD}
        setOpen={setOpenD}
        onConfirm={deletePost}
      >
        Are you sure you want to delete this Product?
      </ConfirmDialog>
    </div>

  )
}


function SimpleDialog(props) {
  const { onClose, open, data,getList,loading,setLoading } = props;
  console.log(data)
  const [bgColor, setBgColor] = useState(data ? data.background : null)
  const [allCat, setallCat] = useState([])
  const [allSubCat, setallSubCat] = useState([])

  const [cat, setCat] = useState('')
  const [subCat, setSubCat] = useState('')


  const [category, setCategory] = useState(
    data ? data :
      {

        "name": "",
        "description": "",
        "categoryId": "",
        "subCategoryId": "",
        "priceByDays": {
          "10": null,
          "20": null,
          "30": null
        },
        "priceByQuantity": {
          "10": null,
          "20": null,
          "30": null
        },
        "stock": "",
        "image": {
          "main": "",
          "sec1": "",
          "sec2": "",
          "sec3": "",
          "sec4": ""
        },
        "spec": {
          "Color": "",
          "Material": "",
          "Appearance": ""
        },
        "about": "",
        "buyingPrice": null,
        "rating": "",
        "isDeleted": false
      }
  )

  const [image, setimage] = useState({

      "main": "",
      "sec1": "",
      "sec2": "",
      "sec3": "",
      "sec4": ""

})

  useEffect(() => {
    getSubCat()
    getCatList()

    if (data) {

      setCategory(data)
      setimage(data.image)
      setCat(data.categoryId)
      setSubCat(data.subCategoryId)
    } else {
      setCategory({

        "name": "",
        "description": "",
        "categoryId": "",
        "subCategoryId": "",
        "priceByDays": {
          "10": null,
          "20": null,
          "30": null
        },
        "priceByQuantity": {
          "10": null,
          "20": null,
          "30": null
        },
        "stock": "",
        "image": {
          "main": "",
          "sec1": "",
          "sec2": "",
          "sec3": "",
          "sec4": ""
        },
        "spec": {
          "Color": "",
          "Material": "",
          "Appearance": ""
        },
        "about": "",
        "buyingPrice": null,
        "rating": "",
        "isDeleted": false
      })



    }


  }, [data])

  const updatePriceBYQ = (type, e) => {
    let tempData = category;
    tempData.priceByQuantity[type] = e.target.value
    setCategory(tempData)
  }

  const updatePriceBYD = (type, e) => {
    let tempData = category;
    // console.log(type)
    // console.log(e.target.value)
    // console.log(tempData)
    tempData.priceByDays[type] = e.target.value
    setCategory(tempData)
  }
  const updatePriceBYSpec = (type,e) => {
    let tempData = category;
    tempData.spec[type] = e.target.value
    console.log(category?.spec.Appearance)



    // setCategory(tempData)
  }

  const updateImage = (type, e) => {
    let tempData = category;
    tempData.image[type] = e
    setCategory(tempData)
  }

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const update = () => {
    setLoading(true)
    AdminAxios.put(`/product/${category._id}`, { update:category })
      .then((response) => {
        console.log(response.data)
        setLoading(false)
        getList()
        onClose()
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message);

        // dispatch(loaderMasterStopAction());
      });
  }

  const create = () => {
    setLoading(true)
    AdminAxios.post(`/product`, { document:category })
      .then((response) => {
        console.log(response.data)
        setLoading(false)
        getList()
        onClose()
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message);

        // dispatch(loaderMasterStopAction());
      });
  }

  const handleSuccess = () => {

    if (category.id) {
      update()
    } else {
      create()
    }


  }
  useEffect(() => {

    getSubCat()
    setCategory({ ...category, categoryId: cat })

  }, [cat])
  useEffect(() => {

    getSubCat()
    setCategory({ ...category, subCategoryId: subCat })

  }, [subCat])

  const getSubCat=()=>{
    AdminAxios.get(`/product`)
      .then((response) => {
        console.log(response.data)
        let tempdata = [];

        response.data[0].data.map(item => {
          tempdata.push({ label: item.name, value: item._id })
        })
        console.log(tempdata)

        setallSubCat(tempdata)

        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });

  }

  const handleChangeComplete = (color) => {
    setCategory({ ...category, background: color.hex });
  };

  const getCatList = () => {
    AdminAxios.get(`/category`)
      .then((response) => {
        console.log(response.data)
        let tempdata=[];

        response.data.map(item=>{
          tempdata.push({ label: item.name, value: item.id })
        })

        setallCat(tempdata)
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });

  };

  const handlefilechange = async (e, type) => {
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
    // if (type == 'image') {
    //   setCategory({ ...category, image: resp?.data?.secure_url });

    // } else {

    //   setCategory({ ...category, iconImage: resp?.data?.secure_url });
    // }
    updateImage(type, resp?.data?.secure_url)
    setimage({...image, [type]: resp?.data?.secure_url})
  };

  const handleChangeAllg = ({ target: { value, name } }) => {
    setCategory((prevState) => ({
      ...prevState,
      spec: {
        ...prevState.spec,
        [name]: value,
      },
    }));
  };

  const handleSave=()=>{
   if(category._id){
    update();
   }else{
    console.log(category)
    create()
   }
  }

  return (
    <Dialog onClose={handleClose} open={open} style={{ overFlowX: 'hidden' }}>
      <DialogTitle>Add new product</DialogTitle>
      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          {/* <label>
            Description
          </label> */}

          {/* <EditIcon onCLick={}/> */}

        </Grid>
        <Grid xs={12}>
          <label>
            <TextField id="standard-basic" label="Name" variant="standard" placeholder='Enter Name' value={category?.name} onChange={(e) => { setCategory({ ...category, name: e.target.value }); }} />
          </label>
        </Grid>
      </Grid>
      <Divider/>

      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          {/* <label>
            Description
          </label> */}

          {/* <EditIcon onCLick={}/> */}

        </Grid>
        <Grid xs={12}>
          <label>
            <TextField id="standard-basic" label="About" variant="standard" placeholder='Enter About' value={category?.about} onChange={(e) => { setCategory({ ...category, about: e.target.value }); }} />
          </label>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          {/* <label>
            Description
          </label> */}

          {/* <EditIcon onCLick={}/> */}

        </Grid>
        <Grid xs={12}>
          <label>
            <TextField id="standard-basic" label="Description" variant="standard" placeholder='Enter Description' value={category?.description} onChange={(e) => { setCategory({ ...category, description: e.target.value }); }} />
          </label>
        </Grid>
      </Grid>
      <Divider />


      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>

          <TextField id="standard-basic" type='number' label="Buying Price" variant="standard" placeholder='Enter Buying Price' value={category?.buyingPrice} onChange={(e) => { setCategory({ ...category, buyingPrice: e.target.value }); setCat(e.target.value)}} />

        </Grid>

      </Grid>
      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          <TextField id="standard-basic" type='number' label="Stock" variant="standard" placeholder='Enter Stock' value={category?.stock} onChange={(e) => { setCategory({ ...category, stock: e.target.value }); }} />
        </Grid>

      </Grid>
      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>

          <Select placeholder="Select category" options={allCat} value={
            allCat.filter(option =>
              option.value === cat)
          } onChange={(e)=>{setCategory({...category,categoryId:e.value});setCat(e.value)}}/>
          </Grid>
          </Grid>
      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>

          <Select placeholder="Select Combination" options={allSubCat} value={
            allSubCat.filter(option =>
              option.value === subCat)
          }  onChange={(e) => { setCategory({ ...category, subCategoryId: e.value }); setSubCat(e.value)}} />
        </Grid>
      </Grid>
      <Divider/>
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          <label>
            Price by quantity <br />
            <TextField id="standard-basic" type='number' label="Price for 10 items" variant="standard" placeholder='Enter Price for 10 items' value={category?.priceByQuantity[10]} onChange={(e) => updatePriceBYQ(10,e)} />
            <br />
            <TextField id="standard-basic" type='number' label="Price for 20 items" variant="standard" placeholder='Enter Price for 20 items' value={category?.priceByQuantity[20]} onChange={(e) => updatePriceBYQ(20, e)} />
            <br />
            <TextField id="standard-basic" type='number' label="Price for 30 items" variant="standard" placeholder='Enter Price for 30 items' value={category?.priceByQuantity[30]} onChange={(e) => updatePriceBYQ(30, e)} />
            <br />
          </label>
        </Grid>

      </Grid>
      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
          <label>
            Price by days <br />
            <TextField id="standard-basic" type='number' label="Price for 10 days" variant="standard" placeholder='Enter Price for 30 days' value={category?.priceByDays[10]} onChange={(e) => updatePriceBYD(10, e)} />
            <br />
            <TextField id="standard-basic" type='number' label="Price for 10 days" variant="standard" placeholder='Enter Price for 30 days' value={category?.priceByDays[20]} onChange={(e) => updatePriceBYD(20, e)} />
            <br />
            <TextField id="standard-basic" type='number' label="Price for 30 days" variant="standard" placeholder='Enter Price for 30 days' value={category?.priceByDays[30]} onChange={(e) => updatePriceBYD(30, e)} />
            <br />
          </label>
        </Grid>

      </Grid>
      <Divider />

      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12}>
    <label>

            Specification
    </label>
            <br />
          <TextField id="standard-basic" label="Appearance " variant="standard" placeholder='Enter Appearance' value={category?.spec.Appearance} name="Appearance" onChange={handleChangeAllg} />
            <br />
          <TextField id="standard-basic" label="Color " variant="standard" placeholder='Enter Color' value={category?.spec['Color']} name="Color" onChange={handleChangeAllg} />
            <br />
          <TextField id="standard-basic" label="Material " variant="standard" placeholder='Enter Material' name="Material" value={category?.spec['Material']} onChange={handleChangeAllg} />
            <br />

        </Grid>

      </Grid>
      <Divider />

      <Grid container >

        <Grid xs={2} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
          <div className="image_wrapper">
            <img
              width='125'
              height='125'
              className="profile_image"
              src={
                image.main ||
                'https://res.cloudinary.com/wedppy/image/upload/v1670059407/placeholder_eyey9k.png'
              }
              alt="profile"
            />

            <input
              id="standard-password-input"
              type="file"
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onChange={(e) => handlefilechange(e, 'main')}
            />
          </div>
        </Grid>
        <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
          <div className="image_wrapper">
            <img
              width='125'
              height='125'
              className="profile_image"
              src={
                image.sec1 ||
                'https://res.cloudinary.com/wedppy/image/upload/v1670059407/placeholder_eyey9k.png'
              }
              alt="profile"
            />


            <input
              id="standard-password-input"
              type="file"
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onChange={(e) => handlefilechange(e, 'sec1')}
            />
          </div>
        </Grid>
        <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
          <div className="image_wrapper">
            <img
              width='125'
              height='125'
              className="profile_image"
              src={
                image.sec2 ||
                'https://res.cloudinary.com/wedppy/image/upload/v1670059407/placeholder_eyey9k.png'
              }
              alt="profile"
            />
            <input
              id="standard-password-input"
              type="file"
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onChange={(e) => handlefilechange(e, 'sec2')}
            />
          </div>
        </Grid>
        <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
          <div className="image_wrapper">
            <img
              width='125'
              height='125'
              className="profile_image"
              src={
                image.sec3 ||
                'https://res.cloudinary.com/wedppy/image/upload/v1670059407/placeholder_eyey9k.png'
              }
              alt="profile"
            />
            <input
              id="standard-password-input"
              type="file"
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onChange={(e) => handlefilechange(e, 'sec3')}
            />
          </div>
        </Grid>
        <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
          <div className="image_wrapper">
            <img
              width='125'
              height='125'
              className="profile_image"
              src={
                image.sec4 ||
                'https://res.cloudinary.com/wedppy/image/upload/v1670059407/placeholder_eyey9k.png'
              }
              alt="profile"
            />
            <input
              id="standard-password-input"
              type="file"
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onChange={(e) => handlefilechange(e, 'sec4')}
            />
          </div>
        </Grid>

      </Grid>

      <Divider />
      <Grid container style={{ margin: '1rem' }}>
        <Grid xs={12} display='flex' justifyContent='center'>
          <Button variant='contained' onClick={handleClose} style={{ background: '#FFD64E', color: 'black', fontWeight: '600' ,marginRight:'1rem'}}>
            Close
          </Button>
          <Button variant='contained' onClick={handleSave} style={{ background: '#FFD64E', color: 'black', fontWeight: '600' }}>
            Save
          </Button>
        </Grid>
      </Grid>
      {
        loading &&
        <Loader/>
     
      }
    </Dialog>
  );
}


const Viewer = ({ data, onClose ,open})=>{
  const [EditName, setEditName] = useState(false)
  const [EditPrice, setEditPrice] = useState(false)
  const [EditStock, setEditStock] = useState(false)
  const [EditPQ, setEditPQ] = useState(false)
  const [EditPD, setEditPD] = useState(false)
  const [EditSpec, setEditSpec] = useState(false)

  const handleClose = () => {
    onClose();
  };

  return(
    <>

      <Dialog onClose={handleClose} open={open} style={{ overFlowX: 'hidden' }}>
        <DialogTitle>{data?.name}</DialogTitle>
        <Divider />

        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Description
            </label>

            {/* <EditIcon onCLick={}/> */}

          </Grid>
          <Grid xs={12}>
            <label>
              {data?.description}
            </label>
          </Grid>
        </Grid>
        <Divider />

        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Buying Price - {data?.buyingPrice}
            </label>
          </Grid>

        </Grid>
        <Divider />
        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Stock - {data?.stock}
            </label>
          </Grid>

        </Grid>
        <Divider />

        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Price by quantity <br />
              10 - Rs.{data?.priceByQuantity['10']}
              <br />
              20 - Rs.{data?.priceByQuantity['20']}
              <br />
              30 - Rs.{data?.priceByQuantity['30']}
              <br />
            </label>
          </Grid>

        </Grid>
        <Divider />
        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Price by days <br />
              10 - Rs.{data?.priceByDays['10']}
              <br />
              20 - Rs.{data?.priceByDays['20']}
              <br />
              30 - Rs.{data?.priceByDays['30']}
              <br />
            </label>
          </Grid>

        </Grid>
        <Divider />

        <Grid container style={{ margin: '1rem' }}>
          <Grid xs={12}>
            <label>
              Specification<br />
              Appearance - Rs.{data?.spec.Appearance}
              <br />
              Color - Rs.{data?.spec.Color}
              <br />
              Material - Rs.{data?.spec.Material}
              <br />
            </label>
          </Grid>

        </Grid>
        <Divider />

        <Grid container >

          <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
            <img src={data?.image.main} width="125" height="125"/>
            <p>
              Image 1
            </p>
          </Grid>
          <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
            <img src={data?.image.sec1} width="125" height="125"/>
            <p>
              Image 2
            </p>
          </Grid>
          <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
            <img src={data?.image.sec2} width="125" height="125"/>
            <p>
              Image 3
            </p>
          </Grid>
          <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
            <img src={data?.image.sec3} width="125" height="125"/>
            <p>
              Image 4
            </p>
          </Grid>
          <Grid xs={3} marginLeft={4} marginTop={4} display='flex' alignItems="center" flexDirection="column">
            <img src={data?.image.sec4} width="125" height="125"/>
            <p>
              Image 5
            </p>
          </Grid>

        </Grid>

        <Divider/>
        <Grid container style={{margin:'1rem'}}>
          <Grid xs={12} display='flex' justifyContent='center'>
            <Button variant='contained' onClick={handleClose}>
    Close
            </Button>
          </Grid>
        </Grid>
      
    </Dialog>
    </>
  )
}
