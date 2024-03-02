import './Tiles.scss'


export default function Tiles({ number, image }) {

    if (number % 2 === 0) {
        return (
            <div className='tiles white-tiles'>
                {image && <div className='chess-piece' style={{ backgroundImage: `url(${image})` }}></div>}
            </div>
        )
    } else {
        return (
            <div className='tiles black-tiles'>
                {image && <div className='chess-piece' style={{ backgroundImage: `url(${image})` }}></div>}
            </div>
        )
    }
}