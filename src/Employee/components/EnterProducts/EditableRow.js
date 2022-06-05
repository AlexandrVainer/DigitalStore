import React, { useState } from 'react';

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {


    return (
           <tr>
                <td>{editFormData.id}</td>
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder='Enter a name of product'
                        name="nameProduct"
                        value={editFormData.nameProduct}
                        onChange={handleEditFormChange}>
                    </input>
                </td>
                <td>
                    <input
                        type="file"
                        name="picture"
                        placeholder='Choice a picture'
                        onChange={handleEditFormChange}
                    >
                    </input>
                </td>
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder='Enter a price'
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditFormChange}>
                    </input>
                </td>
                <td><button type="submit">Save</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button></td>
            </tr>
    )
}

export default EditableRow