import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('address_2');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            // country,
            // street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            {/* <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
                <input
                className={'input'}
                type="text"
                placeholder={'Твой никнейм в телеграм (НАПРИМЕР, t.me/korolevsergey1001)'}
                value={country}
                onChange={onChangeCountry}
            /> */}
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'address_1'}>Москва, м. Нахимовский проспект, Симферопольский проезд, 18 </option>
                <option value={'address_2'}>Москва, м. Текстильщики, 1-ый Грайвороновский проезд, 13к2</option>
                <option value={'address_3'}>Москва, м. Щукинская, Новощукинская, 4</option>
            </select>
        </div>
    );
};

export default Form;
