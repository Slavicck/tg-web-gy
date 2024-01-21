import React, { use_state, use_effect, use_callback } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { use_telegram } from "../../hooks/UseTelegram";


const ProductList = () => {
    const [products, setProducts] = use_state([]);
    const [added_items, set_added_items] = use_state([]);
    const [search_term, set_search_term] = use_state('');
    const { tg, query_id } = useTelegram();

    use_effect(() => {
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

    const get_total_price = (items = []) => {
        return items.reduce((acc, item) => {
            return acc += parseInt(item.price);
        }, 0);
    };

    const on_send_data = use_callback(() => {
        const data = {
            products: added_items,
            total_price: get_total_price(added_items),
            query_id,
        };
        fetch('http://localhost:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }, [added_items, query_id]);

    use_effect(() => {
        tg.onEvent('mainButtonClicked', on_send_data);
        return () => {
            tg.offEvent('mainButtonClicked', on_send_data);
        };
    }, [on_send_data, tg]);

    const onAdd = (product) => {
        const already_added = added_items.find((item) => item.id === product.id);
        let new_Items = [];

        if (already_added) {
            new_Items = added_items.filter((item) => item.id !== product.id);
        } else {
            new_Items = [...added_items, product];
        }

        set_added_items(new_Items);

        if (new_Items.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${get_total_price(new_Items)}`,
            });
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search_term.toLowerCase())
    );

    return (
        <div>
            <input className={'input'}
                type="text"
                placeholder="Поиск"
                value={search_term}
                onChange={(e) => set_search_term(e.target.value)}
            />

            <div className={'list'}>
                {filteredProducts.map((item) => (
                    <ProductItem product={item} onAdd={onAdd} className={'item'} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;