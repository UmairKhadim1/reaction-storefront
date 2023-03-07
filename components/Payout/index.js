import React, {useState,useEffect} from 'react'
import WalletCards from './WalletCards';
import AddCard from "./AddCard";
import {Grid, Button} from "@material-ui/core";
import useAddPayout from "hooks/payout/useAddPayout";
import useUpdatePayout from "hooks/payout/useUpdatePayout";
import {  toast } from 'react-toastify';
export default function Index(props) {
    const [addPayoutEntry] = useAddPayout();
    const [updatePayoutEntry] = useUpdatePayout();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editCardData, setEditCardData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [AccountBook,setAccountBook] = useState([]);
    useEffect(()=>{
         setAccountBook(props.AccountBook);
    },[]);
    const handleBack = () => {
        setShowAddForm(false);
        setIsEdit(false);
    }
    const notify = (val) => toast(val,{
        hideProgressBar: true
      });
    const handleAddPayout =async (accountNumber,accountTitle,accountSwiftCode,userId,isCardActive) => {
           const res = await addPayoutEntry(accountNumber,accountTitle,accountSwiftCode,userId,isCardActive);
           
           notify("account info auccessfully added");
           setShowAddForm(false);
           const prevBook = [...AccountBook];
           prevBook.push(res.data.updateAccountpayBookEntry);
           setAccountBook(prevBook);
    }
    const handleEditCardEnable = (val) => {
        
        setEditCardData(val);
        setIsEdit(true);
        setShowAddForm(true);
    }
    const handleUpdatePayout =async (accountNumber,accountTitle,accountSwiftCode,userId,CardId,isCardActive) => {
        const res = await updatePayoutEntry(accountNumber,accountTitle,accountSwiftCode,userId,CardId,isCardActive);
        
        setShowAddForm(false);
        setIsEdit(false);
        notify("account info auccessfully updated");
        const updatedBook = AccountBook.map((val,i)=>{
            if(CardId == val._id){
                 return {
                     ...val,
                     AccountTitle:accountTitle,
                     AccountNo:accountNumber,
                     swiftCode:accountSwiftCode,
                     isActive:isCardActive
                 }
            }
            return val;
        })
        setAccountBook(updatedBook);
 }
 
    return (
        <div className="wallet">
            <Grid container>
            <Grid xs={12} >
           { !showAddForm && <Button onClick={()=>setShowAddForm(true)}  className="customAddressBook__addAddress" style={{marginLeft:"auto"}}>
          <img src="/icons/uploadFileIcon.png" />
          <span> Add New account</span>
          </Button>  }
                </Grid>
                </Grid>
          {  showAddForm ?
            <Grid container className="wallet__row">
               <Grid item xs={12} md={10} lg={6}>
                        <AddCard userId={props.account} back={handleBack} editCardData={isEdit ?  editCardData: false} handleAddPayout={handleAddPayout} handleUpdatePayout={handleUpdatePayout}/>
                   </Grid>
            </Grid>:
            <WalletCards AccountBook={AccountBook} setEditCardData={(val)=>handleEditCardEnable(val)}/>
            }
        </div>
    )
}
