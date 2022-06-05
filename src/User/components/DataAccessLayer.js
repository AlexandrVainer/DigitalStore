const TypeData = {
    Product: ',Product,',
    Order: ',Order,',
    Drawer: ',Drawer,',
    User: ',User,',
    OrderUser: ',OrderUser,',
    OrderCount: ',OrderCount,',
    LastProduct: ',LastProduct,',
    LastOrder: ',LastOrder,'
}

function Save(key, jsonValue) {
    localStorage.setItem(key, JSON.stringify(jsonValue));
}

function Delete(key) {
    localStorage.removeItem(key);
}

function GetKey(typeData, id, userId = null) {
    let key = typeData + id;
    if (userId != null)
        key = key + TypeData.User + userId;
    return key;
}

function Get(key, userId = null) {
    let archive = [];
    let keyItem = '';
    let count=0;
    for (var i = 0; i < localStorage.length; i++) {
        keyItem = localStorage.key(i);
        if (keyItem.substring(0, key.length) === key) {
            if ((userId===null) || (keyItem.substring(keyItem.length-userId.length) === userId))
                archive[count++] = JSON.parse(localStorage.getItem(keyItem));
        }
    }
    return archive;
}

export function SaveProduct(data) {
    Save(GetKey(TypeData.Product, data.id), data);
}

export function UpdateProduct(data) {
    Save(GetKey(TypeData.Product, data.id), data)
}

export function DeleteProduct(data) {
    Delete(GetKey(TypeData.Product, data.id))
}

export function GetProducts(search = null) {
    let allData = Get(TypeData.Product);
    if (search === null)
        return allData;
    return allData.filter(product => product.nameProduct.toUpperCase().search(search.toUpperCase()) > -1);;
}

export function SaveOrder(data, userId) {
    let keyLastOrder = JSON.parse(localStorage.getItem(TypeData.LastOrder));
    let lastOrder;
    if (keyLastOrder === null)
        lastOrder = "1";
    else {
        lastOrder = (parseInt(keyLastOrder.Order) + 1).toString();
    }
    Save(TypeData.LastOrder, { "Order": lastOrder, "UserId": userId });
    Save(GetKey(TypeData.OrderUser, lastOrder), userId);

    let count = 1;
    data.forEach((item)=>item.userId = userId);
    data.forEach((item)=>item.id = lastOrder);
    data.forEach((item) => Save(GetKey(TypeData.Order + lastOrder + TypeData.OrderCount, (count++).toString()), item));
}

export function UpdateOrder(data, userId) {
    Save(GetKey(TypeData.Order, data.id, userId), data)
}

export function DeleteOrder(data, userId) {
    Delete(GetKey(TypeData.Order, data.id, userId))
}

export function GetOrders(userId) {
    return Get(TypeData.Order, userId);
}

export function SaveDrawer(data, userId) {
    Save(GetKey(TypeData.Drawer, data.id, userId), data)
}

export function UpdateDrawer(data, userId) {
    Save(GetKey(TypeData.Drawer, data.id, userId), data)
}

export function DeleteDrawer(data, userId) {
    Delete(GetKey(TypeData.Drawer, data.id, userId));
}

export function GetDrawers(userId) {
    return Get(TypeData.Drawer, userId);
}

export function GetPriceDraw(userId) {
    let carts = GetDrawers(userId);
    let price = 0;
    carts.forEach((x) => (price = price + parseInt(x.price)));
    return price;
}