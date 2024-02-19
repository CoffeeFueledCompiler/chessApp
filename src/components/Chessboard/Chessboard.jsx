import { useRef, useState } from "react";
import Tiles from "../Tiles/Tiles";
import './Chessboard.scss'
import Refree from "../../refree/refree";


//Axis for the chessboard
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

//List to render in the chess-pieces
// const pieces = []
const initialBoardState = []
const PieceType = {
    PAWN: 0,
    BISHOP: 1,
    KNIGHT: 2,
    ROOK: 3,
    QUEEN: 4,
    KING: 5,
}

const TeamType = {
    OPPONENT: 0,
    OUR: 1
}
// const chessboardRef = useRef(null);
// let activePiece = null;

//Rendering powerful pieces
for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.OUR
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const y = (teamType === TeamType.OPPONENT) ? 7 : 0;
    initialBoardState.push({ image: `src/assets/images/rook_${type}.png`, x: 0, y, type: PieceType.ROOK, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/rook_${type}.png`, x: 7, y, type: PieceType.ROOK, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/knight_${type}.png`, x: 1, y, type: PieceType.KNIGHT, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/knight_${type}.png`, x: 6, y, type: PieceType.KNIGHT, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/bishop_${type}.png`, x: 2, y, type: PieceType.BISHOP, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/bishop_${type}.png`, x: 5, y, type: PieceType.BISHOP, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/queen_${type}.png`, x: 3, y, type: PieceType.KING, team: TeamType })
    initialBoardState.push({ image: `src/assets/images/king_${type}.png`, x: 4, y, type: PieceType.KING, team: TeamType })
}

//Rendering pawns
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "src/assets/images/pawn_b.png", x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT })
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "src/assets/images/pawn_w.png", x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR })
}




//Chessbaord application
export function Chessboard() {
    // function to grab pieces
    const [activePiece, setActivePiece] = useState(null)
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState);
    const chessboardRef = useRef(null);
    const refree = new Refree();

    function grabPieces(e) {
        const element = e.target;
        const chessboard = chessboardRef.current

        if (element.classList.contains("chess-piece") && chessboard) {
            // console.log(e)

            const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
            const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 560) / 70));
            setGridX(gridX)
            setGridY(gridY)
            const x = e.clientX - 30;
            const y = e.clientY - 30;
            // console.log(`x = ${e.clientX} and y = ${e.clientY}`)

            // console.log(x, y);
            element.style.position = "absolute"
            element.style.top = `${y}px`
            element.style.left = `${x}px`

            setActivePiece(element);
        }



    }

    function movePiece(e) {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 12  //x  = width
            const minY = chessboard.offsetTop - 12 //y = height
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 55
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 55

            const x = e.clientX - 35;
            const y = e.clientY - 35;

            activePiece.style.position = "absolute"

            // snapping the pieces by constraning them to the offset
            if (x < minX) {
                activePiece.style.left = `${minX}px`
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`
            }
            else {
                activePiece.style.left = `${x}px`
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`
            }
            else {
                activePiece.style.top = `${y}px`
            }
        }
    }


    function dropPiece(e) {
        if (activePiece && chessboardRef) {
            const chessboard = chessboardRef.current

            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 70)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 560) / 70))

            // console.log(x, y)

            setPieces((value) => {
                const pieces = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        const validMove = refree.isValidMove(gridX, gridY, x, y, p.type, p.team, value);
                        if(validMove){
                            p.x = x;
                            p.y = y;
                        }else{
                            activePiece.style.position = 'relative'
                            activePiece.style.removeProperty('top')
                            activePiece.style.removeProperty('left')
                        }

                    }
                    return p;
                })
                return pieces;
            })

            setActivePiece(null)
        }
    }

    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = i + j + 2;
            let image = "";

            pieces.forEach((p) => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })

            board.push(<Tiles key={`${i}${j}`} number={number} image={image} />)
        }
    }

    return (
        <div className="Chessboard" onMouseMove={e => movePiece(e)} onMouseDown={e => grabPieces(e)} onMouseUp={e => dropPiece(e)} id="chessboard" ref={chessboardRef}>
            {board}
        </div>
    );
}
export { PieceType, TeamType, initialBoardState };