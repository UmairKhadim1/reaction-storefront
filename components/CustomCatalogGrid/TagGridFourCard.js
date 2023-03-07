import React, {useState, useEffect,useMemo} from 'react'
import {Grid} from "@material-ui/core";
import CatalogGridItem from '../CatalogGridItem/CatalogGridItem';
import Pagination from './Pagination';
let PageSize = 20;
export default function Index(props) {
    
      // const shuffleArray = props.products.sort(); 
      const [currentPage, setCurrentPage] = useState(1);
      const [pointerLastProduct,setPointerLastProduct] =useState([]);
      const [products,setProducts] = useState([]);
     
      var  timeOut;
      useEffect(()=>{
          
          if(props.isFilter == true){
            setCurrentPage(1)
            setProducts([...props.products]);
            setPointerLastProduct([props.pageInfo.endCursor]);
            // else statement code when filter still true
           
            clearTimeout(timeOut);
             timeOut = setTimeout(()=>{
              props.setIsFilter(false);
            },1800)
              
            
          }else{
           const isExist = pointerLastProduct.includes(props.pageInfo.endCursor)
           
           if(!isExist){
            
            let newArray = [...pointerLastProduct,props.pageInfo.endCursor]
            setProducts([...products,...props.products]);
            setPointerLastProduct(newArray);
           }
          }
          
      },[props.products])
      const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return products.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,products]);
      const handleCurrentPage = (page) =>{
            const reminder = page%3;
           
            if(reminder==0){
               
                
                setCurrentPage(page)
                props.pageInfo.loadNextPage();
                
            }else{
                
                setCurrentPage(page)
            }
      }
    return (
        // className="productGrid__4cardContainer" className={`productGrid__4card${i}`}
         <Grid container spacing={0,3,3,3} className="productGrid__4cardContainer">
              
            {currentTableData.map((item, i)=>{
                
                return(
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} >
                       <CatalogGridItem 
                       className="cat-thumb-main"
                       product={item}
                        // {...props}
                        />
                    </Grid>
                )
            })}
            <Grid item xs={12}  style={{display:"flex",justifyContent:"center"}}>
            <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={page =>  handleCurrentPage(page)}
        handleCurrentPage={page => setCurrentPage(page) }
      />
      </Grid>
         </Grid>
    )
}
