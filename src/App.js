import './App.css';

const tg = window.Telegram.WebApp;

function App() {

  const use_effect = () => {
    tg.ready();
  }

  const on_close = () => {
    tg.close();
  }

  return (
    <div className="App">
      WORK
      <button onClick={on_close}> Закрыть</button>
    </div>
  );
}

export default App;
