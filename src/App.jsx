import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartProvider} from "./store/CartContext.jsx";
import {UserProgressProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return <UserProgressProvider>
      <CartProvider>
          <div className="bg-gray-100 min-h-screen position-relative">
              <Header />
              <Meals />
              <Cart />
              <Checkout />
          </div>
      </CartProvider>
  </UserProgressProvider>;
}

export default App;
