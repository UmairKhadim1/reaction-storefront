import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
export default function AddCard(props) {
    const [accountNumber, setAccountNumber] = useState("");
    const [accountTitle, setAccountTitle] = useState("");
    const [accountSwiftCode, setAccountSwiftCode] = useState("");
    const [isCardActive, setIsCardActive] = useState(false);
    useEffect(()=>{
          if( props.editCardData ){
            setAccountNumber(props.editCardData.AccountNo);
            setAccountTitle(props.editCardData.AccountTitle);
            setAccountSwiftCode(props.editCardData.swiftCode);
            setIsCardActive(props.editCardData.isActive);
          }
    },[])
    const handleSubmit = () => {
        const data = {
            accountNumber, // numeric
            accountTitle,  // alpha
            accountSwiftCode   //alpha numeric
        }
        props.handleAddPayout(accountNumber,accountTitle,accountSwiftCode,props.userId,isCardActive);
        
    }
    const handleUpdate = () => {
        const data = {
            accountNumber, // numeric
            accountTitle,  // alpha
            accountSwiftCode,   //alpha numeric
            cardId: props.editCardData._id
        }
        props.handleUpdatePayout(accountNumber,accountTitle,accountSwiftCode,props.userId,props.editCardData._id,isCardActive);
        
    }
    const handleAccountNumber = (e) => {
        const value = e.target.value;
        const check = isNaN(Number(value))

        if (!check) {
            setAccountNumber(value);
        }
    }
    const handleAccountTitle = (e) => {
        const str = e.target.value;
        const check =  /^[a-zA-Z ]*$/.test(str);
        
        if (check) {
            setAccountTitle(str);
        }

    }
    const handleSwiftCode =(e) => {
        const value = e.target.value;
        const check = (/[^0-9a-zA-Z]/.test(value))
        
        if(!check){
            setAccountSwiftCode(e.target.value);
        }
    }
    return (
        <div className="walletForm">
            <div>
                <div className="wallet__formRow">
                    <label>Account Number</label>
                    <input type="text" value={accountNumber} name="accountNumber" className="accountNumber" placeholder="Enter Account Number"
                        onChange={handleAccountNumber}
                    />
                </div>
                <div className="wallet__formRow">
                    <label>Account Name</label>
                    <input type="text" value={accountTitle} name="accountTitle" className="accountTitle" placeholder="Enter Account Name"
                        onChange={handleAccountTitle}
                    />
                </div>
                <div className="wallet__formRow">
                    <label>Sort Code</label>
                    <input type="text" value={accountSwiftCode} name="accountSwiftCode" className="accountSwiftCode" placeholder="Enter Sort Code"
                        onChange={handleSwiftCode}
                    />
                </div>
                <div className="walletForm__checkboxWrapper">
                    <input type="checkbox" name="isCardActive" checked={isCardActive} id="isCardActive" onChange={(e)=>{setIsCardActive(e.target.checked)}}/>
                    <label for="isCardActive">Is Active</label>
                    </div>
                <div className="walletForm__footer">
                <Button className="backBtn" onClick={props.back}>Back</Button>
                {props.editCardData?<Button className="saveBtn" onClick={handleUpdate}>Update</Button>
                :<Button className="saveBtn" onClick={handleSubmit}>Save</Button>}
                </div>
            </div>
        </div>
    )
}
