import React, { useState, useEffect, useCallback } from "react";
import ImageStepCard from "./ImageStepCard";
import UploadProductImagesBox from "./UploadProductImagesBox";
import { Grid, Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import useUpdateVariant from "../../hooks/UpdateVariant/useUpdateVariant";
import { url } from "envalid";
import { useRouter } from "next/router";
import { DriveEtaRounded } from "@material-ui/icons";
import usePublishToCatalog from "hooks/Publish/usePublishToCatalog";
import async from "react-select/async";
export default function Step2(props) {
  const [publishEntry] = usePublishToCatalog();
  const [imgSuccess, setImgSuccess] = useState(false);
  
  const [ImageMissingError, setImageMissingError] = useState(false);
  const [uploadStatus, setuploadStatus] = useState(0);
  const router = useRouter();
  const [updateVariantEntry] = useUpdateVariant();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  
  const [imageStepItems, setImageStepItems] = useState([
    {
      id: 0,
      title: "Appearance",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPShoes.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    {
      id: 1,
      title: "Inside label",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPBarcode.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    {
      id: 2,
      title: "Back of insole",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPFullSole.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    {
      id: 3,
      title: "Insole Stitching",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPUsole.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    {
      id: 4,
      title: "Box Label",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPCloseBox.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    {
      id: 5,
      title: "Date Code",
      description: "Add pictures of the item you intend to sell on Land of Sneakers.",
      iconImage: "/images/UPOpenBox.svg",
      imagePrev: [],
      imageFile: [],
      uploadedUrl: [],
    },
    // {
    //     id: 6,
    //     title: "Additional",
    //     description: "Add pictures of the item you intend to sell on Land of Sneakers.",
    //     iconImage: "/images/imagePlaceholder.svg",
    //     imagePrev: [],
    //     imageFile: [],
    //     uploadedUrl:[]
    // },
  ]);
  const [uploadData, setUploadData] = useState([]);
  useEffect(() => {
    async function callUpdateQuery() {
      var objUrlStruct = [];
      const allImages = uploadData.map((imgObj, i) => {
        imgObj.uploadedUrl.forEach(function (arrayItem) {
          objUrlStruct.push({
            url: arrayItem,
            priority: i,
          });
        });
      });
      const Imgurls = objUrlStruct.map((item, i) => {
        return {
          URLs: {
            large: item.url,
            medium: item.url,
            original: item.url,
            small: item.url,
            thumbnail: item.url,
          },
          productId: props.newProductId,
          variantId: props.newVariantId,
          priority: item.priority,
        };
      });
      //  const primaryImage = {
      //      URLs : {
      //         large: Imgurls[0],
      //         medium: Imgurls[0],
      //         original: Imgurls[0],
      //         small: Imgurls[0],
      //         thumbnail: Imgurls[0]
      //      }
      //  }
      const variantStruct = {
        media: Imgurls,
        isVisible: false,

      };

      const res = await updateVariantEntry(variantStruct, props.shop._id, props.newVariantId);
      if (res) {
        setImgSuccess(true);
        setUploadDisabled(false);
        let timer1 = setTimeout(() => {
          setImgSuccess(false);
        }, 2000);
        return () => {
          clearTimeout(timer1);
        };
      }
    }
    if (uploadData.length > 0) {
      callUpdateQuery();
    }
  }, [uploadData]);
  useEffect(() => {
    //ancestorId
    if (props.updateProductId != null) {
      const productToUpdateFilter = props.account.productVariants.filter((item, i) => {
        return item._id == props.updateProductId;
      });
      const prevSVariantState = [...imageStepItems];
      var makeMediaArr = [];
      const reStructuredVariant = prevSVariantState.map((val, i) => {
        productToUpdateFilter[0].media &&
          productToUpdateFilter[0].media.forEach(function (arrayItem) {
            if (arrayItem && arrayItem.priority == i) {
              makeMediaArr.push(arrayItem.URLs.large);
            }
          });
        let temp = [...makeMediaArr];
        makeMediaArr = [];
        return {
          ...val,
          // imagePrev: temp,
          uploadedUrl: temp,
        };
      });
      setImageStepItems(reStructuredVariant);
    }
  }, []);
  const [curentStep, setCurentStep] = useState(0);
  const [imgError, setImgError] = useState({});
  const handleImageChange = (e) => {
    setImageStepItems(e);
  };
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const e = acceptedFiles;

      const newArray = imageStepItems.map((item, i) => {
        if (i == curentStep) {
          const prevFilesStruct = [...item.imageFile, ...e];
          const previewImg = acceptedFiles.map((file) => URL.createObjectURL(file));
          return {
            ...item,
            imageFile: prevFilesStruct,
            imagePrev: [...item.imagePrev, ...previewImg],
          };
        }
        return item;
      });
      handleImageChange(newArray);
    },
    [imageStepItems, curentStep],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 3 });
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  const validateImageQuatity = () => {
    var error = {};
    let isValid = true;
    var fieldName = imageStepItems[curentStep].title;

    if (imageStepItems[curentStep].imagePrev.length + imageStepItems[curentStep].uploadedUrl.length < 1) {
      //${imageStepItems[curentStep].title} should have at least 1 image
      error[fieldName] = `No Image selected`;
      isValid = false;
    } else if (
      imageStepItems[curentStep].imagePrev.length + imageStepItems[curentStep].uploadedUrl.length > 1 &&
      curentStep != 0
    ) {
      error[fieldName] = `${imageStepItems[curentStep].title} can have maximum 1 image`;
      isValid = false;
    } else if (
      imageStepItems[curentStep].imagePrev.length + imageStepItems[curentStep].uploadedUrl.length > 3 &&
      curentStep == 0
    ) {
      error[fieldName] = `${imageStepItems[curentStep].title} can have maximum 3 image`;
      isValid = false;
    }
    // else if (imageStepItems[curentStep].imagePrev.length == 1 && curentStep != 6 || imageStepItems[curentStep].imagePrev.length <= 3 && curentStep == 6) {

    //     error[fieldName] = `${imageStepItems[curentStep].title} can have maximum 3 image`;

    //     isValid = false
    // }

    // if (imageStepItems[curentStep].imageFile.length < 1 ) {
    //     //${imageStepItems[curentStep].title} should have at least 1 image
    //     error[fieldName] = `No Image selected`;
    //     isValid = false
    // } else if (imageStepItems[curentStep].imageFile.length > 3 || imageStepItems[curentStep].uploadedUrl.length > 3) {

    //     error[fieldName] = `${imageStepItems[curentStep].title} can have maximum 3 image`;

    //     isValid = false
    // }
    return { error, isValid };
  };
  const onRemoveImg = (index) => {
    const newArray = imageStepItems.map((item, i) => {
      if (i == curentStep) {
        const prevFilesStruct = item.imageFile.filter((val, fileIndex) => {
          if (fileIndex != index) return val;
        });
        const previewImg = item.imagePrev.filter((val, fileIndex) => fileIndex != index);

        return {
          ...item,
          imageFile: prevFilesStruct,
          imagePrev: previewImg,
        };
      }
      return item;
    });
    handleImageChange(newArray);
  };

  const onRemoveUploadImg = (index) => {
    const newArray = imageStepItems.map((item, i) => {
      if (i == curentStep) {
        const uploadDeleteImg = item.uploadedUrl.filter((val, fileIndex) => fileIndex != index);
        return {
          ...item,
          uploadedUrl: uploadDeleteImg,
        };
      }
      return item;
    });
    handleImageChange(newArray);
  };

  const handleOnSubmit = () => {
    const { error, isValid } = validateImageQuatity();
    setImgError(error);
setuploadStatus(1);
    if (isValid) {
      setUploadDisabled(true);
      var rString = randomString(6, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

      const files = imageStepItems[curentStep].imageFile;
      var formdata = new FormData();
      formdata.append("isMulti", files.length > 1 ? "true" : "false");
      files.map((file) => {
        formdata.append("photos", file, file.name);
      });
      formdata.append("uploadPath", `userProducts/${rString}/${imageStepItems[curentStep].title.replace(/\s/g, "")}/`);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      //http://localhost:3000/upload
      //https://staging_backend.landofsneakers.com
      //backend.landofsneakers.com/upload
      fetch("https://api.landofsneakers.com/upload", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
setuploadStatus(0)

          const setNewStateItems = imageStepItems.map((val, i) => {
            if (i == curentStep) {
              var urlArray = [];
              result.data.forEach(function (arrayItem) {
                urlArray.push(arrayItem.url);
              });
              var temp = [...val.uploadedUrl, ...urlArray];
              urlArray = [];
              return {
                ...val,
                imageFile: [],
                imagePrev: [],
                uploadedUrl: [...temp],
              };
            }
            return val;
          });
          setImageStepItems(setNewStateItems);
          setUploadData(setNewStateItems);
        })
        .catch((error) => {
        setuploadStatus(0)
      });
    }else{
      setuploadStatus(0);
    }
  };
  const validateimageAdded = () => {
    for (let i = 0; i < imageStepItems.length; i++) {
      let item = imageStepItems[i];
      if (item.uploadedUrl.length == 0) {
        return false;
      }
    }
    return true;
  };
  const handlePublish =async () => {
      if( validateimageAdded()){
      //   let r=[];
      //   r.push(props.newProductId)
      //  const res = await publishEntry(r);
       
        router.push("/en/profile/address");
      }else{
          setImageMissingError(true);
      }
  };
  const onChangeStep = (i) => {
    setCurentStep(i);
    setUploadDisabled(false);
  }
  return (
    <div className="uploadProductImages">
      <Grid container>
        <Grid item xs={12} md={7}>
          <div className="ImageStepCard__container">
            {imageStepItems.map((item, i) => {
              return (
                <ImageStepCard
                  key={i}
                  image={item.iconImage}
                  title={item.title}
                  imageFile={item.imageFile}
                  imagePrev={item.imagePrev}
                  uploadedUrl={item.uploadedUrl ? item.uploadedUrl : []}
                  onSelectIcon={(index) => onChangeStep(i)}
                  imgError={imgError}
                  curentStep={curentStep}
                />
              );
            })}
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          {/* <UploadProductImagesBox 
                     imageStepItems= {imageStepItems}
                     curentStep ={ curentStep}
                     imagePrev={imageStepItems[curentStep].imagePrev}
                      title={imageStepItems[curentStep].title} 
                     description={imageStepItems[curentStep].description}
                    handleImageChange = {handleImageChange}
                     /> */}
          <div className="uploadProductImagesBox">
            <p className="ImageStepCard__imgError">{Object.values(imgError)[0]}</p>
            {imgSuccess == true && <p className="ImageStepCard__imgSuccess">Image uploaded successfully</p>}
            <Typography className="uploadProductImagesBox__title" variant="h2">
              {imageStepItems[curentStep].title}
            </Typography>
            <Typography className="uploadProductImagesBox__description" variant="h2" component="p">
              {imageStepItems[curentStep].description}
            </Typography>
            {imageStepItems[curentStep].uploadedUrl.map((item, i) => {
              return (
                <div key={i} className="uploadProductImagesBox__prev" style={{ backgroundImage: "url(" + item + ")" }}>
                  <div onClick={() => onRemoveUploadImg(i)} className="uploadProductImagesBox__deleteImg">
                    <img src="/icons/deleteIcon.png" />
                  </div>
                </div>
              );
            })}
            {imageStepItems[curentStep].imagePrev.map((item, i) => {
              return (
                <div key={i} className="uploadProductImagesBox__prev" style={{ backgroundImage: "url(" + item + ")" }}>
                  <div onClick={() => onRemoveImg(i)} className="uploadProductImagesBox__deleteImg">
                    <img src="/icons/deleteIcon.png" />
                  </div>
                </div>
              );
            })}

            <div {...getRootProps()} className="uploadProductImagesBox__virtualBtn">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <img className="uploadProductImagesBox__virtualBtnIcon" src="/icons/plus.png" />
                  <p>Add picture</p>
                </>
              )}
            </div>
            <Button
              disabled={uploadDisabled}
              className="uploadProductImagesBox__submitBtn"
              onClick={() => handleOnSubmit()}
            >

            {uploadStatus==1&&  <span class="spin-icon"></span>}

              {uploadStatus!=1&&<span>Upload</span>}
            </Button>
          </div>
        </Grid>
        <Grid xs={12} className="uploadProductForm__footer">
        {ImageMissingError&&<span className="inline-error">Minimum of one image is required for each category </span>}
        </Grid>

        <Grid xs={12} className="uploadProductForm__footer">
          {/*<Button
            className="uploadProductForm__footerBtn uploadProductForm__footerBackBtn"
            onClick={() => props.back()}
          >
            Back
          </Button>*/}
          <Button className="uploadProductForm__footerBtn uploadProductForm__footerNextBtn" onClick={handlePublish}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
