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

      let fiveStarChance;
      if(newPulls.length - last5PullIndex === 80){
        newPulls.push(getRandom5StarResonator(newPulls));        
        highestRarityFound = highestRarityFound < 5 ? 5 : highestRarityFound;
        console.log('hard pity hit');
        continue;
      }else if(newPulls.length - last5PullIndex >= 65){
        fiveStarChance = 0.008 + (newPulls.length - last5PullIndex - 64) * 0.04;
      }else{
        fiveStarChance = 0.008;
      }
      const fourStarChance = 0.06 + fiveStarChance;      

      if(newPulls.length - lastPityPullIndex === 10){
        newPulls.push(getRandom4StarResonator());
        highestRarityFound = highestRarityFound < 4 ? 4 : highestRarityFound;
        continue;
      }
      
      let randomChance = Math.random();      
      if(randomChance < fiveStarChance){
        newPulls.push(getRandom5StarResonator(newPulls));
        highestRarityFound = highestRarityFound < 5 ? 5 : highestRarityFound;
      }else if(randomChance < fourStarChance){
        highestRarityFound = highestRarityFound < 4  ? 4 : highestRarityFound;
        newPulls.push(getRandom4StarResonator());
      }else{
        newPulls.push({name: "3 Star", starRarity: 3, id: newPulls.length});
        highestRarityFound = highestRarityFound === 3 ? 3 : highestRarityFound;
      }
    }
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

    const isFeaturedCharacter = Math.random() < 0.5;
    const featuredCharacters = ['Yuanwu', 'Danjin', 'Youhu'];
    if(isFeaturedCharacter){
      const featuredFourStars = fourStarResonators.filter(resonatorObj => {
        return featuredCharacters.includes(resonatorObj.name) ? resonatorObj : null;
      });

      return featuredFourStars[Math.floor(Math.random() * featuredFourStars.length)];
    }
    
    return fourStarResonators[Math.floor(Math.random() * fourStarResonators.length)];
  }

  function getRandom5StarResonator(pulls){
    const featuredCharacter = 'Roccia';
    const [, last5PullIndex] = findLastIndexOfPulls(pulls);
    
    const fiveStarResonators = resonators.filter(resonatorObj => {
      return resonatorObj.starRarity === 5 ? resonatorObj : null;
    });
    
    if(pulls[last5PullIndex] !== undefined && pulls[last5PullIndex].name !== featuredCharacter){
      console.log('Guaranteed 5 hit after lost 50/50');
      
      return fiveStarResonators.filter(resonatorObj => {
        return resonatorObj.name === featuredCharacter;
      })[0];
    }

    const isFeaturedCharacter = Math.random() < 0.5;
    if(isFeaturedCharacter){
      const featuredFiveStar = fiveStarResonators.filter(resonatorObj => {
        return featuredCharacter == resonatorObj.name ? resonatorObj : null;
      });

      return featuredFiveStar[Math.floor(Math.random() * featuredFiveStar.length)];
    }

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
          <b>{` ${pulledResults.length - last5PullIndex - 1}/80`}</b>
        </p>
        <p>Total Pulls: {pulledResults.length}</p>
        <div className='resonator-card-container'>
          {pullElements.slice(0, 10)}
        </div>
      </div>
    </main>}
    </>
  )
}

export default App
