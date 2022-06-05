import { handleBreakpoints } from "@mui/system";
import React from "react";

const ReadOnlyRow=({Product,handleEditClick,handleDeleteClick})=>{
      
    return(
        <tr>
            <td>{Product.id}</td>
            <td >
                {Product.nameProduct}
            </td>
            <td >
                {Product.picture}
            </td>
            <td >
                {Product.price}
            </td>
            <td>
                <button 
                    type="button"
                    onClick={(event)=>handleEditClick(event,Product)}>Edit
                </button>
                <button 
                    type="button"
                    onClick={()=>handleDeleteClick(Product.id)}>Delete
                </button>
            </td>
        </tr>

    )
};

export default ReadOnlyRow;