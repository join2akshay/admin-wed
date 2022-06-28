import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { AdminAxios } from '../actions/utils';
import { SketchPicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../delete";
import { AdminAxios } from "../../actions/utils";
import Header from "../../Nav";

// import Files from "react-butterfiles";

export default function VendorList() {
  const [allData, setallData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const [selectCategory, setSelectCateogry] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setSelectCateogry(null);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    AdminAxios.get(`/vendor`)
      .then((response) => {
        console.log(response.data[0].data);
        setallData(response.data[0].data);
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  };

  const deletePost = (id) => {
    console.log(selectCategory);
    AdminAxios.delete(`/vendor/${selectCategory._id}`)
      .then((response) => {
        setSelectCateogry(null);

        getList();
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  };

  const editCategory = (data) => {
    setSelectCateogry(data);
    handleClickOpen();
  };

  return (
    <div>
      <Header />

      <Grid container style={{ marginTop: "4rem" }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleClickOpen2}
            style={{
              background: "#FFD64E",
              color: "black",
              fontWeight: "600",
              marginTop: "1rem",
            }}
          >
            Add New Vendor
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="right">Email</TableCell>
              {/* <TableCell align="right">Image</TableCell> */}
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Satus</TableCell>

              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name?.first} {row?.name?.last}
                </TableCell>
                <TableCell align="right">{row?.email} </TableCell>
                {/* <TableCell align="right">
                  <img
                    src={
                      row?.profileUrl ||
                      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    width="100"
                    height="100"
                  />{" "}
                </TableCell> */}

                <TableCell align="right">{row?.phone}</TableCell>
                <TableCell align="right">{row?.isBanned ? 'Unactive' : 'Active'}</TableCell>
                <TableCell align="right">{row?.roles}</TableCell>
                <TableCell align="right">
                  {" "}
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setSelectCateogry(row);
                      setOpenD(true);
                    }}
                  >
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
                {/* <TableCell align="right" onClick={() => editCategory(row)}>
                  <Button variant="outlined" size="medium">
                    Edit
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleDialog
        selectCategory={selectCategory}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

function SimpleDialog(props) {
  const { onClose, open, selectCategory } = props;
  console.log(selectCategory);
  const [bgColor, setBgColor] = useState(
    selectCategory ? selectCategory.background : null
  );

  const [category, setCategory] = useState(
    selectCategory
      ? selectCategory
      : { name: { firstL: "", last: "" }, email: "" }
  );

  useEffect(() => {
    if (selectCategory) {
      setCategory(selectCategory);
    } else {
      setCategory({ name: { firstL: "", last: "" }, email: "" });
    }
  }, [selectCategory]);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const update = () => {
    AdminAxios.put(`/vendor/${category.id}`, { update: category })
      .then((response) => {
        console.log(response.data);
        onClose();
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        // dispatch(loaderMasterStopAction());
      });
  };

  const create = () => {
    AdminAxios.post(`/vendor`, { document: category })
      .then((response) => {
        toast.success(response.data.message)
        onClose();
        // dispatch(loaderMasterStopAction());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSuccess = () => {
    if (category.id) {
      update();
    } else {
      create();
    }
  };

  const handleChangeComplete = (color) => {
    setCategory({ ...category, background: color.hex });
  };

  const handlefilechange = async (e, type) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ythigm1q");
    data.append("cloud_name", "dhdv5nqpb");
    const resp = await toast.promise(
      axios.post(
        `https://api.cloudinary.com/v1_1/dhdv5nqpb/image/upload/?api_key=${
          process.env.REACT_APP_CLOUDINARY_KEY
        }&timestamp=${Date.now()}`,
        data
      ),
      {
        pending: "Uploading profile image",
        success: "Uploaded 👌",
        error: "Upload failed 🤯",
      }
    );
    if (type == "image") {
      setCategory({ ...category, image: resp?.data?.secure_url });
    } else {
      setCategory({ ...category, iconImage: resp?.data?.secure_url });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{ overFlowX: "hidden" }}>
      <DialogTitle>Add New Vendor</DialogTitle>
      <Divider />
      <Grid container style={{ margin: "1rem" }}>
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Name
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              id="standard-basic"
              label="First name"
              variant="standard"
              placeholder="Enter vendors first Name"
              name="firstL"
              value={category?.name.firstL}
              onChange={(e) =>
                setCategory((prevState) => ({
                  ...prevState,
                  name: {
                    ...prevState.name,
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ margin: "1rem" }}>
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Name
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              id="standard-basic"
              label="First name"
              variant="standard"
              placeholder="Enter vendors first Name"
              name="last"
              value={category?.name.last}
              onChange={(e) =>
                setCategory((prevState) => ({
                  ...prevState,
                  name: {
                    ...prevState.name,
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ margin: "1rem" }}>
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Description
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              id="standard-basic"
              value={category?.email}
              label="Email"
              variant="standard"
              name="email"
              onChange={(e) => {
                setCategory({ ...category, email: e.target.value });
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ margin: "1rem" }}>
        <Grid item xs={12}>
          <Box>
            {/* <label>
              Description
            </label> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              id="standard-basic"
              value={category?.phone}
              label="Phone"
              variant="standard"
              name="phone"
              onChange={(e) => {
                setCategory({ ...category, phone: e.target.value });
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ margin: "1rem" }} justifyContent="center">
        <Grid item xs={12} justifyContent="center">
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleSuccess}
              variant="contained"
              style={{
                background: "#FFD64E",
                color: "black",
                fontWeight: "600",
              }}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}
