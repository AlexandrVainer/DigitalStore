import React from "react";
import "./header.css";


function Header(props) {

  return (
    <div className="header">
      <header className='d-flex justify-between align-center p-40 '>
        <ul className='d-flex'>
          <li className='mr-30' cu-p>
            <img alt="cart" width={30} height={30} src="/img/cart.jpg" onClick={props.onCartOpen} />
            <span>{props.price}$</span>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;