import React, { useEffect, useState } from 'react'
import { useSubscription, gql } from "@apollo/client"
export default function Subscription(props) {
  const { bids, currentBid } = props;
  const [subOffers, setSubOffers] = useState([]);
  const { loading, error, data } = useSubscription(
    gql`
            subscription StartCoinToss($bidId: ID!) {
                startCoinToss(bidId: $bidId) {
                    result
                    wonBy
                    lostBy
                    data
                    head
                    tail
                    wonByInfo{
                      name
                      image
                    }
                    lostByInfo{
                      name
                      image
                    }
                    bidId
                    winnerOffer {
                      _id
                      canAccept
                      type
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
                  loserOffer {
                    _id
                    canAccept
                    type
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
    {
      variables: {
        bidId: props.bidId
      }
    }
  )


  useEffect(() => {
    if (data) {
      props.onTossResult(data)
    }
  }, [data])

  return <>
  </>
}
