import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddressBook from "@reactioncommerce/components/AddressBook/v1";
import withAddressBook from "containers/address/withAddressBook";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import ErrorPage from "../../pages/_error";
import CustomAddressBook from "./CustomAddressBook";
const styles = (theme) => ({
  profileAddressBookTitle: {
    marginBottom: theme.spacing(4)
  }
});

class ProfileAddressBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      accountAddressBook : {
        addressBook: []
      },
    }
  }
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };
  componentDidMount(){
    const {
      authStore: { account: { addressBook } },
    
    } = this.props;
    const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];
    let accountAddressBook = {
      addressBook: addresses
    };
    this.setState({accountAddressBook:accountAddressBook})
  }
  renderAddressBook() {
   
    const {
      authStore: { account: { addressBook } },
      onAddressAdded,
      onAddressEdited,
      onAddressDeleted
    } = this.props;
    // Use relayConnectionToArray to remove edges / nodes levels from addressBook object
    const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];

    // Create data object to pass to AddressBook component
    
    // let accountAddressBook = {
    //   addressBook: addresses
    // };
   
     const handleOnAddressAdded =async (val) => {
     
          const res = await onAddressAdded(val);
          const newArray = [...addresses]
          newArray.push(res.data.addAccountAddressBookEntry.address);
         const   accountAddressBook = {
            addressBook: newArray
          };
           this.setState({accountAddressBook:accountAddressBook});
         
     }
     const handleOnEditAddress =async (addId, update) =>{
      const res = await onAddressEdited(addId,update);
     
      const newArray = this.state.accountAddressBook.addressBook.map((item,i)=>{
          if(item != null){
            if(item._id == res.data.updateAccountAddressBookEntry.address._id){
              return res.data.updateAccountAddressBookEntry.address;
            }
          }
            return item
      })
      const   accountAddressBook = {
        addressBook: newArray
      };
       this.setState({accountAddressBook:accountAddressBook});
     }
     const handleOnDeleteAddress =async (addId) =>{
      const res = await onAddressDeleted(addId);
     
      const newArray = this.state.accountAddressBook.addressBook.filter((item,i)=>{
          if(item != null){
            if(item._id != res.data.removeAccountAddressBookEntry.address._id){
              return item
            }
          }
      })
      const   accountAddressBook = {
        addressBook: newArray
      };
       this.setState({accountAddressBook:accountAddressBook});
     }
    return (
      // <AddressBook
      //   account={accountAddressBook}
      //   onAddressAdded={onAddressAdded}
      //   onAddressEdited={onAddressEdited}
      //   onAddressDeleted={onAddressDeleted}
      // />
      <CustomAddressBook
      account={this.state.accountAddressBook}
      onAddressAdded={(val)=>handleOnAddressAdded(val)}
      onAddressEdited={(addId, update)=>handleOnEditAddress(addId, update)}
      onAddressDeleted={(addId)=>handleOnDeleteAddress(addId)}
      isSeller={this.props.isSeller}
      />
    );
  }

  render() {
    const { authStore: { account }, classes, shop } = this.props;

    if (account && !account._id) return <ErrorPage shop={shop} subtitle="Not Found" />;

    return (
      <Grid className={classes.profileAddressBookContainer} container>
        <Grid className={classes.profileAddressBookTitle} item xs={12} md={12}>
          {/* <Typography variant="h6">Address Book</Typography> */}
        </Grid>
        {this.renderAddressBook()}
      </Grid>
    );
  }
}

export default withStyles(styles)(withAddressBook(inject("authStore", "uiStore")(ProfileAddressBook)));
