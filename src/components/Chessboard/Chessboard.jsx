import { useRef, useState } from "react";
import Tiles from "../Tiles/Tiles";
import './Chessboard.scss'
import Refree from "../../refree/refree";
import { HORIZONTAL_AXIS, VERTICAL_AXIS, initialBoardState, PieceType, TeamType, GRID_SIZE, samePosition } from "../constants";

//Chessbaord application
export function Chessboard() {
    // function to grab pieces
    // const[enPassant, setEnPassant] = useState(true);
    const [activePiece, setActivePiece] = useState(null)
    const [grabbedPosition, setGrabbedPosition] = useState({ x: -1, y: -1 })
    // const [grabbedPosition.x, setgrabbedPosition.x] = useState(0);
    // const [grabbedPosition.y, setgrabbedPosition.y] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState);
    const chessboardRef = useRef(null);
    const refree = new Refree();

    function grabPieces(e) {
        const element = e.target;
        const chessboard = chessboardRef.current

        if (element.classList.contains("chess-piece") && chessboard) {
            // console.log(e)

            const grabbedX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabbedY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 560) / GRID_SIZE));
            setGrabbedPosition({ x: grabbedX, y: grabbedY })
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE / 2);
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
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 560) / GRID_SIZE))
            const currentPiece = pieces.find((p) => samePosition(p.position, grabbedPosition));

            if (currentPiece) {
                const validMove = refree.isValidMove(grabbedPosition.x, grabbedPosition.y, x, y, currentPiece.type, currentPiece.team, pieces)
                const isEnPassantMove = refree.isEnPassantMove(grabbedPosition.x, grabbedPosition.y, x, y, currentPiece.type, currentPiece.team, pieces)

                if (isEnPassantMove) {
                    const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

                    const updatePieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPieces)) {
                            piece.enPassant = false
                            piece.position.x = x
                            piece.position.y = y
                            results.push(piece)
                        } else if (!(piece.position.x === x && piece.position.y === y - pawnDirection)) {
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
                        if (piece.position.x === grabbedPosition.x && piece.position.y === grabbedPosition.y) {
                            if (Math.abs(grabbedPosition.y - y) === 2 && piece.type === PieceType.PAWN) {
                                console.log("enpassant = true")
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece)
                        } else if (!(piece.position.x === x && piece.position.y === y)) {
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

    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            const number = i + j + 2;
            const piece = pieces.find((p) => p.position.x === i && p.position.y === j);
            let image = piece ? piece.image : undefined;
            board.push(<Tiles key={`${i}${j}`} number={number} image={image} />)
        }
    }

    return (
        <div className="Chessboard" onMouseMove={e => movePiece(e)} onMouseDown={e => grabPieces(e)} onMouseUp={e => dropPiece(e)} id="chessboard" ref={chessboardRef}>
            {board}
        </div>
    );
}
