import resonators from './Resonators.js'
import ResonatorCard from './components/ResonatorCard.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  const [pulledResults, setPullResults] = useState([]);
  

  // const [last5PullIndex, setLast5PullIndex] = useState(0);
  // const [lastPityPullIndex, setLastPityPullIndex] = useState(0);
  // const [toggleCards, setToggleCards] = useState(false);
  //console.log(lastPityPullIndex, last5PullIndex);
  
  
  const pullElements = pulledResults.slice().reverse().map((resonator, index) => {
    return <ResonatorCard key={index} name={resonator.name} starRarity={resonator.starRarity} index={index}/>;
  });

  // const pullElements = pulledResults.slice().reverse().map((pull, index) => {        
  //   return <li key={index}>{`${pull.name != undefined ? pull.name : pull}  ${pulledResults.length - index}`}</li>
  // });

  function simulatePull(pullsToDo){
    let newPulls = [];
    
    console.log(`${pulledResults.length}: Starting point`);

    for(let i = 0; i < pullsToDo; i++){      
      const [lastPityPullIndex, last5PullIndex] = findLastIndexOfPulls(pulledResults, newPulls);

      console.log(lastPityPullIndex, last5PullIndex);
  
      let fiveStarChance;
      if((pulledResults.length + newPulls.length - last5PullIndex) >= 65){
        fiveStarChance = 0.008 + (pulledResults.length + newPulls.length  - last5PullIndex - 65) * 0.05;
      }else{
        fiveStarChance = 0.008;
      }
  
      const fourStarChance = 0.06 + fiveStarChance;      
  
      if((pulledResults.length + newPulls.length - lastPityPullIndex) === 10){
        newPulls.push(getRandom4StarResonator());
        console.log('pity 4 pulled');
        continue;
      }
      
      let randomChance = Math.random();      
  
      if(randomChance < fiveStarChance){
        console.log('chance rate', randomChance);
        console.log('five chance rate', fiveStarChance);
        console.log('Since last 5 pity', pulledResults.length + newPulls.length - last5PullIndex);
        newPulls.push(getRandom5StarResonator());
        console.log('5 Star Pulled');
      }else if(randomChance < fourStarChance){
        console.log('chance rate', randomChance);
        console.log('five chance rate', fiveStarChance);
        newPulls.push(getRandom4StarResonator());
      }else{
        newPulls.push({name: "3 Star", starRarity: 3, id: pulledResults.length});
      }
    }    
    setPullResults(prevResults => [...prevResults, ...newPulls]);
  }

  function findLastIndexOfPulls(pulledResults, newPulls){
    const lastPityIndexPulled = pulledResults.findLastIndex((pull) =>    
      pull.starRarity >= 4
    ) === -1 ? 0 : pulledResults.findLastIndex((pull) =>    
      pull.starRarity >= 4
    ) ;

    const last5PityIndexPulled = pulledResults.findLastIndex((pull) =>    
      pull.starRarity === 5
    ) === -1 ? 0 : pulledResults.findLastIndex((pull) =>    
      pull.starRarity === 5
    );

    const lastPityIndexNew = newPulls.findLastIndex((pull) =>    
      pull.starRarity >= 4
    ) === -1 ? 0 : newPulls.findLastIndex((pull) =>    
      pull.starRarity >= 4
    );

    const last5PityIndexNew = newPulls.findLastIndex((pull) =>    
      pull.starRarity === 5
    ) === -1 ? 0 : newPulls.findLastIndex((pull) =>    
      pull.starRarity === 5
    );

    return [(lastPityIndexPulled + lastPityIndexNew), (last5PityIndexPulled + last5PityIndexNew)];
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
          <button onClick={() => simulatePull(1)}>1 Convene</button>
          <button onClick={() => {simulatePull(10)}}>10 Convene</button>
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
