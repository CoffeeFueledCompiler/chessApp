import {PieceType, TeamType} from '../components/Chessboard/Chessboard'


export default class Refree{


    isValidMove(px, py, x, y, type, team)
    {
        console.log("Refree is checking the move...")
        console.log(`Preceious location: ${px} ${py}, new location: ${x} ${y} , piece type: ${type}, team: ${team}`)
        // return true;

        //unable to compare PieceType
        if(type === PieceType.PAWN)
        {
            // your code
        }
        return false;
    }
}