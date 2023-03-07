import React,{useEffect, useState} from 'react'
import {useSubscription, gql} from "@apollo/client"
export default function Subscription(props) {
    const {bids, currentBid} = props;
    const [subOffers, setSubOffers] = useState([]);
    const { loading, error, data } = useSubscription(
            gql`
            subscription oNnotifications($userId: ID!) {
                notifications(userId: $userId) {
                    _id
                    details
                    hasDetails
                    message
                    status
                    timeSent
                    to
                    from
                    sender {
                      name
                      image
                    }
                    type
                    url
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
                   
              
                    props.handleSubscription(data);
               }
                },[data])
       
         return <>
        </>
}
