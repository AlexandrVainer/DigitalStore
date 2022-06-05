import {useState} from "react"
import { DeleteDrawer, GetPriceDraw,GetDrawers,SaveOrder } from "../DataAccessLayer"
import './drawer.css'


function Drawer(props) {

  const vatPercent = 17;
  const total = parseFloat(GetPriceDraw(props.userId)).toFixed(2);
  const netto = parseFloat(total / (1 + (17 / 100))).toFixed(2);
  const vat = parseFloat((total - netto)).toFixed(2);

  const [cartItems, SetCartItems] = useState(GetDrawers(props.userId));
  
  const onSaveOrder = () => {
    SaveOrder(cartItems,props.userId);
    GetDrawers(props.userId).forEach((cart)=>DeleteDrawer(cart,props.userId)); 
    props.onClose();
  }

  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2 className='d-flex justify-between mb-30'>
          Drawer <img width={15} height={15} onClick={props.onClose} className="cu-p" src='img/remove.png' alt='Close' />
        </h2>

        <div className='items'>
          {cartItems.map((item) => (
            <div className='cartItem d-flex align-center mb-20'>
              <img src={'/img/products/' + item.picture} className='cartItemImg' alt={item.nameProduct}></img>
              <div className='mr-20' flex>
                <p className='mb-5'>{item.nameProduct}</p>
                <b>{item.price}$</b>
              </div>
            </div>
          ))}
        </div>

        <div className='cartTotalBlock'>
          <ul>
            <li className='d-flex'>
              <span>Netto :  </span>
              <div> </div>
              <b>{netto} $</b>
            </li>
            <li className='d-flex'>
              <span>VAT {vatPercent} % :  </span>
              <div> </div>
              <b>{vat} $</b>
            </li>
            <li className='d-flex'>
              <span>Total :  </span>
              <div> </div>
              <b> {total} $</b>
            </li>
          </ul>
          <button onClick={()=>onSaveOrder()}>Order</button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;