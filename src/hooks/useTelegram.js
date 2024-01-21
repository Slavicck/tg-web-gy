const tg = window.Telegram.WebApp;

export function use_telegram() {

    const on_close = () => {
        tg.close()
    }

    const on_toggle_button = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        on_close,
        on_toggle_button,
        tg,
        user: tg.initDataUnsafe?.user,
        query_id: tg.initDataUnsafe?.query_id,
    }
}
