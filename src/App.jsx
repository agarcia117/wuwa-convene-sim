import resonators from './Resonators.js'
import ResonatorCard from './components/ResonatorCard.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  const [toggleCards, setToggleCards] = useState(false);
  
  const resonatorElements = resonators.map(resonator => {
    return <ResonatorCard key={resonator.name} name={resonator.name} starRarity={resonator.starRarity} />;
  })

  return (
    <>
    <main>
      <div className='convene-container'>
        <h1 style={{marginTop:"10px"}}>Convene Pulling Simulator</h1>
        <img className='convene-art' src="/conveneSplashArt/roccia_convene_art.webp" alt="Splash Art for Convene" />
        <div className='convene-buttons-container'>
          <button>1 Convene</button>
          <button>10 Convene</button>
        </div>
        <button onClick={() => setToggleCards(prev => !prev)}>Toggle Resonator Cards</button>
      </div>
      {toggleCards &&
        <div className='resonator-card-container'>
          {resonatorElements}
        </div>
      }
      
    </main>
      
    </>
  )
}

export default App
