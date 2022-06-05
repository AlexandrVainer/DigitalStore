import React from 'react'
import styles from './Card.module.scss'

function Card(props) {

  const [imagePlus, SetimagePlus] = React.useState('');

  React.useEffect(() => {
    if (imagePlus === "") {
      SetimagePlus(props.imagePlus);
    }
  });

  const handlePlus = () => {
    const action = (imagePlus === 'img/linked.png');
    SetimagePlus(action ? 'img/plus.png' : 'img/linked.png');
    props.onPlus(props.cartItem, action);
  }
  return (
    <div className={styles.card}>
      <img src={props.picture} width={133} height={122} alt="product" />
      <h5>{props.name}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex d-column'>
          <b>{props.price}$</b>
        </div>
        <img className={styles.plus}
          onClick={handlePlus}
          src={imagePlus}
          width={11}
          height={11}
          alt='Plus'
        />
      </div>
    </div>
  );
}

export default Card;
