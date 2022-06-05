import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridRowProps } from '@mui/x-data-grid'
import { Paper, SxProps, Toolbar } from '@mui/material';
import { Contactless } from '@mui/icons-material';
import { GetOrders } from '../DataAccessLayer';
import './orders.css';
import { withTheme } from '@emotion/react';

export default function Orders(props) {



    const [pageSize, setPageSize] = useState(20);
    const orders = GetDataOrders();

    const columns = [
        { field: "id", headerName: "Line", flex: 2,  editable: false },
        { field: "userId", headerName: "User number", flex: 2, editable: false },
        { field: "orderId", headerName: "Order number", flex: 2, editable: false },
        { field: "product", headerName: "Name of product", flex: 1, editable: false },
        { field: "price", headerName: "Price", flex: 1, editable: false }
    ];

    const rows = orders.map((row) => ({
        id: row.id,
        userId: row.userId,
        orderId: row.orderId,
        product: row.product,
        price: row.price,
    }))

    function GetDataOrders() {
        let orders = GetOrders();
        let count=1;
        let gridOrders = orders.map((order) => GetGridOrder(order,count++))
        return gridOrders;
    }

    function GetGridOrder (order,count) {

        let gridOrder = {
            id: count,
            userId: order.userId,
            orderId: order.id,
            product: order.nameProduct,
            price: order.price
        }
        return gridOrder;
    }

    const dataGridSx = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 4,
        borderRadius: 2,
        height: 500,
        border:1,
    }


    return (
        <Paper sx={dataGridSx}>
            <DataGrid
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: () => {
                        return <GridToolbarContainer><GridToolbarExport /></GridToolbarContainer>
                    }
                }}
                pagination={true}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[20, 23, 40]}
                initialState={{
                    sorting: { sortModel: [{ field: 'userId', sort: 'asc' }] }
                }}
            />
        </Paper>
    )
}













/*
    const orders = [{"userId" : 1 , userName:"aa" ,orderId:"1",product:"bb",price:"3000"}]; //GetDataorders();

    const columns  = [
        {field:"userId" , headerName:"UserId", flex:2,sortable:false,filterable:true, editable : false},
        {field:"userName" , headerName:"UserName", flex:2, editable : false},
        {field:"orderId" , headerName:"OrderId", flex:2, editable : false},
        {field:"product" , headerName:"Product",flex:1,editable : false },
        {field:"price" , headerName:"Product",flex:1,editable : false }
    ];

    const rows= orders.map((row)=>({
        userId:row.userId,
        userName:row.userName,
        orderId:row.orderId,
        product:row.product,
        price:row.price,
    }))


*/



// https://www.youtube.com/watch?v=VOaGpMb5cNA 16:00
