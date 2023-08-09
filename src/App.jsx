
import { Route, Routes } from 'react-router-dom';

import Home from "./pages/home-page/Home.jsx";
import Details from "./pages/details-page/Details.jsx";
import Footer from "./components/large-component/Footer.jsx";
import About from "./pages/about-page/About.jsx";
import NotFoundPage from "./pages/nofound-page/NotFoundPage.jsx";


function App() {

    return (
        <>
            <div className='biggest-container'>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/details/:id" element={<Details/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Footer />
            </div>
        </>
    );
}

export default App;
