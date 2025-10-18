import './App.scss';
import Script from './components/Script.jsx';
import { ScriptProvider } from './context/ScriptContext.jsx';

function App() {
  return (
    <ScriptProvider>
      <div className="app">
        <Script />
      </div>
    </ScriptProvider>
  )
}

export default App
