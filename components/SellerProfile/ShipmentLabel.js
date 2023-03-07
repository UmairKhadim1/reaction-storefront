import React from 'react'

export default function ShipmentLabel(props) {
     // sku: "TEST0001",
        // hs_code: "12345"
       
   const parcelInfo = props.order.fulfillmentGroups[0].items.nodes.map((item,i)=>{
       return {
           height:item.parcel ? item.parcel.height : 10,
           width: item.parcel ?item.parcel.width: 10,
           length:item.parcel ?item.parcel.length : 10,
           unit: item.parcel ? item.parcel.massUnit: "cm"
       }
   })
   const structItems = props.order.fulfillmentGroups[0].items.nodes.map((item,i)=>{
       return {
        description: item.title,
        origin_country: "GB",
        quantity: item.quantity,
        value: item.price.amount,
        value_currency: "GBP",
        weight:item.parcel ?  item.parcel.weight : 10,
        weight_unit: "kg",
       
       }
   })
   const structToAddress = {
    name: props.order.account?props.order.account.name:props.order.email,
    phone: props.order.fulfillmentGroups[0].data.shippingAddress.phone,
    email: props.order.account?props.order.account.primaryEmailAddress:props.order.email,
    address_1:  props.order.fulfillmentGroups[0].data.shippingAddress.address1,
    address_2: props.order.fulfillmentGroups[0].data.shippingAddress.address2,
  
    city:  props.order.fulfillmentGroups[0].data.shippingAddress.city,
    postcode:  props.order.fulfillmentGroups[0].data.shippingAddress.postal,
    county:  props.order.fulfillmentGroups[0].data.shippingAddress.country,
    country_iso: "GB",
   }
   const str= props.order.fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod.displayName;
   const structCourier =str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

      const newLabel ={
          data: {
        testing:			true,
        auth_company:		"LoS",
        shipment: {
            label_size: "6x4",
            label_format: "pdf",
            generate_invoice: false,
            generate_packing_slip: false,
        
            courier : {
                global_product_code : "U",
                local_product_code : "U",
                friendly_service_name : props.order.fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod.displayName
            },
    
            extra_details : {
                channel_order_id : props.order.referenceId
            },
        
            collection_date: "2019-11-18T16:30:49.054Z",
            reference: "my reference",
            reference_2 : "my second reference",
            delivery_instructions:  "Leave on the porch",
            shipping_charge : 2.42,
        
            ship_from: {
                name: "MN",
                phone: "01377337164",
                email: "foo@foo.com",
                company_name: "Los",
                address_1: "unit 76",
                address_2: "warfield road",
                address_3: "",
                city: "Driffield",
                postcode: "YO25 9DJ",
                county: "",
                country_iso: "GB",
                company_id: "911-70-1234",
                tax_id: "911-70-1234",
                eori_id: "911-70-1234-000",
                ioss_number : "IM2760000711"
            },
        
            ship_to: {...structToAddress},
            parcels: [
                {
                    dim_width: parcelInfo[0].width,
                    dim_height: parcelInfo[0].height,
                    dim_length: parcelInfo[0].length,
                    dim_unit: parcelInfo[0].unit,
        
                    items: [...structItems]
                }
            ]
        },
        format_address_default : true,
        request_id: 123456789
    },
    courier:structCourier,
    referenceId: props.order.referenceId
}
   
    return newLabel;
}
