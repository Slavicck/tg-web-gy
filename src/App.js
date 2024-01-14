import './App.css';
const tg = window.Telegram.WebApp;

function App() {

use_effect(() => {
  tg.ready();
},[])

  const on_close = () => {
    tg.close();
  }

  return (
    <div className="App">
      WORK
      <button>Закрыть</button>
    </div>
  );
}
// onClick={on_close}
export default App;
