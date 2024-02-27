import { useRef, useState } from "react";
import Tiles from "../Tiles/Tiles";
import './Chessboard.scss'
import Refree from "../../refree/refree";
import { horizontalAxis, verticalAxis, initialBoardState, PieceType, TeamType } from "../constants";


//Axis for the chessboard

//List to render in the chess-pieces
// const pieces = []




// const chessboardRef = useRef(null);
// let activePiece = null;

//Rendering powerful pieces





//Chessbaord application
export function Chessboard() {
    // function to grab pieces
    // const[enPassant, setEnPassant] = useState(true);
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

            const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
            const attackedPiece = pieces.find((p) => p.x === x && p.y === y)

            // console.log(currentPiece.x, currentPiece.y)
            // console.log(attackedPiece)


            if (currentPiece) {

                const validMove = refree.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces)

                const isEnPassantMove = refree.isEnPassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces)

                if (isEnPassantMove) {
                    const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

                    const updatePieces = pieces.reduce((results, piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            piece.enPassant = false
                            piece.x = x
                            piece.y = y
                            results.push(piece)
                        } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false
                            }
                            results.push(piece)
                        }
                        return results
                    }, [])
                    setPieces(updatePieces)

                } else if (validMove) {
                    const updatePieces = pieces.reduce((results, piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                                console.log("enpassant = true")
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            piece.x = x;
                            piece.y = y;
                            results.push(piece)
                        } else if (!(piece.x === x && piece.y === y)) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece)
                        }
                        return results;
                    }, [])
                    setPieces(updatePieces)

                } else {
                    activePiece.style.position = 'relative'
                    activePiece.style.removeProperty('top')
                    activePiece.style.removeProperty('left')
                }
            }

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
// eslint-disable-next-line react-refresh/only-export-components
export { PieceType, TeamType, initialBoardState };