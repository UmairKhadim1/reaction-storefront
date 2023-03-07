import React from 'react'

export default function Index(props) {
    return (
    <div className="AuthencityCardItem">
        <img className="AuthencityCardItem__img" src={props.product.primaryImage.URLs.small} />
        <div className="AuthencityCardItem__Footer">
          <span className="AuthencityCardItem__FooterTitle">{props.product.title}</span>
           <span className="AuthencityCardItem__FooterPrice">£299</span>
        </div>
      </div>
    )
}
