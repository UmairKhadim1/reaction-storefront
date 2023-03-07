import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme,styled  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SellerProfileItems from './SellerProfileItems';
import ProfileAddressBook from "components/ProfileAddressBook";
import ProfileOrders from "components/ProfileOrders";
import CompleteProfile from 'components/CompleteProfile';
import NewOrderItems from '../SellerProfile/newOrderItems';
import OrderHistoryItems from "./OrderHistoryItems";
import {Badge} from '@material-ui/core';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -13,
    top: 11,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color: "#FFFFFF",
    background: "#D8213B",
  },
}));
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
   const filterPandingOrder = () => {
     let count=0;
     props.orderFulfillment && props.orderFulfillment.map((data,i)=>{
    if(data.status != "Completed"){
      if(data.status != "coreOrderWorkflow/canceled"){
        count++;
        return data;
      }
       
    }
  });
  return count;
   }
  return (
    <div className={classes.root}>
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        {/* className="sellerProfile__header" */}
      <AppBar position="static" color="default"  className="sellerProfile__header">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className="buyerProfile__tabPane" label="Listings" {...a11yProps(0)} /> 
          <Tab className="buyerProfile__tabPane" label={ <React.Fragment> <StyledBadge badgeContent={ filterPandingOrder()} color="secondary">pending Orders</StyledBadge></React.Fragment>} {...a11yProps(1)} />
          <Tab className="buyerProfile__tabPane" label="Orders History" {...a11yProps(2)} />
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
        <SellerProfileItems items={props.items} {...props}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <NewOrderItems items={props.orderFulfillment} currentUser={props.currentUser}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <OrderHistoryItems items={props.orderFulfillment} />
        </TabPanel>
      {/* </SwipeableViews> */}
    </div>
  );
}
