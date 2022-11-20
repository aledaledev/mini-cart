import { Badge, CloseButton, ListGroup, ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from '../data/items.json'

export const ShoppingCart = () => {

    const { toggleCart, cartState, cartItems, cartQuantity, removeFromCart } = useShoppingCart()
    let total = 0

  return (
    <>
    <ToastContainer position='top-end' className="position-fixed top-0 end-0">
      <Toast show={cartState} onClose={toggleCart} style={{ marginTop:'4.5rem',  marginRight:'1rem', zIndex:1}}>
        <Toast.Header>
          <strong className="me-auto">Cart</strong>
        </Toast.Header>
        <Toast.Body>
            {cartQuantity>0?
            <ListGroup variant="flush">
                {cartItems.map(elem => {
                    const {quantity,id} = elem
                    const item:any = storeItems.find(e => e.id === id) 
                    const {name, price, imgUrl} = item
                    total += quantity*price
                    return <ListGroup.Item className="bg-transparent d-flex align-items-center" key={id}>
                        <img src={imgUrl} style={{width:'90px', height:'65px'}}/>
                        <span className="ms-3 me-auto" style={{fontSize:'1rem'}}>{name}</span>
                        <span className="">x{quantity}</span>
                        <span className="text-end" style={{width:'3.7rem'}}>${price}</span>
                        <CloseButton className="ms-2 btn bg-danger" onClick={() => removeFromCart(id)}/>
                    </ListGroup.Item>
                })}
                <ListGroup.Item className="bg-transparent d-flex">
                    <span className="me-auto fw-bolder">TOTAL</span>
                    <span className="fw-bolder">${total.toFixed(2)}</span>
                </ListGroup.Item>
            </ListGroup>
            :<h2 className="text-center"><Badge bg="warning">Cart is empty!</Badge></h2>}
        </Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
};
