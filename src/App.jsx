import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartProvider} from "./store/CartContext.jsx";

function App() {
  return <CartProvider>
      <div className="bg-gray-100 min-h-screen position-relative">
          <Header />
          <Meals />
      </div>
  </CartProvider>;
}

export default App;
