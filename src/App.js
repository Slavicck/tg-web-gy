import './App.css';
import { use_effect } from "react";
import { use_Telegram } from "./hooks/use_telegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
    const { on_toggle_button, tg } = use_Telegram();

    use_effect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />} />
                <Route path={'form'} element={<Form />} />
            </Routes>
        </div>
    );
}

export default App;
