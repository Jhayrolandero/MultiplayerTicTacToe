export interface ServerToClientEvents {
    receive_update: (data : {xScore: number, yScore:number}) => void
    receive_updateBoard: (data : {squares : string[]}) => void
    receiveUpdatePlayer: (data : {player : string}) => void
    receiveUpdateRound: (data : {round: boolean}) => void
    startMatch: () => void
}
  