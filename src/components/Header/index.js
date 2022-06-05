import { useEffect } from "react";
import './header.css';

function Header(props) {

  return (
    <header className='d-flex justify-between align-center p-40'>
      <div className='d-flex align-center'>
          <div className='headerInfo'>
            <img width={40} height={40} src="/img/logo.jpg" alt="logo" className="header-logo"/>
            <h4>Store of Alexander Vainer</h4>
            <p className='opacity-40'>Best goods store</p>
          </div>
      </div>
    </header>
  );
}

export default Header;