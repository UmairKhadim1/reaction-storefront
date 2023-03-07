import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BuyerProfileHistoryItems from './BuyerProfileHistoryItems';
import ProfileOrders from "components/ProfileOrders";
import withAddressBook from "containers/address/withAddressBook";
import { withApollo } from "lib/apollo/withApollo";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import ProfileAddressBook from "components/ProfileAddressBook";
import  SellerProfileItems from '../SellerProfile/SellerProfileItems';
import WishListItem from "components/WishListItem";
import {GQL_URL} from "../../apiConfig";
import {Grid} from "@material-ui/core"
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
        <Box className="buyerProfile__tabpaneBox">
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

 function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [wishLists,setWishLists] =useState({});

  useEffect(()=>{
       if(props.shop){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.accessToken);
        var getWishListGraphql = JSON.stringify({
          query: `
          query WishlistByAccountId($accountId: ID!,$shopId:ID!) {
            wishlistByAccountId(accountId: $accountId,shopId:$shopId) {
              _id
                 account {
                   userId
                 }
                 items{
                   nodes {
                      _id
                      title
                      price{
                        displayAmount
                      }
                      imageURLs {
                        large
                      }
                      productConfiguration{
                        productVariantId
                      }
                   }
                 }
            }
          }
                `,
          variables: {
            accountId:props.account.userId,
            shopId:props.shop._id,
          },
        });
        var wishListRequestOptions = {
          method: "POST",
          headers: myHeaders,
          body: getWishListGraphql,
          redirect: "follow",
        };
        fetch(GQL_URL, wishListRequestOptions)
          .then((response) => response.text())
          .then((result) => {
            const dataList = JSON.parse(result).data.wishlistByAccountId
            dataList ?setWishLists(dataList) :setWishLists({})
            // resolve(JSON.parse(result).data);
          })
          .catch((error) => {
            // reject(error);
          });
       }
  },[props.accessToken,props.account])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
 const handleRemoveWishList = (wishlistItemIds,) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${props.accessToken}`);
    var removeWishListGraphql = JSON.stringify({
      query: `
      mutation RemoveWishlistItems($input: RemoveWishlistItemsInput!) {
        removeWishlistItems(input: $input) {
          wishlist {
            _id
         account {
           userId
         }
         items{
           nodes {
              _id
           }
         }
          }
        }
      }
            `,
      variables: {
        input:{
          wishlistItemIds:wishlistItemIds,
        clientMutationId:props.account.userId,
        wishlistId:wishLists._id}
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: removeWishListGraphql,
      redirect: "follow",
    };
    fetch(GQL_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
         const res =   JSON.parse(result).data.removeWishlistItems.wishlist;
         setWishLists({
              wishLists: res
            })
        // resolve(JSON.parse(result).data);
      })
      .catch((error) => {
        // reject(error);
      });

  }
  return (
    <div className={classes.root}>
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
      <AppBar position="static" color="default"  className="buyerProfile__header">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
        
  {/*  */}
  {/* <Tab className="buyerProfile__tabPane" label="Listings" {...a11yProps(0)} />   */}
  <Tab className="buyerProfile__tabPane" label="Order History" {...a11yProps(0)} />
  <Tab className="buyerProfile__tabPane" label="Wish List" {...a11yProps(1)} />
  {/* <Tab className="buyerProfile__tabPane" label="Panding Orders" {...a11yProps(2)} /> */}
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
         <ProfileOrders/>
        </TabPanel>
       <TabPanel value={value} index={1} dir={theme.direction}>
         {/* <ProfileOrders/> */}
         <Grid container>
        {Object.keys(wishLists).length>0 && wishLists.items.nodes.length>0 && wishLists.items.nodes.map((val,i)=>{
          return(
            <Grid  xs={12} md={3}>
           <WishListItem   {...val} onRemove={(wishId)=>handleRemoveWishList(wishId)}/>
           </Grid>
          )
        })}
         </Grid>
        </TabPanel>
       {/*   <TabPanel value={value} index={1} dir={theme.direction}>
        <ProfileAddressBook />
        </TabPanel> */}
     
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
         <NewOrderItems items={props.items} />
        </TabPanel> */}
      {/* </SwipeableViews> */}
    </div>
  );
}
export default withApollo()(withAddressBook(inject("authStore", "uiStore")(FullWidthTabs))); 
