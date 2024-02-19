import { PieceType, TeamType } from '../components/Chessboard/Chessboard'


export default class Refree {

    tileIsOccupied(x, y, initialBoardState) {
        console.log("checking if tile is occupied..")

        const piece = initialBoardState.find(p => p.x === x && p.y ===y)
        if(piece){
            return true;
        }else{
            return false;
        }
    }


    isValidMove(px, py, x, y, type, team, initialBoardState) {
        console.log("Refree is checking the move...")
        console.log(`Previous location: ${px} ${py}, new location: ${x} ${y} , piece type: ${type}, team: ${team}`)
        // return true;
        console.log(type === PieceType.PAWN)

        //unable to compare PieceType
        if (type === PieceType.PAWN) {
            if (team === TeamType.OUR) { //if the team is ours
                if (py === 1) {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, initialBoardState)) {
                            return true;
                        }
                    }else if(px === x && y - py === 2)
                    {
                        if(!this.isValidMove(x, y, initialBoardState) && !this.isValidMove(x, y-1, initialBoardState)){
                            return true;
                        }
                    }
                } else {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, initialBoardState)) {
                            return true;
                        }
                    }
                }
            } else { //if it is black
                if (py === 6) {
                    if (px === x && (y - py === -1 || y - py === -2)) {
                        return true;
                    }
                } else {
                    if (px === x && y - py === -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}