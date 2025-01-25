import resonators from './Resonators.js'
import ResonatorCard from './components/ResonatorCard.jsx'
import ReactPlayer from 'react-player'
import './App.css'
import { useState } from 'react'

function App() {

  const [pulledResults, setPullResults] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [rarityFromLastPull, setRarityFromLastPull] = useState(null);
  
  const pullElements = pulledResults.slice().reverse().map((resonator, index) => {
    return <ResonatorCard key={index} name={resonator.name} starRarity={resonator.starRarity} index={index}/>;
  });

  function simulatePull(pullsToDo){
    let newPulls = [...pulledResults];
    
    let highestRarityFound = 3;
    for(let i = 0; i < pullsToDo; i++){      
      const [lastPityPullIndex, last5PullIndex] = findLastIndexOfPulls(newPulls);

      console.log(lastPityPullIndex, last5PullIndex);
  
      let fiveStarChance;
      if(newPulls.length - last5PullIndex >= 65){
        fiveStarChance = 0.008 + (newPulls.length - last5PullIndex - 64) * 0.05;
        console.log(fiveStarChance, 'five star chance with soft pity going');
      }else{
        fiveStarChance = 0.008;
      }
      const fourStarChance = 0.06 + fiveStarChance;      

      if(newPulls.length - lastPityPullIndex === 10){
        newPulls.push(getRandom4StarResonator());
        highestRarityFound = highestRarityFound < 4 ? 4 : highestRarityFound;
        console.log('pity 4 pulled');
        continue;
      }
      
      let randomChance = Math.random();      
      if(randomChance < fiveStarChance){
        console.log('chance rate', randomChance);
        console.log('five chance rate', fiveStarChance);
        console.log('Since last 5 pity', newPulls.length - last5PullIndex);
        newPulls.push(getRandom5StarResonator());
        highestRarityFound = highestRarityFound < 5 ? 5 : highestRarityFound;
        console.log('5 Star Pulled');
      }else if(randomChance < fourStarChance){
        console.log('chance rate', randomChance);
        console.log('five chance rate', fiveStarChance);
        highestRarityFound = highestRarityFound < 4  ? 4 : highestRarityFound;
        newPulls.push(getRandom4StarResonator());
      }else{
        newPulls.push({name: "3 Star", starRarity: 3, id: newPulls.length});
        highestRarityFound = highestRarityFound === 3 ? 3 : highestRarityFound;
      }
    }
    //console.log(highestRarityFound);
        
    setPullResults(prevResults => [...prevResults, ...newPulls.slice(newPulls.length - pullsToDo)]);
    setRarityFromLastPull(`${highestRarityFound}Star`);
    setShowVideo(true);
  }

  function findLastIndexOfPulls(pulls){
    const lastPityIndexNew = pulls.findLastIndex((pull) =>    
      pull.starRarity >= 4
    );

    const last5PityIndexNew = pulls.findLastIndex((pull) =>    
      pull.starRarity === 5
    );

    return [lastPityIndexNew, last5PityIndexNew];
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
  const [, last5PullIndex] = findLastIndexOfPulls(pulledResults);
    
  return (
    <>
    {showVideo && <ReactPlayer 
                        playing={true} 
                        height='100%'
                        width='100%'
                        onEnded={() => setShowVideo(false)}
                        onClick={() => setShowVideo(false)} 
                        url={`/gachaAnimations/Wuwa_${rarityFromLastPull}Animation.mp4`} />}

    {!showVideo && <main>
      <div className='convene-container'>
        <h1 style={{marginTop:"10px"}}>Convene Pulling Simulator</h1>
        <img className='convene-art' src="/conveneSplashArt/roccia_convene_art.webp" alt="Splash Art for Convene" />
        <div className='convene-buttons-container'>
          <button onClick={() => simulatePull(1)}>1 Convene</button>
          <button onClick={() => {simulatePull(10)}}>10 Convene</button>
        </div>
        <p className='pull-pity-indicator'>
          {`Pulls Since Hard Pity: `} 
          <b>{` ${pulledResults.length - last5PullIndex - 1}/90`}</b>
        </p>
        <div className='resonator-card-container'>
          {pullElements.slice(0, 10)}
        </div>
      </div>
    </main>}
    </>
  )
}

export default App
