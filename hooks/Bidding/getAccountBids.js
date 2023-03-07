import React from 'react'
import { useQuery } from '@apollo/client';
import getBidQuery from "./query.gql";
export default function getAccountBids() {
    const { loading, data, refetch} = useQuery(getBidQuery);
    
    return data
}
