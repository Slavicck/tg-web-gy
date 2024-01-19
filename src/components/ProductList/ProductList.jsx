import React, { useState, useEffect, useCallback } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { tg, queryId } = useTelegram();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/fetch-products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += item.price;
        }, 0);
    };

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        };
        fetch('http://localhost:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }, [addedItems, queryId]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find((item) => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`,
            });
        }
    };

    const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div>
        {/* Текстовое поле для ввода значения поиска */}
        <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Отображение отфильтрованных продуктов */}
        <div className={'list'}>
            {filteredProducts.map((item) => (
                <ProductItem product={item} onAdd={onAdd} className={'item'} key={item.id} />
            ))}
        </div>
    </div>
);
};

export default ProductList;