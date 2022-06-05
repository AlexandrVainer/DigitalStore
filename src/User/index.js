import React from 'react'
import Cards from './components/Cards/';
import Drawer from './components/Drawer/';
import { GetProducts,GetDrawers } from './components/DataAccessLayer';


function User(props) {
  const [items, SetItems] = React.useState([]);
  const [cartItems, SetCartItems] = React.useState([]);
  const [cartOpened, SetCartOpened] = React.useState(false);
  const [entryOpened, SetEntryOpened] = React.useState(true);
  const [userId, SetUserId] = React.useState(null);

  React.useEffect(() => {
    if (items.length === 0) {
      GetDataItems();
      GetDataCartItems();
    }
  })

  const GetDataItems = () => {
    const products = GetProducts();
    SetItems(products);
    SetUserId(props.userId);
  }

  const GetDataCartItems = () => {
    const cartItems = GetDrawers(props.userId);
    SetCartItems(cartItems);
  }

  const CartOnClose=()=>{
    SetCartItems(GetDrawers(props.userId));
    SetCartOpened(false);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => CartOnClose()} items={cartItems} userId={props.userId} />}
      {<Cards onCartOpen={() => SetCartOpened(true)} items={items} cartItems={cartItems} userId={props.userId} />}
    </div>
  );
}

export default User;
