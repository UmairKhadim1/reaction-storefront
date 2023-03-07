import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SellerProfileItems from './SellerProfileItems';
import ProfileAddressBook from "components/ProfileAddressBook";
import ProfileOrders from "components/ProfileOrders";
import CompleteProfile from 'components/CompleteProfile';
import Wallet from "../Payout";
import ShippingMethods from "components/ShippingMethods";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="sellerProfile__tabpaneBox">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        {/* className="sellerProfile__header" */}
      <AppBar position="static" color="default"  className="setting__header">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className="buyerProfile__tabPane" label="Address Book" {...a11yProps(0)} /> 
          <Tab className="buyerProfile__tabPane" label="Edit profile" {...a11yProps(1)} />
          <Tab className="buyerProfile__tabPane" label="Payout Accounts" {...a11yProps(2)} />
          <Tab className="buyerProfile__tabPane" label="Shipping Method" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      {/* <img src="/icons/filter.svg"/> */}
      </div>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ProfileAddressBook isSeller={props.isSeller}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <CompleteProfile {...props}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Wallet account={props.account} AccountBook={props.AccountBook}/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ShippingMethods shop={props.shop} account={props.userAccount} shippingMethods={props.shippingMethods}/>
        {/* <Wallet account={props.account} AccountBook={props.AccountBook}/> */}
        </TabPanel>
      {/* </SwipeableViews> */}
    </div>
  );
}
