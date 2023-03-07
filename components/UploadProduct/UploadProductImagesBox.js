import React, { useState,useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone'
export default function UploadProductImagesBox(props) {
    const [imageStepItems,setItems] = useState([...props.imageStepItems]);
   
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
       

        // props.handleImageChange(acceptedFiles)
        const e=acceptedFiles;
        let reader = new FileReader();
        let file = e[0];
      
        reader.onloadend = () => {
           const newArray =  imageStepItems.map((item,i)=>{
                if(i == props.curentStep){
                 const prevFilesStruct = [...item.imageFile,...e]
                   
                    return({
                        ...item,
                        imageFile: prevFilesStruct,
                        imagePrev: [ reader.result]
                    })
                   
                }
                 return item;
            })
            props.handleImageChange(newArray)
        }
        reader.readAsDataURL(file)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div className="uploadProductImagesBox">
            <Typography className="uploadProductImagesBox__title" variant="h2">{props.title}</Typography>
            <Typography className="uploadProductImagesBox__description" variant="h2" component="p">{props.description}</Typography>
          {  props.imagePrev.map((item,i)=>{
                return <img key={i} className="uploadProductImagesBox__prev" src={item} />
          })}
            
            <div {...getRootProps()} className="uploadProductImagesBox__virtualBtn">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <>
                            <img className="uploadProductImagesBox__virtualBtnIcon" src="/icons/plus.png" />
                            <p>Add picture</p>
                        </>
                }
            </div>

        </div>
    )
}
