export const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"]

export const GRID_SIZE = 70;

export function samePosition(p1, p2){
    return p1.x === p2.x && p1.y === p2.y 
}

export const PieceType = {
    PAWN: 0,
    BISHOP: 1,
    KNIGHT: 2,
    ROOK: 3,
    QUEEN: 4,
    KING: 5,
}

export const TeamType = {
    OPPONENT: 0,
    OUR: 1
}

//List to render in the chess-pieces
export const initialBoardState = [
    { image: `src/assets/images/rook_b.png`, position: { x: 0, y: 7 }, type: PieceType.ROOK, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/knight_b.png`, position: { x: 1, y: 7 }, type: PieceType.KNIGHT, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/bishop_b.png`, position: { x: 2, y: 7 }, type: PieceType.BISHOP, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/queen_b.png`, position: { x: 3, y: 7 }, type: PieceType.QUEEN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/king_b.png`, position: { x: 4, y: 7 }, type: PieceType.KING, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/bishop_b.png`, position: { x: 5, y: 7 }, type: PieceType.BISHOP, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/knight_b.png`, position: { x: 6, y: 7 }, type: PieceType.KNIGHT, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/rook_b.png`, position: { x: 7, y: 7 }, type: PieceType.ROOK, team: TeamType.OPPONENT, enPassant: false },
    //Black Pawns
    { image: `src/assets/images/pawn_b.png`, position: { x: 0, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 1, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 2, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 3, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 4, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 5, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 6, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },
    { image: `src/assets/images/pawn_b.png`, position: { x: 7, y: 6 }, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false },

    { image: `src/assets/images/rook_w.png`, position: { x: 0, y: 0 }, type: PieceType.ROOK, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/knight_w.png`, position: { x: 1, y: 0 }, type: PieceType.KNIGHT, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/bishop_w.png`, position: { x: 2, y: 0 }, type: PieceType.BISHOP, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/queen_w.png`, position: { x: 3, y: 0 }, type: PieceType.QUEEN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/king_w.png`, position: { x: 4, y: 0 }, type: PieceType.KING, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/bishop_w.png`, position: { x: 5, y: 0 }, type: PieceType.BISHOP, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/knight_w.png`, position: { x: 6, y: 0 }, type: PieceType.KNIGHT, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/rook_w.png`, position: { x: 7, y: 0 }, type: PieceType.ROOK, team: TeamType.OUR, enPassant: false },

    { image: `src/assets/images/pawn_w.png`, position: {x: 0, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 1, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 2, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 3, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 4, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 5, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 6, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
    { image: `src/assets/images/pawn_w.png`, position: {x: 7, y: 1}, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false },
]


