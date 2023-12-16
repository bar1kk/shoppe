import Cart from "../cart/Cart";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const CartPage = () => {
    return (
        <>
            <Header line={true}/>
            <Cart/>
            <Footer/>
        </>
    )
}

export default CartPage;