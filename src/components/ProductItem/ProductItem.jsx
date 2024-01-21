import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd }) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'} />
            <div className={'title'}>{product.title}</div>
            <div className={'rrc'}>
                <span>РРЦ: <b>{product.rrc}</b></span>
            </div>
            <div className={'all-price'}>
            <div className={'collect'}>
                <span>Сбор: <b>{product.collect}</b></span>
            </div>
            <div className={'wholesale_price'}>
                <span>Крупный опт: <b>{product.wholesale_price}</b></span>
            </div>
            </div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
