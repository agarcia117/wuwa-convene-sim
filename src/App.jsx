import resonators from './Resonators.js'
import ResonatorCard from './components/ResonatorCard.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  const [pulledResults, setPullResults] = useState([]);
  const lastPityPullIndex = pulledResults.length - pulledResults.filter(pull => {
    return pull.starRarity >= 4 ? pull : null;
  }).length;
  const last5PullIndex = pulledResults.length - pulledResults.filter(pull => {
    return pull.starRarity < 5 ? pull : null;
  }).length;
  // const [last5PullIndex, setLast5PullIndex] = useState(0);
  // const [lastPityPullIndex, setLastPityPullIndex] = useState(0);
  // const [toggleCards, setToggleCards] = useState(false);
  console.log(lastPityPullIndex, last5PullIndex);
  
  
  const pullElements = pulledResults.slice().reverse().map((resonator, index) => {
    return <ResonatorCard key={index} name={resonator.name} starRarity={resonator.starRarity} index={index}/>;
  });

  // const pullElements = pulledResults.slice().reverse().map((pull, index) => {        
  //   return <li key={index}>{`${pull.name != undefined ? pull.name : pull}  ${pulledResults.length - index}`}</li>
  // });

  function simulatePull(){
      let fiveStarChance;
      if((pulledResults.length - last5PullIndex) >= 65){
        fiveStarChance = 0.008 + (pulledResults.length - last5PullIndex - 64) * 0.05;
      }else{
        fiveStarChance = 0.008;
      }

      const fourStarChance = 0.06 + fiveStarChance;      

      if((pulledResults.length - lastPityPullIndex) === 9){
        setPullResults(prevResult => [...prevResult, getRandom4StarResonator()]);
        // setLastPityPullIndex(pulledResults.length + 1);
        return;
      }
      
      let randomChance = Math.random();      

      if(randomChance < fiveStarChance){
        setPullResults(prevResult => [...prevResult, getRandom5StarResonator()]);
        // setLast5PullIndex(pulledResults.length + 1);
        // setLastPityPullIndex(pulledResults.length + 1);
        console.log('5 Star Pulled');
      }else if(randomChance < fourStarChance){
        setPullResults(prevResult => [...prevResult, getRandom4StarResonator()]);
        // setLastPityPullIndex(pulledResults.length + 1);
      }else{
        setPullResults(prevResult => [...prevResult, {name: "3 Star", starRarity: 3, id: pulledResults.length}]);
      }
  }

  function getRandom4StarResonator(){
    const fourStarResonators = resonators.filter(resonatorObj => {
      return resonatorObj.starRarity === 4 ? resonatorObj : null;
    });
    
    return fourStarResonators[Math.floor(Math.random() * fourStarResonators.length)];
  }

  function getRandom5StarResonator(){
    const fiveStarResonators = resonators.filter(resonatorObj => {
      return resonatorObj.starRarity === 5 ? resonatorObj : null;
    });

    return fiveStarResonators[Math.floor(Math.random() * fiveStarResonators.length)];
  }

  

  return (
    <>
    <main>
      <div className='convene-container'>
        <h1 style={{marginTop:"10px"}}>Convene Pulling Simulator</h1>
        <img className='convene-art' src="/conveneSplashArt/roccia_convene_art.webp" alt="Splash Art for Convene" />
        <div className='convene-buttons-container'>
          <button onClick={() => simulatePull()}>1 Convene</button>
          <button onClick={() => {
            for(let i = 0; i < 10; i++){
              simulatePull();
            }
          }}>10 Convene</button>
        </div>
        
        <div className='resonator-card-container'>
          {pullElements}
          {/* <ul>
            {pullElements}
          </ul> */}

        </div>
        {/* <button onClick={() => setToggleCards(prev => !prev)}>Toggle Resonator Cards</button> */}
      </div>
      {/* {toggleCards &&
        <div className='resonator-card-container'>
          {resonatorElements}
        </div>
      } */}
      
    </main>
      
    </>
  )
}

export default App
