import "./styles/App.css";
import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./Components/NotFound";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import BtnTest from "./Components/BtnTest";
import Panier from "./pages/Panier";
import Compte from "./pages/Compte";
import Reload from "./pages/Reload";
import Test from "./Components/test";
import Commande from "./pages/Commande";
import CGU from "./pages/CGU";
import CGV from "./pages/CGV";
import PolitiqueConfidentialit from "./pages/PolitiqueConfidentialite";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

function App() {
  return (
    <AuthProvider>
      <BR>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="produit/:id" element={<ProductDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="btntest" element={<BtnTest />} />
            <Route path="compte" element={<Compte />} />
            <Route path="panier" element={<Panier />} />
            <Route path="commande/:Id_Panier" element={<Commande />} />
            <Route path="reload/:link" element={<Reload />} />
            <Route path="test" element={<Test />} />
            <Route path={"cgu"} element={<CGU />} />
            <Route path={"cgv"} element={<CGV />} />
            <Route path={"polconf"} element={<PolitiqueConfidentialite />} />
            {/*Gestion des pages non trouvées*/}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BR>
    </AuthProvider>
  );
}

export default App;
