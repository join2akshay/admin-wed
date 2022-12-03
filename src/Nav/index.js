import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, Link, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LoginIcon from '@mui/icons-material/Login';



import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './style.css';



const headersData = [
  {
    label: 'Listings',
    href: '/listings',
  },
  {
    label: 'Mentors',
    href: '/mentors',
  },
  {
    label: 'My Account',
    href: '/account',
  },
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    label: 'My Oders',
    href: '/orders',
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#FFD64E !important',
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 'bold !important',
    color: 'black',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    color: 'black',

    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '0',
  },
  navItem1: {
    display: 'flex',
  },
  navItem2: {
    listStyle: 'none',
    marginLeft: '0.75rem !important',
    fontSize: '1.1rem',
    textDecoration:'none !important',
    color:'black !important',
    cursor:'pointer'
  },
}));

export default function Header() {


  // const navigate = useNavigate();
  const { header, logo, menuButton, toolbar, drawerContainer, navItem1, navItem2 } = useStyles();
  const [logindrawer, setloginDrawer] = useState(false);
  const [locationdrawer, setlocationDrawer] = useState(false);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    drawerLoginOpen: false,
  });

  const { mobileView, drawerOpen, drawerLoginOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);



  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>
          <ul className={navItem1}>
            <Link className={navItem2} component={RouterLink} to="/category">Category</Link>
            {/* <Link className={navItem2} component={RouterLink} to="/subcategory">Sub-Category</Link> */}

            <Link className={navItem2} component={RouterLink} to="/item">Products</Link>
            <Link className={navItem2} component={RouterLink}  to="/user">User</Link>
            <Link className={navItem2} component={RouterLink} to="/vendor">Vendor</Link>
            <Link className={navItem2} component={RouterLink} to="/order">Order</Link>
            <Link className={navItem2} component={RouterLink} to="/query">Query</Link>
            <Link className={navItem2} component={RouterLink} to="/">Logout</Link>



          </ul>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));

    const handleLoginDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerLoginOpen: true }));
    const handleLoginDrawerClose = () => setState((prevState) => ({ ...prevState, drawerLoginOpen: false }));

    const handleLogout = () => {
      // dispatch(logoutUser());
      setState({ ...state, drawerOpen: false });
    };

    const LogoutComponent = () => {
      // return <div onClick={() => handleLogout()}>Logout</div>;
    };

    return (
      <Toolbar>
        {/* <Login drawer={logindrawer} toggleDrawer={setloginDrawer} /> */}
        {/* <LocationAvailability drawer={locationdrawer} toggleDrawer={setlocationDrawer} /> */}
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon style={{ color: 'black' }} />
        </IconButton>
        {/* <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: () => setlocationDrawer(true),
          }}
        >
          <LocationOnIcon style={{ color: 'black' }} />
        </IconButton> */}
        {/* <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices(LogoutComponent)}</div>
        </Drawer> */}
        <Drawer
          {...{
            anchor: 'bottom',
            open: drawerLoginOpen,
            onClose: handleLoginDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices(LogoutComponent)}</div>
        </Drawer>

        <div>{femmecubatorLogoMobo}</div>



      </Toolbar>
    );
  };

  const getDrawerChoices = (LogoutComponent) => {
    return (
      <>
        <div>

          <div>
            <ul className="flex list">
              <li className="flex list-item">

                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/category" style={{ textDecoration: 'none', color: 'black' }}>
                 Category
                  </Link>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </div>
              </li>

              <li className="flex list-item">

                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/product" style={{ textDecoration: 'none', color: 'black' }}>
                    Product
                  </Link>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </div>
              </li>
              <li className="flex list-item">

                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/user" style={{ textDecoration: 'none', color: 'black' }}>
                    User
                  </Link>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </div>
              </li>
              <li className="flex list-item">

                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/vendor" style={{ textDecoration: 'none', color: 'black' }}>
                    Vendor
                  </Link>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </div>
              </li>
              <li className="flex list-item">

                <div className="flex" style={{ justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/order" style={{ textDecoration: 'none', color: 'black' }}>
                    Order
                  </Link>
                  <ArrowForwardIosIcon style={{ color: 'black' }} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
    // return headersData.map(({ label, href }) => {
    //   return (
    //     <Link
    //       {...{
    //         component: RouterLink,
    //         to: href,
    //         color: 'inherit',
    //         style: { textDecoration: 'none' },
    //         key: label,
    //       }}
    //     >
    //       <MenuItem>{label}</MenuItem>
    //     </Link>
    //   );
    // });
  };

  const femmecubatorLogoMobo = (
    <Typography variant="h6" component="h1" className={logo} style={{ width: '69vw' }} >
      WEDPPY
    </Typography>
  );

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo} >
      WEDPPY
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: 'inherit',
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>{mobileView ? displayMobile() : displayDesktop()}</AppBar>
    </header>
  );
}

const LoginSignupButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'white',
  fontWeight: 700,
  minWidth: '9rem',
  borderRadius: 10,
  padding: '0.6rem',
  minHeight: '4rem',
  fontSize: '0.7rem',
  '&:hover': {
    backgroundColor: 'white',
  },
  textDecoration: 'none',
  marginTop: '1.5rem',
}));
