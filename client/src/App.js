import { Routes, Route, Outlet } from 'react-router-dom';
import './assets/styles/App.css';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Contact from './pages/Contact.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import FAQ from './components/FAQ.js';
import TermsAndConditions from './components/TermsAndConditions.js';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import store from './components/store';
import BuyNow from './components/BuyNow';
import ProductList from './components/ProductList';

// Layout component that includes Header and Footer
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<Layout />}>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/FAQ" element={<FAQ />} />
                        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/buy" element={<BuyNow />} />
                    </Route>
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
