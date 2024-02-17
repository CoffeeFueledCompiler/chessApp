import { PieceType, TeamType } from '../components/Chessboard/Chessboard'


export default class Refree {


    isValidMove(px, py, x, y, type, team) {
        console.log("Refree is checking the move...")
        console.log(`Previous location: ${px} ${py}, new location: ${x} ${y} , piece type: ${type}, team: ${team}`)
        // return true;
        console.log(type === PieceType.PAWN)

        //unable to compare PieceType
        if (type === PieceType.PAWN) {
            if (team === TeamType.OUR) {
                if (py === 1) {
                    if (px === x && (y - py === 1 || y - py === 2)) {
                        console.log("Valid move!")
                        return true;
                    }
                } else {
                    if (px === x && y - py === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}