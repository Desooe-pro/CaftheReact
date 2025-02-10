import './styles/App.css';
import {BrowserRouter as BR, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./Components/NotFound";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
      <BR>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path="produit/:id" element={<ProductDetails />}/>
              {/*Gestion des pages non trouvées*/}
              <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </BR>
  );
}

export default App;
