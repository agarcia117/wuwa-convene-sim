import { clsx } from "clsx"

export default function ResonatorCard(props){
  const className = clsx("resonator-card", props.starRarity === 4 && "four-star-card", props.starRarity === 3 && "three-star-card", props.starRarity === 5 && "five-star-card");

  const name = props.name === '3 Star' ? 'Eula' : props.name;
  return(
    <>
      <div className={className}>
        <img src={`/resonatorPortraits/${name}_Card.webp`} alt={`Image of ${props.name}`} />
        <div className="resonator-card-info">
          <h1>{props.name}</h1>
          <p>Star Rarity: {props.starRarity}</p>
          <p>{props.index}</p>
        </div>
      </div>
    </>
  )
}