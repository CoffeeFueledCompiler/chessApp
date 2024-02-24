import { PieceType, TeamType } from '../components/Chessboard/Chessboard'


export default class Refree {

    tileIsOccupied(x, y, initialBoardState) {
        console.log("checking if tile is occupied..")
        
        const piece = initialBoardState.find(p => p.x === x && p.y === y)
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(x, y, initialBoardState, team){
        
        const piece = initialBoardState.find((p) => p.x === x && p.y === y && p.team!==team)

        if(piece){
            return true;
        }else{
            return false
        }
    }

    isValidMove(px, py, x, y, type, team, initialBoardState) {
        // console.log("Refree is checking the move...")
        // console.log(`Previous location: ${px} ${py}, new location: ${x} ${y} , piece type: ${type}, team: ${team}`)
        // // return true;
        // console.log(type === PieceType.PAWN)

        //MOVEMENT LOGIC
        if (type == PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

            if(px === x && py === specialRow && y - py === 2*pawnDirection){
                if(!this.tileIsOccupied(x, y, initialBoardState) && !this.tileIsOccupied(x, y-pawnDirection, initialBoardState)){
                    return true
                }
            }else if(px === x && y-py === pawnDirection){
                if(!this.tileIsOccupied(x, y, initialBoardState)){
                    return true;
                }
            }
            else if(x - px === -1 && y - py === pawnDirection){
                console.log("Upper/bottom left corner")
                if(this.tileIsOccupiedByOpponent(x, y, initialBoardState, team)){
                    return true;
                }
            }else if(x - px === 1 && y - py === pawnDirection){
                console.log("Upper/bottom right corner")
                if(this.tileIsOccupiedByOpponent(x, y, initialBoardState, team)){
                    return true;
                }
            }
        }
        return false;
    }
}