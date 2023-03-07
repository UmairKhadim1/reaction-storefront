import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import MessageContact from "./MessageContact";
import { Button, Hidden } from "@material-ui/core";
import LoadingButton from '@mui/lab/LoadingButton';

import GameCard from "./GameCard";
import GameSuccessScreen from "./GameSuccessScreen";
import ChatProductDropdown from "./ChatProductDropdown";
import { useQuery, gql, useSubscription, split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import useAddOffer from "hooks/Bidding/addOffer";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import CounterOffer from "./CounterOffer";
import Subscription from "./Subscription";
import ContactSubscription from "./contactSubscription";
import AcceptOfferConfirmation from "./AcceptOfferConfirmation";
import { GQL_URL } from "../../apiConfig";
import { toast } from "react-toastify";
import GameOfferConfirmation from "./GameOfferConfirmation";
import GameSubscription from "./GameSubscription";
import GameFailureScreen from "./GameFailureScreen";
import MobileContacts from "./mobileContacts";
// import { useSubscription } from '@apollo/react-hooks';
var _ = require("lodash");
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = (props) => {
  const [addOfferEntry] = useAddOffer();
  const classes = useStyles();
  const [isGoOnToss, setIsGoOnToss] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isHead, setIsHead] = useState(false);
  const [isTail, setIsTail] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showFailureScreen, setShowFailureScreen] = useState(false);
  const [coinChooseLoader, setCoinChooseLoader] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Hello",
    "Is it available?",
    "Please reply.",
    "Not Interested.",
    "Final price.",
    "Yes",
    "No",
    "Thank you!",
    "No, make me a suitable offer.",
  ]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [bids, setBids] = useState([]);
  const [currentBid, setCurrentBid] = useState({});
  const [count, setCount] = useState(0);
  const [CounterOffer__Open, setCounterOffer__Open] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [acceptOfferModal, setAcceptOfferModal] = useState(false);
  const [acceptGameOfferModal, setAcceptGameOfferModal] = useState({
    open: false,
    option: "",
  });
  const [isCoinStart, setIsCoinStart] = useState(false);
  const containerRef = useRef(null);
  const [tossResult, setTossResult] = useState(null);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const notify = (MSG) => toast(MSG);
  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [containerRef, currentBid]);
  const getFilterContact = () => {
    const checkId = props.account.userId == props.to ? props.from : props.to;
    return props.chatContacts.filter(contact => { return contact.createdBy == checkId || contact.soldBy == checkId });
    // return props.chatContacts.length > 1 ? props.chatContacts.filter(contact => contact.soldby == props.to|| contact.soldby == props.from) : props.chatContacts;

  }
  useEffect(() => {
    setContacts(props.chatContacts);
    let userId = "";
    if (props.chatContacts.length >= 1 && Object.values(props.account).length >= 1) {
      if (props.currentBidId) {
        const filterContact = getFilterContact()
        setSelectedContact(filterContact[0]);
        userId =
          props.chatContacts.length >= 1
            ? filterContact[0]?.soldBy == props.account.userId
              ? filterContact[0].createdBy
              : filterContact[0].soldBy
            : null;
      } else {
        props.chatContacts.length >= 1 ? setSelectedContact(props.chatContacts[0]) : setSelectedContact({});
        userId =
          props.chatContacts.length >= 1
            ? props.chatContacts[0]?.soldBy == props.account.userId
              ? props.chatContacts[0].createdBy
              : props.chatContacts[0].soldBy
            : null;
      }



      const isSeller =
        props.chatContacts.length >= 1 ? (props.chatContacts[0].soldBy == props.account.userId ? true : false) : null;

      if (userId) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `${props.accessToken}`);
        var graphql = JSON.stringify({
          query: `
                    query GetBidsbyUserId($userId:ID!,$isSeller:Boolean!){
                        getBidsbyUserId(userId:$userId,isSeller:$isSeller){
                            _id
                        createdBy
                        updatedAt
                        sellerOffer {
                          amount {
                            amount
                            currency  {
                              code 
                              symbol
                            }
                            displayAmount
                          }
                        }
                        buyerOffer {
                          amount {
                            amount
                            currency  {
                              code 
                              symbol
                            }
                            displayAmount
                          }
                        }
                            productSlug
                            wonBy
                            lostBy
                            status
                            reactionVariantId
                                    createdAt
                                    gameCanAccept
                                    canAccept
                                    soldBy
                                    acceptedOffer {
                                        _id
                                        createdBy
                                        createdFor
                                        type
                                        amount {
                                            amount
                                            displayAmount
                                        }
                                    }
                                    product {
                                        _id
                                        
                                        title
                                        pricing {
                                            displayPrice
                                            price
                                        }
                                        media {
                                            URLs {
                                                large
                                            }
                                        }
                                    }
                                    soldByInfo {
                                        name
                                        image
                                    }
                                    createdByinfo{
                                        name
                                        image
                                    }
                                    activeOffer {
                                        text
                                        type
                                        amount {
                                            amount
                                            displayAmount
                                        }
                                    }
                                    offers {
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
                                        type
                                        
                                    }
                        }
                    }
                `,
          variables: {
            userId,
            isSeller,
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          redirect: "follow",
        };
        fetch(GQL_URL, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const newBidData = JSON.parse(result).data.getBidsbyUserId;
            const filterBids = newBidData.filter((val) => val.status != "closed")
            const sortBids = filterBids.sort(function (a, b) { return b.updatedAt - a.updatedAt });
            if (props.currentBidId) {
              if (newBidData.length >= 1) {
                const activeBid = filterBids.filter(bid => bid._id == props.currentBidId);
                setCurrentBid(activeBid.length > 0 ? activeBid[0] : sortBids.length > 0 ? sortBids[0] : newBidData[0])
              }
            } else {
              newBidData.length >= 1 ? setCurrentBid(filterBids.length > 0 ? sortBids[0] : newBidData[0]) : setCurrentBid({});
            }
            setBids(JSON.parse(result).data.getBidsbyUserId);
            // resolve(JSON.parse(result).data);
          })
          .catch((error) => {
            // reject(error);
          });
      }
    }
  }, [props.chatContacts, props.account]);
  const handleToss = (val) => {
    setIsGameStart(true);
  };

  const sendOffer = async (text) => {

    const structOffer = {
      amount: {
        amount: 0,
        currencyCode: props.shop.currency.code,
      },
      text: text,
      status: "new",
    };
    const offerType = "text";
    const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
    const bidId = currentBid._id;

    if (structOffer && to && bidId) {
      setIsSendingText(true)
      const res = await addOfferEntry(bidId, structOffer, to, offerType);
      setIsSendingText(false)


      const newBidObj = res.data.sendOffer;
      if (res) {
        const newBids = bids.map((bid, i) => {
          if (bid._id == currentBid._id) {
            const newOffer = [...bid.offers];
            newOffer.push(newBidObj);
            return {
              ...bid,
              offers: newOffer,
            };
          }
          return bid;
        });
        setBids(newBids);
        const updateCurrentBid = [...currentBid.offers];
        updateCurrentBid.push(newBidObj);
        setCurrentBid({
          ...currentBid,
          offers: updateCurrentBid,
        });
      }
    }
  };
  const handleAcceptOffer = async () => {
    const structOffer = {
      amount: {
        amount: parseInt(currentBid.activeOffer.amount.amount),
        currencyCode: props.shop.currency.code,
      },
      text: `Your offer of ${props.shop.currency.symbol}${parseInt(currentBid.activeOffer.amount.amount)} accepted.`,
      status: "new",
    };
    const offerType = "acceptedOffer";
    const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
    const bidId = currentBid._id;

    if (structOffer && to && bidId) {
      setIsSendingText(true)

      const res = await addOfferEntry(bidId, structOffer, to, offerType);
      setIsSendingText(false)

      if (res) {
        setCurrentBid({
          ...currentBid,
          acceptedOffer: res.data.sendOffer,
          status: "closed",
        });
        const newBids = bids.map((bid, i) => {
          if (bid._id == currentBid._id) {
            return {
              ...bid,
              acceptedOffer: res.data.sendOffer,
              status: "closed",
            };
          }
          return bid;
        });
        setBids(newBids);
        setAcceptOfferModal(false);
      }
    }
  };
  const handleSubscription = (newBids, data) => {
    if (
      data.offer.offer.createdBy == selectedContact.createdBy ||
      data.offer.offer.createdBy == selectedContact.soldBy
    ) {
      if (data.offer.bidId == currentBid._id) {

        setBids(newBids);
        const updateCurrentBid = [...currentBid.offers];
        updateCurrentBid.push(data.offer.offer);
        if (data.offer.offerType == "counterOffer") {

          if (data.offer.bidId == currentBid._id) {
            if (data.offer.offer.createdBy != currentBid.soldBy) {
              const restructBuyerOffer = {
                ...currentBid.buyerOffer,
                amount: {
                  amount: data.offer.offer.amount.amount,
                  displayAmount: data.offer.offer.amount.displayAmount
                }
              }
              setCurrentBid({
                ...currentBid,
                offers: updateCurrentBid,
                activeOffer: {
                  text: data.offer.offer.text,
                  amount: { ...data.offer.offer.amount },
                },
                canAccept: data.offer.offer.canAccept,
                buyerOffer: restructBuyerOffer
              });

            } else {
              const restructSellerOffer = {
                ...currentBid.sellerOffer,
                amount: {
                  amount: data.offer.offer.amount.amount,
                  displayAmount: data.offer.offer.amount.displayAmount
                }
              }
              setCurrentBid({
                ...currentBid,
                offers: updateCurrentBid,
                activeOffer: {
                  text: data.offer.offer.text,
                  amount: { ...data.offer.offer.amount },
                },
                canAccept: data.offer.offer.canAccept,
                sellerOffer: restructSellerOffer
              });
            }
          }



          const updateBids = bids.map((val, i) => {

            if (val._id == data.offer.bidId) {
              const updateCurrentBid = [...val.offers];
              updateCurrentBid.push(data.offer.offer);
              if (data.offer.offer.createdBy != val.soldBy) {
                const restructBuyerOffer = {
                  ...val.buyerOffer,
                  amount: {
                    amount: data.offer.offer.amount.amount,
                    displayAmount: data.offer.offer.amount.displayAmount
                  }
                }
                return {
                  ...val,
                  offers: updateCurrentBid,
                  activeOffer: {
                    text: data.offer.offer.text,
                    amount: { ...data.offer.offer.amount },
                  },
                  canAccept: data.offer.offer.canAccept,
                  buyerOffer: restructBuyerOffer
                };
              } else {
                const restructSellerOffer = {
                  ...val.sellerOffer,
                  amount: {
                    amount: data.offer.offer.amount.amount,
                    displayAmount: data.offer.offer.amount.displayAmount
                  }
                }
                return {
                  ...val,
                  offers: updateCurrentBid,
                  activeOffer: {
                    text: data.offer.offer.text,
                    amount: { ...data.offer.offer.amount },
                  },
                  canAccept: data.offer.offer.canAccept,
                  sellerOffer: restructSellerOffer
                };
              }

            }
            return val;
          });
          setBids(updateBids);
          notify(`New offer of ${data.offer.offer.amount.displayAmount} placed By ${data.offer.offer.sender.name}`);
        } else if (data.offer.offerType == "acceptedOffer") {
          const updateCurrentBid = [...currentBid.offers];
          updateCurrentBid.push(data.offer.offer);
          setCurrentBid({
            ...currentBid,
            acceptedOffer: data.offer.offer,
            offers: updateCurrentBid,
            status: "closed",
          });
          const updateBids = bids.map((val, i) => {
            const updateCurrentBid = [...val.offers];
            updateCurrentBid.push(data.offer.offer);
            if (val._id == data.offer.bidId) {
              return {
                ...val,
                acceptedOffer: data.offer.offer,
                offers: updateCurrentBid,
                status: "closed",
              };
            }
            return val;
          });
          setBids(updateBids);
          notify(`Offer accepted By ${data.offer.offer.sender.name}`);
        } else {

          setCurrentBid({
            ...currentBid,
            offers: updateCurrentBid,
          });
          const updateBids = bids.map((val, i) => {
            const updateCurrentBid = [...val.offers];
            updateCurrentBid.push(data.offer.offer);
            if (val._id == data.offer.bidId) {
              return {
                ...val,
                offers: updateCurrentBid,
              };
            }
            return val;
          });
          setBids(updateBids);
          notify(`New message from ${data.offer.offer.sender.name}`);
        }

        // if (data.offer.offer.offerType == "counterOffer") {
        //   const selectedContactActiveOffer = {
        //     ...selectedContact.activeOffer,
        //     text: data.offer.offer.text,
        //   };
        //   const restructSelectedContact = {
        //     ...selectedContact,
        //     activeOffer: selectedContactActiveOffer,
        //   };
        //   setSelectedContact(restructSelectedContact);
        //   const restructContacts = contacts.map((value, i) => {
        //     if (selectedContact._id == value._id) {
        //       return {
        //         ...value,
        //         activeOffer: selectedContactActiveOffer,
        //       };
        //     }
        //     return value;
        //   });
        //   setContacts(restructContacts);
        // }
      } else {
        const newBidOffer = bids.map((offerVal, i) => {
          if (offerVal._id == data.offer.bidId) {
            const updateCurrentBid = [...offerVal.offers];
            updateCurrentBid.push(data.offer.offer);
            const isNewOffer = true;
            return {
              ...offerVal,
              offers: updateCurrentBid,
              isNewOffer,
              activeOffer: {
                text: data.offer.offer.text,
                amount: { ...data.offer.offer.amount },
              },
              canAccept: data.offer.offer.canAccept,
            };
          }
          return offerVal;
        });
        setBids(newBidOffer);
      }
    } else {
      const isNewOffer = true;
      const contactNotify = contacts.map((val, i) => {
        if (data.offer.offer.createdBy == val.createdBy || data.offer.offer.createdBy == val.soldBy) {
          return {
            ...val,
            isNewOffer,
          };
        }
        return val;
      });
      setContacts(contactNotify);
    }
  };
  const handleCounterOffer = (newBids, updateCurrentBid, data) => {
    setBids(newBids);
    if (data.createdBy != currentBid.soldBy) {
      const restructBuyerOffer = {
        ...currentBid.buyerOffer,
        amount: {
          amount: data.amount.amount,
          displayAmount: data.amount.displayAmount
        }
      }
      setCurrentBid({
        ...currentBid,
        offers: updateCurrentBid,
        activeOffer: {
          text: data.text,
          amount: { ...data.amount },
        },
        canAccept: data.canAccept,
        buyerOffer: restructBuyerOffer
      });
    } else {
      const restructSellerOffer = {
        ...currentBid.sellerOffer,
        amount: {
          amount: data.amount.amount,
          displayAmount: data.amount.displayAmount
        }
      }
      setCurrentBid({
        ...currentBid,
        offers: updateCurrentBid,
        activeOffer: {
          text: data.text,
          amount: { ...data.amount },
        },
        canAccept: data.canAccept,
        sellerOffer: restructSellerOffer
      });
    }
    setCounterOffer__Open(false);
    // // if(data.offerType == "counterOffer"){
    //     const selectedContactActiveOffer = {
    //         ...selectedContact.activeOffer,
    //         text:data.text
    //     }
    //     const restructSelectedContact = {
    //         ...selectedContact,
    //         activeOffer : selectedContactActiveOffer
    //     }
    //     setSelectedContact(restructSelectedContact);
    //     const restructContacts = contacts.map((value,i)=>{
    //         if(selectedContact._id == value._id){
    //             return {
    //                 ...value,
    //                 activeOffer : selectedContactActiveOffer
    //             }
    //         }
    //         return value;
    //     });
    //     setContacts(restructContacts);
    // }
  };
  const handleSelectedContact = (val) => {
    setSelectedContact(val);
    setShowSuccessScreen(false);
    setShowFailureScreen(false);
    setIsCoinStart(false);
    setIsGoOnToss(false);
    const restructContact = contacts.map((item, i) => {
      if (item._id == val._id) {
        return {
          ...item,
          isNewOffer: false,
        };
      }
      return item;
    });
    setContacts(restructContact);
    const userId = val.soldBy == props.account.userId ? val.createdBy : val.soldBy;
    const isSeller = val.soldBy == props.account.userId ? true : false;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${props.accessToken}`);
    var graphql = JSON.stringify({
      query: `
        query GetBidsbyUserId($userId:ID!,$isSeller:Boolean!){
            getBidsbyUserId(userId:$userId,isSeller:$isSeller){
                _id
                productSlug
                updatedAt
                sellerOffer {
                  amount {
                    amount
                    currency {
                      code 
                      symbol
                    }
                    displayAmount
                  }
                }
                buyerOffer {
                  amount {
                    amount
                    currency  {
                      code 
                      symbol
                    }
                    displayAmount
                  }
                }
                reactionVariantId
                        createdAt
                        status
                        gameCanAccept
                        canAccept
                        createdBy
                        soldBy
                        wonBy
                        lostBy
                        acceptedOffer {
                            _id
                            createdBy
                            createdFor
                            type
                            amount {
                                amount
                                displayAmount
                            }
                        }
                        product {
                            _id
                            
                            title
                            pricing {
                                displayPrice
                                price
                            }
                            media {
                                URLs {
                                    large
                                }
                            }
                        }
                        soldByInfo {
                            name
                            image
                        }
                        createdByinfo{
                            name
                            image
                        }
                        activeOffer {
                            text
                            type
                            amount {
                                amount
                                displayAmount
                            }
                        }
                        offers {
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
                            type
                            
                        }
            }
        }
        `,
      variables: {
        userId,
        isSeller,
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };
    fetch(GQL_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newBidData = JSON.parse(result).data.getBidsbyUserId;
        const filterBids = newBidData.filter((val) => val.status != "closed")
        const sortBids = filterBids.sort(function (a, b) { return b.updatedAt - a.updatedAt });
        newBidData.length >= 1 ? setCurrentBid(filterBids.length > 0 ? sortBids[0] : newBidData[0]) : setCurrentBid({});
        setBids(JSON.parse(result).data.getBidsbyUserId);
        // resolve(JSON.parse(result).data);
      })
      .catch((error) => {
        // reject(error);
      });
  };
  const handleChangeBid = (val) => {
    setIsGoOnToss(false);
    setIsGameStart(false);
    setShowFailureScreen(false);
    setShowSuccessScreen(false);
    setCurrentBid(val);
    setIsCoinStart(false);


    const restructBids = bids.map((bidVal, i) => {
      if (bidVal._id == val._id) {
        return {
          ...bidVal,
          isNewOffer: false,
        };
      }
      return bidVal;
    });

    setBids(restructBids);
  };
  const handleNewContact = (newContact) => {
    const restructContacts = [...contacts];
    restructContacts.push({
      ...newContact,
      isNewOffer: true,
    });
    setContacts(restructContacts);
  };
  const handleGoOnToss = async () => {
    const userName = selectedContact.soldByInfo
      ? selectedContact.soldBy == props.account.userId
        ? selectedContact.soldByInfo.name
        : selectedContact.createdByinfo.name
      : "";

    const structOffer = {
      amount: {
        amount: parseInt(currentBid.activeOffer.amount.amount),
        currencyCode: props.shop.currency.code,
      },
      text:
        userName +
        " has sent you a coin toss request for coin game. If he wins product will be sold at his offer price of " +
        currentBid.activeOffer.amount.displayAmount,
      status: "new",
    };
    const offerType = "gameRequest";
    const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
    const bidId = currentBid._id;
    if (structOffer && to && bidId) {
      setIsSendingText(true)

      const res = await addOfferEntry(bidId, structOffer, to, offerType);
      setIsSendingText(false)

      const newBidObj = res.data.sendOffer;
      if (res) {
        // const updateBids = bids.map((val)=> {
        //       if(val._id ==  res.data.sendOffer._id){
        //         const updateCurrentBid = [...val.offers];
        //         updateCurrentBid.push(newBidObj);
        //           return {
        //               ...val,
        //               offers:updateCurrentBid
        //           }
        //       }
        //       return val;
        // })
        setIsCoinStart(true);
        const newBids = bids.map((bid, i) => {
          if (bid._id == currentBid._id) {
            const newOffer = [...bid.offers];
            newOffer.push(newBidObj)
            return {
              ...bid,
              offers: newOffer
            }
          }
          return bid;
        });
        setBids(newBids);
        const updateCurrentBid = [...currentBid.offers];
        updateCurrentBid.push(newBidObj);
        setCurrentBid({
          ...currentBid,
          offers: updateCurrentBid
        })
        // setIsGoOnToss(true)
      }
    }
  };
  const gameAcceptedConfirmation = async (tossSide) => {
    setCoinChooseLoader(true);
    if(tossSide=="head"){
      setIsHead(true);
    }else{
      setIsTail(true);

    }
    const structOffer = {
      amount: {
        amount: parseInt(currentBid.activeOffer.amount.amount),
        currencyCode: props.shop.currency.code,
      },
      text:
        "Request for coin game has been accepted " + selectedContact.soldBy == props.account.userId
          ? selectedContact.soldByInfo.name
          : selectedContact.createdByinfo.name + " has chosen " + tossSide,
      status: "new",
    };
    const offerType = "text";
    const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
    const bidId = currentBid._id;
    if (structOffer && to && bidId) {
      setIsSendingText(true)
      const res = await addOfferEntry(bidId, structOffer, to, offerType);
      setIsSendingText(false)
      setCoinChooseLoader(false);
      setIsTail(false)
      setIsHead(false)
      const newBidObj = res.data.sendOffer;
      if (res) {

        const reStrictBids = bids.map((val, i) => {
          const updateCurrentBid = [...val.offers];
          updateCurrentBid.push(newBidObj);
          if (val._id == currentBid._id) {
            return {
              ...val,
              offers: updateCurrentBid,

            }
          }
          return val;
        });
        setBids(reStrictBids)
      }
    }
    handleTossSelection(tossSide);
  };
  const handleTossSelection = async (tossSide) => {
    const structOffer = {
      amount: {
        amount: parseInt(currentBid.activeOffer.amount.amount),
        currencyCode: props.shop.currency.code,
      },
      text: tossSide,
      status: "new",
    };
    const offerType = "acceptedGame";
    const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
    const bidId = currentBid._id;
    if (structOffer && to && bidId) {
      const res = await addOfferEntry(bidId, structOffer, to, offerType);

      const newBidObj = res.data.sendOffer;
      if (res) {
        // const reStrictBids = bids.map((val, i) => {
        //   const updateCurrentBid = [...val.offers];
        //   updateCurrentBid.push(newBidObj);
        //   if (val._id == currentBid._id) {
        //     return {
        //       ...val,
        //       offers: updateCurrentBid,
        //       status: "closed"
        //     }
        //   }
        //   return val;
        // });
        // setBids(reStrictBids)
      }
    }
  };
  const handleGameOffer = async () => {
    setCurrentBid({
      ...currentBid,
      gameCanAccept: null,
    });
    const updateBids = bids.map((val, i) => {
      if (val._id == currentBid._id) {
        return {
          ...val,
          gameCanAccept: null,
        };
      }
      return val;
    });
    setBids(updateBids);
    setAcceptGameOfferModal({
      ...acceptGameOfferModal,
      open: false,
    });
    if (acceptGameOfferModal.option == "Accept") {
      setIsCoinStart(true);
      setIsGoOnToss(true);
    } else if (acceptGameOfferModal.option == "Reject") {
      const userName = selectedContact.soldByInfo
        ? selectedContact.soldBy == props.account.userId
          ? selectedContact.soldByInfo.name
          : selectedContact.createdByinfo.name
        : "";
      const structOffer = {
        amount: {
          amount: parseInt(currentBid.activeOffer.amount.amount),
          currencyCode: props.shop.currency.code,
        },
        text: "Offer rejected By " + userName,
        status: "new",
      };
      const offerType = "rejectedGame";
      const to = selectedContact.soldBy == props.account.userId ? selectedContact.createdBy : selectedContact.soldBy;
      const bidId = currentBid._id;
      if (structOffer && to && bidId) {
        const res = await addOfferEntry(bidId, structOffer, to, offerType);

        const newBidObj = res.data.sendOffer;
        if (res) {

          const updateCurrentBid = [...currentBid.offers];
          updateCurrentBid.push(newBidObj);
          setCurrentBid({
            ...currentBid,
            offers: updateCurrentBid,
            gameCanAccept: null
          })

          const reStrictBids = bids.map((val, i) => {
            const updateBidsBid = [...val.offers];
            updateBidsBid.push(newBidObj);
            if (val._id == currentBid._id) {
              return {
                ...val,
                offers: updateBidsBid,
                gameCanAccept: null
              }
            }
            return val;
          });
          setBids(reStrictBids)
        }
      }
    }
  };
  const handleGameSubscription = (data) => {

    if (
      data.offer.offer.createdBy == selectedContact.createdBy ||
      data.offer.offer.createdBy == selectedContact.soldBy
    ) {
      if (data.offer.bidId == currentBid._id) {
        const updateCurrentBid = [...currentBid.offers];
        updateCurrentBid.push(data.offer.offer);
        if (data.offer.offerType == "gameRequest") {
          setCurrentBid({
            ...currentBid,
            offers: updateCurrentBid,
            gameCanAccept: data.offer.canAcceptGame,

          });
          const updateBids = bids.map((val, i) => {
            if (data.offer.bidId == val._id) {
              const updateBidOffer = [...val.offers];
              updateBidOffer.push(data.offer.offer);
              return {
                ...val,
                offers: updateBidOffer,
                gameCanAccept: data.offer.canAcceptGame,

              };
            }
            return val;
          });
          setBids(updateBids);

        } else if (data.offer.offerType == "acceptedGame") {
          setCurrentBid({
            ...currentBid,
            offers: updateCurrentBid,
          });
          const updateBids = bids.map((val, i) => {
            if (data.offer.bidId == val._id) {
              const updateBidOffer = [...val.offers];
              updateBidOffer.push({ ...data.offer.offer });
              return {
                ...val,
                offers: updateBidOffer,
              };
            }
            return val;
          });
          setBids(updateBids);

        } else if (data.offer.offerType == "rejectedGame") {
        }
      } else {
        if (data.offer.offerType == "gameRequest") {
          const isNewOffer = true;

          const updateBids = bids.map((val, i) => {
            if (data.offer.bidId == val._id) {
              const updateBidOffer = [...val.offers];
              updateBidOffer.push(data.offer.offer);
              return {
                ...val,
                offers: updateBidOffer,
                gameCanAccept: data.offer.canAcceptGame,
                isNewOffer,
              };
            }
            return val;
          });
          setBids(updateBids);
        } else if (data.offer.offerType == "acceptedGame") {
          const isNewOffer = true;

          const updateBids = bids.map((val, i) => {
            if (data.offer.bidId == val._id) {
              const updateBidOffer = [...val.offers];
              updateBidOffer.push(data.offer.offer);
              return {
                ...val,
                offers: updateBidOffer,
                isNewOffer,
              };
            }
            return val;
          });
          setBids(updateBids);
        } else if (data.offer.offerType == "rejectedGame") {
        }
      }
    } else {
      const isNewOffer = true;
      const contactNotify = contacts.map((val, i) => {
        if (data.offer.offer.createdBy == val.createdBy || data.offer.offer.createdBy == val.soldBy) {
          return {
            ...val,
            isNewOffer,
          };
        }
        return val;
      });
      setContacts(contactNotify);
    }
  };
  const onTossResult = (data) => {
    // if(currentBid.status != "closed"){
    setTossResult(data.startCoinToss);
    const structWinnerInfo =
      data.startCoinToss.wonBy == selectedContact.soldBy
        ? {
          profileInfo: selectedContact.soldByInfo,
          product: currentBid.product,
          offer: data.startCoinToss.winnerOffer,
          reactionVariantId: currentBid.reactionVariantId,
          productSlug: currentBid.productSlug,
          sellerOffer: currentBid.sellerOffer,
          buyerOffer: currentBid.buyerOffer
        }
        : {
          profileInfo: selectedContact.createdByinfo,
          product: currentBid.product,
          offer: data.startCoinToss.winnerOffer,
          reactionVariantId: currentBid.reactionVariantId,
          productSlug: currentBid.productSlug,
          sellerOffer: currentBid.sellerOffer,
          buyerOffer: currentBid.buyerOffer
        };
    setWinnerInfo(structWinnerInfo);

    setIsGameStart(true);
    const time = setTimeout(() => {
      if (data.startCoinToss.wonBy == props.account.userId) {
        setIsGameStart(false);
        setShowSuccessScreen(true);
        if (data.startCoinToss.winnerOffer != null) {
          const updateBids = bids.map((val, i) => {
            if (data.startCoinToss.bidId == val._id) {
              return {
                ...val,
                wonBy: data.startCoinToss.wonBy,
                status: "closed",

              };
            }
            return val;
          });
          setBids(updateBids);
        } else {

          const updateBids = bids.map((val, i) => {
            if (data.startCoinToss.bidId == val._id) {

              return {
                ...val,
                wonBy: data.startCoinToss.wonBy,
                status: "closed"
              };
            }
            return val;
          });
          setBids(updateBids);
        }
      } else {
        setIsGameStart(false);
        setShowFailureScreen(true);
        if (data.startCoinToss.loserOffer != null) {
          const updateBids = bids.map((val, i) => {
            if (data.startCoinToss.bidId == val._id) {
              return {
                ...val,
                wonBy: data.startCoinToss.wonBy,
                status: "closed"
              };
            }
            return val;
          });
          setBids(updateBids);
        } else {

          const updateBids = bids.map((val, i) => {
            if (data.startCoinToss.bidId == val._id) {
              return {
                ...val,
                wonBy: data.startCoinToss.wonBy,
                status: "closed"
              };
            }
            return val;
          });
          setBids(updateBids);
        }
      }

    }, 10000);
    //clearTimeout(time);
    // }
  };
  const sentText = (bid, currentBid) => {
    return (
      <Typography variant="h2" className="CB__MA__MText" align="right">
        {bid.type == "acceptedGame"
          ? `${currentBid.wonBy == props.account.userId
            ? `You have won the offer for ${currentBid.wonBy == currentBid.soldBy
              ? currentBid.sellerOffer ? currentBid.sellerOffer.amount.displayAmount : props.shop.currency.symbol + currentBid.product.pricing.price
              : currentBid.acceptedOffer.amount.displayAmount
            }.`
            : "You have lost the game"
          } `
          : bid.type == "gameRequest"
            ? `You have ${bid.createdBy == props.account.userId ? "sent" : "recieved"
            } a coin toss request as a tiebreaker. If you win, the product will be sold at your last offer price of 
            ${props.account.userId == currentBid.soldBy
              ? currentBid.sellerOffer ? currentBid.sellerOffer.amount.displayAmount : props.shop.currency.symbol + currentBid.product.pricing.price
              : currentBid.buyerOffer ? currentBid.buyerOffer.amount.displayAmount : currentBid.activeOffer.amount.displayAmount
            }`
            : bid.type == "acceptedOffer"
              // && bid.createdBy == currentBid.soldBy
              ? currentBid.soldBy == props.account.userId
                ? `Offer price of ${currentBid.activeOffer.amount.displayAmount} accepted for (${currentBid.product.title}) which is valid for 24 hours. `
                : `Offer for ${currentBid.activeOffer.amount.displayAmount} accepted. Buy this product within 24 hours at your accepted offer`
              : bid.text}
        {
          (bid.type == "acceptedOffer" || bid.type == "acceptedGame") && currentBid.createdBy == props.account.userId && (
            <>
              <Grid container className="chat__footer">
                <Grid
                  item
                  xs={12}
                  className="chatFooter__Btns"
                  style={{ marginBottom: "0px!important", marginTop: "5px" }}
                >
                  <Grid xs={12} sm={12} className="chatFooter__BtnWrapper">
                    <Button
                      className="counterOfferBtn"
                      href={`/en/variant/${encodeURIComponent(currentBid.productSlug)}?variantId=${currentBid.reactionVariantId}`}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>)
        }
      </Typography>
    );
  };
  const recievedText = (bid, currentBid) => {
    return (
      <Typography className="CB__MA__MTextLeft" align="right">
        {bid.type == "acceptedGame"
          ? `${currentBid.wonBy == props.account.userId
            ? `You have won the offer for ${currentBid.wonBy == currentBid.soldBy
              ? currentBid.sellerOffer ? currentBid.sellerOffer.amount.displayAmount : props.shop.currency.symbol + currentBid.product.pricing.price
              : currentBid.acceptedOffer.amount.displayAmount
            }.`
            : "You have lost the game"
          } `
          : bid.type == "gameRequest"
            ? `You have ${bid.createdBy == props.account.userId ? "sent" : "recieved"
            } a coin toss request as a tiebreaker. If you win, the product will be sold at your last offer price of ${props.account.userId == currentBid.soldBy
              ? currentBid.sellerOffer ? currentBid.sellerOffer.amount.displayAmount : props.shop.currency.symbol + currentBid.product.pricing.price
              : currentBid.buyerOffer ? currentBid.buyerOffer.amount.displayAmount : currentBid.activeOffer.amount.displayAmount
            }`
            : bid.type == "acceptedOffer" && bid.createdBy == currentBid.soldBy
              ? currentBid.soldBy == props.account.userId
                ? `Offer price of ${currentBid.activeOffer.amount.displayAmount} accepted for (${currentBid.product.title}) which is valid for 24 hours. `
                : `Offer for ${currentBid.activeOffer.amount.displayAmount} accepted. Buy this product within 24 hours at your accepted offer`
              : bid.text}

        {
          (bid.type == "acceptedOffer" || bid.type == "acceptedGame") && currentBid.createdBy == props.account.userId && (
            <>
              <Grid container className="chat__footer">
                <Grid
                  item
                  xs={12}
                  className="chatFooter__Btns"
                  style={{ marginBottom: "0px!important", marginTop: "5px" }}
                >
                  <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                    <Button
                      className="acceptBtn"
                      href={`/en/variant/${encodeURIComponent(currentBid.productSlug)}?variantId=${currentBid.reactionVariantId}`}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>)
        }
        {currentBid.gameCanAccept == props.account.userId && bid.type == "gameRequest" && (
          <>
            <Grid container className="chat__footer">
              <Grid
                item
                xs={12}
                className="chatFooter__Btns"
                style={{ marginBottom: "0px!important", marginTop: "5px" }}
              >
                <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                  <Button
                    className="acceptBtn"
                    onClick={() => setAcceptGameOfferModal({ open: true, option: "Accept" })}
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                  <Button
                    className="counterOfferBtn"
                    onClick={() => setAcceptGameOfferModal({ open: true, option: "Reject" })}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Typography>
    );
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="chat__mainHeading">
            Chat Center
          </Typography>
        </Grid>
      </Grid>
      <Hidden smUp>
        <Grid container component={Paper} style={{ marginBottom: "5px" }}>
          <Grid xs={12} >
            <MobileContacts
              selectedContact={selectedContact}
              contacts={contacts}
              onclick={(val) => handleSelectedContact(val)}
              account={props.account}
              shop={props.shop}
            />
          </Grid>
        </Grid>
      </Hidden>
      <Grid container component={Paper} className={classes.chatSection}>
        <Hidden xsDown>
          <Grid item xs={4} className={classes.borderRight500}>
            <Grid item xs={12} className="chatBox__titleBox">
              <Typography variant="h2" className="chatBox__title">
                Messages
              </Typography>
            </Grid>
            <Divider />

            <div>
              {" "}
              {contacts.map((item, i) => (
                <MessageContact
                  offers={currentBid.offers}
                  onclick={(val) => handleSelectedContact(val)}
                  contact={item}
                  account={props.account}
                />
              ))}
            </div>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>

          <Grid container className="chatBox__messageHeader">
            <Hidden xsDown>
              <Grid item xs={12} sm={8}>
                <div className="chatBox__messageHeader__left">
                  <List className="CB__list">
                    <ListItem className="CB__listItem">
                      <ListItemIcon className="CB__listItemIcon">
                        {/* "/images/sellerProfile.jpg" */}
                        {Object.keys(selectedContact).length > 0 && (
                          <Avatar
                            className="CB__MH__userProfile"
                            alt="profile"
                            src={
                              selectedContact.soldByInfo
                                ? selectedContact.soldBy == props.account.userId
                                  ? selectedContact.createdByinfo.image
                                  : selectedContact.soldByInfo.image
                                : "/images/sellerProfile.jpg"
                            }
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText className="CB__listItemText">
                        <Typography variant="h2" className="CB__MH__userName">
                          {selectedContact.soldByInfo
                            ? selectedContact.soldBy == props.account.userId
                              ? selectedContact.createdByinfo.name
                              : selectedContact.soldByInfo.name
                            : ""}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={4}>
              <ChatProductDropdown
                currentBid={currentBid}
                bids={bids}
                handleChangeBid={(val) => handleChangeBid(val)}
                shop={props.shop}
              />
              {/* <div className="chatBox__messageHeader__right">
                                <img className="CB__MH__productImg" src="/images/collection2.png" />
                                <div className="CB__MH__infoContainer">
                                    <Grid container>
                                        <Grid item xs={12} lg={10}>
                                            <Typography className="CB__MH__PTitle" variant="h2">Air Jordan 1 Retro High OG GS 'Banned'</Typography>
                                            <Typography className="CB__MH__PPrice" variant="h2">£280</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div> */}
            </Grid>
          </Grid>
          <Divider />
          {isGameStart == true ? (
            <Grid container>
              <Grid item xs={12}>
                <GameCard tossResult={tossResult.result && tossResult.result} tossResultObj={tossResult} {...props} />
              </Grid>
            </Grid>
          ) : showSuccessScreen == true ? (
            <Grid container>
              <Grid item xs={12}>
                <GameSuccessScreen
                  {...props}
                  currentBid={currentBid}
                  wonByInfo={tossResult.wonByInfo}
                  winnerInfo={winnerInfo}
                  tossResult={tossResult}
                />
              </Grid>
            </Grid>
          ) : showFailureScreen == true ? (
            <Grid container>
              <Grid item xs={12}>
                <GameFailureScreen
                  {...props}
                  currentBid={currentBid}
                  lostByInfo={tossResult.lostByInfo}
                  winnerInfo={winnerInfo}
                  tossResult={tossResult}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              {" "}
              <List className={classes.messageArea} ref={containerRef}>
                {currentBid?.offers &&
                  currentBid.offers.map((bid, i) => {
                    return (
                      <>
                        {bid && bid.createdBy == props.account.userId ? (
                          <ListItem style={{ float: "right", width: "80%" }} key="1">
                            <Grid container>
                              <Grid item xs={12} className="CB__MA__infoRow">
                                <Avatar
                                  className="CB__MA__userProfile"
                                  alt="profile"
                                  src={`${bid.sender
                                    ? bid.sender.image
                                      ? bid.sender.image
                                      : "/images/sellerProfile.jpg"
                                    : "/images/sellerProfile.jpg"
                                    }`}
                                />
                                <div className="CB__MA__infoContainer">
                                  {sentText(bid, currentBid)}
                                  <Typography className="CB__MA_infoTime" variant="h2">
                                    {new Date(bid.createdAt).toLocaleTimeString()}
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ) : (
                          <ListItem key="2" style={{ float: "left", width: "80%" }}>
                            <Grid container>
                              <Grid item xs={12} className="CB__MA__infoRowLeft">
                                <Avatar
                                  className="CB__MA__userProfile"
                                  alt="profile"
                                  src={`${bid.sender
                                    ? bid.sender.image
                                      ? bid.sender.image
                                      : "/images/sellerProfile.jpg"
                                    : "/images/sellerProfile.jpg"
                                    }`}
                                />
                                <div className="CB__MA__infoContainerLeft">
                                  {recievedText(bid, currentBid)}

                                  <Typography className="CB__MA_infoTime" variant="h2">
                                    {new Date(bid.createdAt).toLocaleTimeString()}
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </ListItem>
                        )}
                      </>
                    );
                  })}
              </List>
              <Divider />
              <Grid container style={{ padding: "20px" }} className="chat__footer">
                <Grid item xs={12} className="chatFooter__Btns">
                  {!isGoOnToss ? (
                    <>
                      {" "}
                      <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                        <LoadingButton
                                  loadingPosition="end"

                          disabled={
                            currentBid.acceptedOffer == null ? currentBid.status != "closed"
                              ? currentBid.canAccept == props.account.userId
                                ? isSendingText ? true : false
                                : true
                              : true
                              : true
                          }
                          //loading={isSendingText}
                          variant="outlined"
                          className={` ${currentBid.acceptedOffer == null ? currentBid.status != "closed"
                            ? currentBid.canAccept == props.account.userId
                              ? "acceptBtn"
                              : "chatBtn__disabled"
                            : "chatBtn__disabled"
                            : "chatBtn__disabled"
                            }`}
                          onClick={() => setAcceptOfferModal(true)}
                        >
                          Accept {currentBid.activeOffer && currentBid.activeOffer.amount.displayAmount}
                        </LoadingButton>
                      </Grid>
                      <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                        <LoadingButton
                                  loadingPosition="end"

                          disabled={!currentBid.acceptedOffer ? currentBid.status != "closed" ? isSendingText ? true : false : true : true}
                          //loading={isSendingText}
                          className={`${!currentBid.acceptedOffer ? currentBid.status != "closed"
                            ? "counterOfferBtn" : "chatBtn__disabled"
                            : "chatBtn__disabled"
                            }`}
                          variant="outlined"

                          onClick={() => setCounterOffer__Open(true)}
                        >
                          Counter offer
                        </LoadingButton>
                      </Grid>
                    </>

                      // {!currentBid.gameCanAccept && (
                      //   <Grid xs={12} sm={4} className="chatFooter__BtnWrapper">
                        
                      //   </Grid>
                      // )}
                  ) : (
                    <>
                      <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                        <LoadingButton
                                  loadingPosition="end"
 className="counterOfferBtn" disabled={isSendingText}
                          loading={isHead}
                          variant="outlined"
                          onClick={() => gameAcceptedConfirmation("head")}>
                          Head
                        </LoadingButton>
                      </Grid>
                      <Grid xs={12} sm={6} className="chatFooter__BtnWrapper">
                        <LoadingButton
                                  loadingPosition="end"
 className="counterOfferBtn" disabled={isSendingText}
                          loading={isTail}
                          variant="outlined"
                          onClick={() => gameAcceptedConfirmation("tail")}>
                          Tail
                        </LoadingButton>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="h2" className="chat__suggestionsTitle">
                      Quick reply
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className="chat__suggestionsWrapper">
                    {suggestions.map((item, i) => {
                      return (
                        <button
                          disabled={!currentBid.acceptedOffer ? currentBid.status != "closed" ? isSendingText ? true : false : true : true}
                          className={`${!currentBid.acceptedOffer ? currentBid.status != "closed"
                            ? "chat__suggestions" : "chat__suggestionsDisabled"
                            : "chat__suggestionsDisabled"
                            }`}
                          onClick={() => sendOffer(item)}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </Grid>
                </Grid>
                {/* <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid> */}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      {isCoinStart && <GameSubscription bidId={currentBid._id} onTossResult={onTossResult} />}
      {/* <GameOfferRejection handleAcceptOffer={handleGameOffer} open={acceptGameOfferModal.open} onClose={() => setAcceptGameOfferModal({ ...acceptGameOfferModal, open: false })} /> */}
      <GameOfferConfirmation
        handleAcceptOffer={handleGameOffer}
        open={acceptGameOfferModal.open}
        onClose={() => setAcceptGameOfferModal({ ...acceptGameOfferModal, open: false })}
        message={acceptGameOfferModal.option}
      />
      <AcceptOfferConfirmation
        handleAcceptOffer={handleAcceptOffer}
        open={acceptOfferModal}
        onClose={() => setAcceptOfferModal(false)}
      />
      <CounterOffer
        {...props}
        open={CounterOffer__Open}
        onClose={() => setCounterOffer__Open(false)}
        handleCounterOffer={handleCounterOffer}
        selectedContact={selectedContact}
        currentBid={currentBid}
        bids={bids}
      />
      <Subscription
        {...props}
        bids={bids}
        currentBid={currentBid}
        handleSubscription={handleSubscription}
        handleGameSubscription={handleGameSubscription}
      />
      <ContactSubscription {...props} bids={bids} currentBid={currentBid} handleNewContact={handleNewContact} />
    </div>
  );
};

export default Chat;
