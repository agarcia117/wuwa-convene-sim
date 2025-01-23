export default function ResonatorCard(props){
  return(
    <>
      <div className="resonator-card">
        <img src={`/resonatorPortraits/${props.name}_Card.webp`} alt={`Image of ${props.name}`} />
        <div className="resonator-card-info">
          <h1>{props.name}</h1>
          <p>Star Rarity: {props.starRarity}</p>
        </div>
      </div>
    </>
  )
}