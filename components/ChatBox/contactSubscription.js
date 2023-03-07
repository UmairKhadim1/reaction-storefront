import React,{useEffect, useState} from 'react'
import {useSubscription, gql} from "@apollo/client"
export default function Subscription(props) {
    const {bids, currentBid} = props;
    const [subOffers, setSubOffers] = useState([]);
    const { loading, error, data } = useSubscription(
            gql`
            subscription NewBid($userId: ID!) {
                newBid(userId: $userId) {
                    _id
                    createdAt
                    productId
                    soldBy
                    soldByInfo {
                        name
                        image
                    }
                    createdBy
                    createdByinfo {
                        name
                        image
                    }
                    activeOffer {
                        text
                    }
                      }
                    }
            `,
                {  variables: {
                    userId:props.account.userId
                  }
                }
        )
       
     
        useEffect(()=>{
               if(data){
                  
                 props.handleNewContact(data.newBid);
               }
                },[data])
       
         return <>
        </>
}
