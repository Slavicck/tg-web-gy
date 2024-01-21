import React from 'react';
import Button from "../Button/Button";
import { use_telegram } from "../../hooks/UseTelegram";
import './Header.css';

const Header = () => {
    const { user, on_close } = use_telegram();

    return (
        <div className={'header'}>
            <Button onClick={on_close}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;
