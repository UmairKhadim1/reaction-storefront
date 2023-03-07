import React,{useEffect, useState} from 'react'
import {useSubscription, gql} from "@apollo/client"
export default function Subscription(props) {
    const {bids, currentBid} = props;
    const [subOffers, setSubOffers] = useState([]);
    const { loading, error, data } = useSubscription(
            gql`
            subscription onOffer($userId: ID!) {
                        offer(userId: $userId) {
                            bidId
                            offerType
                            canAcceptGame
                            offer {
                                canAccept
                                type
                                _id
                                createdAt
                                amount {
                                    amount
                                    displayAmount
                                }
                                text
                                createdAt
                                createdBy
                                createdFor
                                sender {
                                    name
                                    image
                                }
                                reciever {
                                    name
                                    image
                                }
                               
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
                   
                if(data.offer.offerType == "gameRequest"){
                     props.handleGameSubscription(data);

                }else  if(data.offer.offerType == "acceptedGame"){
                    props.handleGameSubscription(data);
               }
                else if(data.offer.offerType == "counterOffer"){
                    const newBids = bids.map((bid,i)=>{
                        if(bid._id == data.offer.bidId){
                            const newOffer = [...bid.offers];
                            newOffer.push(data.offer.offer)
                             return {
                                ...bid,
                                offers:newOffer,
                                activeOffer: {
                                    text:data.offer.offer.text
                                },
                                canAccept:data.offer.offer.canAccept
                             }
                        }
                        return bid;
                    });
                    props.handleSubscription(newBids,data);
                }else if(data.offer.offerType == "acceptedOffer"){
                    const newBids = bids.map((bid,i)=>{
                        if(bid._id == data.offer.bidId){
                             return {
                                ...bid,
                                acceptedOffer : data.offer.offer
                             }
                        }
                        return bid;
                    });
                    props.handleSubscription(newBids,data);
                }else{
                const newBids = bids.map((bid,i)=>{
                    if(bid._id == data.offer.bidId){
                        const newOffer = [...bid.offers];
                        newOffer.push(data.offer.offer)
                         return {
                            ...bid,
                            offers:newOffer
                         }
                    }
                    return bid;
                });
                 props.handleSubscription(newBids,data);
            }
               }
                },[data])
       
         return <>
        </>
}
