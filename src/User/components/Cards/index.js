import React from 'react'
import Card from './Card/';
import Header from './Header';
import { SaveDrawer, GetProducts, DeleteDrawer, GetDrawers, GetPriceDraw } from '../DataAccessLayer';

function Cards(props) {

    const [items, SetItems] = React.useState(props.items);
    const [cartItems, SetCartItems] = React.useState('');
    const [searchValue, SetSearchValue] = React.useState('');
    const [imagePlus, SetimagePlus] = React.useState('img/plus.png');
    const [price, SetPrice] = React.useState(0);


    React.useEffect(() => {
        //if ((items.length === 0) && (searchValue === "")) {
        if (searchValue === "") {
            SetPrice(GetPriceDraw(props.userId));
            SetItems(props.items);
            //alert(GetCartItems().length);
            //SetCartItems(GetCartItems());       
            SetCartItems(GetCartItems());
        }
    });

    const GetCartItems = () => {
        let carts = GetDrawers(props.userId).map((cart) => cart.id);
        return carts.filter(cart => cart !== "").join();
    }

    const onChangeSearchInput = (event) => {
        let serchText = event.target.value ? 'Search by : ' + event.target.value : 'All products';
        let items = GetProducts(event.target.value);
        SetItems(items);
        SetSearchValue(serchText);
    }

    const onAddToCart = (item, action) => {
        if (action) {
            DeleteDrawer(item, props.userId);
        }
        else {
            SaveDrawer(item, props.userId);
        }
        SetPrice(GetPriceDraw(props.userId));
    }

    const GetImagePlus = (item) => {
        let cartItems = GetCartItems();
        let imagePlus = cartItems.search(item.id) > -1 ? 'img/linked.png' : 'img/plus.png';
        return imagePlus;
    }

    return (
        <div>
            <div className='header'>
                <Header price={price} onCartOpen={props.onCartOpen}/>
            </div>
            <div className='content p-40'>
                <div className='d-flex justify-between align-center mb-40'>
                    <h1>{searchValue}</h1>
                    <div className='search-block d-flex'>
                        <input onChange={onChangeSearchInput} placeholder='Search...' />
                    </div>
                </div>
                <div className='d-flex'>
                    {items.map((item) => (
                        <Card
                            key={item.id}
                            name={item.nameProduct}
                            price={item.price}
                            picture={"/img/products/" + item.picture}
                            onPlus={(item, action) => onAddToCart(item, action)}
                            cartItem={item}
                            imagePlus={GetImagePlus(item)}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Cards;