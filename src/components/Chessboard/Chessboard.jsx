import React, { useRef } from "react";
import Tiles from "../Tiles/Tiles";
import './Chessboard.scss'


//Axis for the chessboard
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

//List to render in the chess-pieces
const pieces = []
// const chessboardRef = useRef(null);
let activePiece = null;

//Rendering powerful pieces
for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;
    pieces.push({ image: `src/assets/images/rook_${type}.png`, x: 0, y })
    pieces.push({ image: `src/assets/images/rook_${type}.png`, x: 7, y })
    pieces.push({ image: `src/assets/images/knight_${type}.png`, x: 1, y })
    pieces.push({ image: `src/assets/images/knight_${type}.png`, x: 6, y })
    pieces.push({ image: `src/assets/images/bishop_${type}.png`, x: 2, y })
    pieces.push({ image: `src/assets/images/bishop_${type}.png`, x: 5, y })
    pieces.push({ image: `src/assets/images/queen_${type}.png`, x: 3, y })
    pieces.push({ image: `src/assets/images/king_${type}.png`, x: 4, y })
}

//Rendering pawns
for (let i = 0; i < 8; i++) {
    pieces.push({ image: "src/assets/images/pawn_b.png", x: i, y: 6 })
}
for (let i = 0; i < 8; i++) {
    pieces.push({ image: "src/assets/images/pawn_w.png", x: i, y: 1 })
}




//Chessbaord application
export function Chessboard() {
    // function to grab pieces
    function grabPieces(e) {
        const element = e.target;

        if (element.classList.contains("chess-piece")) {
            console.log(e)
            const x = e.clientX - 30;
            const y = e.clientY - 30;
            console.log(`x = ${e.clientX} and y = ${e.clientY}`)

            console.log(x, y);
            element.style.position = "absolute"
            element.style.top = `${y}px`
            element.style.left = `${x}px`

            activePiece = element;
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
        if (activePiece) {
            activePiece = null;
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
    const chessboardRef = useRef(null);

    return (
        <div className="Chessboard" onMouseMove={e => movePiece(e)} onMouseDown={e => grabPieces(e)} onMouseUp={e => dropPiece(e)} id="chessboard" ref={chessboardRef}>
            {board}
        </div>
    );
}