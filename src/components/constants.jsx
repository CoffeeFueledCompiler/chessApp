export const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export const initialBoardState = []

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

for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.OUR
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const y = (teamType === TeamType.OPPONENT) ? 7 : 0;
    initialBoardState.push({ image: `src/assets/images/rook_${type}.png`, x: 0, y, type: PieceType.ROOK, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/rook_${type}.png`, x: 7, y, type: PieceType.ROOK, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/knight_${type}.png`, x: 1, y, type: PieceType.KNIGHT, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/knight_${type}.png`, x: 6, y, type: PieceType.KNIGHT, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/bishop_${type}.png`, x: 2, y, type: PieceType.BISHOP, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/bishop_${type}.png`, x: 5, y, type: PieceType.BISHOP, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/queen_${type}.png`, x: 3, y, type: PieceType.KING, team: TeamType, enPassant: false })
    initialBoardState.push({ image: `src/assets/images/king_${type}.png`, x: 4, y, type: PieceType.KING, team: TeamType, enPassant: false })
}

//Rendering pawns
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "src/assets/images/pawn_b.png", x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT, enPassant: false })
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "src/assets/images/pawn_w.png", x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR, enPassant: false })
}