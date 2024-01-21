import React, { use_callback, use_effect, use_state } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/UseTelegram";

const Form = () => {
    const [country, set_country] = use_state('');
    const [street, set_street] = use_state('');
    const [subject, set_subject] = use_state('address_2');
    const { tg } = use_telegram();

    const on_send_data = use_callback(() => {
        const data = {
            // country,
            // street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [/*country, street,*/ subject])

    use_effect(() => {
        tg.onEvent('mainButtonClicked', on_send_data)
        return () => {
            tg.offEvent('mainButtonClicked', on_send_data)
        }
    }, [on_send_data])

    use_effect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    use_effect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const on_change_country = (e) => {
        set_country(e.target.value)
    }

    const on_change_street = (e) => {
        set_street(e.target.value)
    }

    const on_change_subject = (e) => {
        set_subject(e.target.value)
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
            <select value={subject} onChange={on_change_subject} className={'select'}>
                <option value={'address_1'}>Москва, м. Нахимовский проспект, Симферопольский проезд, 18 </option>
                <option value={'address_2'}>Москва, м. Текстильщики, 1-ый Грайвороновский проезд, 13к2</option>
                <option value={'address_3'}>Москва, м. Щукинская, Новощукинская, 4</option>
            </select>
        </div>
    );
};

export default Form;
