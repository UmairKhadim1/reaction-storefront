import React from 'react'
import Select from 'react-select';
export default function Index(props) {
   
    const colourStyles = {
        control:(styles, { data, isDisabled, isFocused,hover,onFocus, isSelected }) => 
       { return{ ...styles,
         backgroundColor: 'white', 
         border:"1px solid #DEDEDE",
         borderRadius:"25px",
          padding:"5px 10px" ,
          border:isFocused && "1px solid #DEDEDE",
          border:onFocus && "1px solid #DEDEDE",
        }},
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = "#FFF";
          return {
            ...styles,
            border:isFocused && "1px solid #DEDEDE",
            backgroundColor:"#FFF",
            backgroundColor:isFocused &&"#DEDEDE",
            cursor: isDisabled ? 'not-allowed' : 'default',
            color:isSelected && "#000000"
          };
        },
      };
    return (
        <Select
        value={props.selectedOption}
        onChange={props.handleChange}
        options={props.options}
        styles={colourStyles}
      />
    )
}
