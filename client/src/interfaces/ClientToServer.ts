
export interface ClientToServerEvents {
    quickPlay: ({user} : {user:string}) => void;
    update_score: ({xScore, yScore}: {xScore: number, yScore: number}) => void
    update_board: ({board} : {board: string[]}) => void
    update_player: ({player} : {player: string}) => void
    updateRound: ({round} : {round: boolean}) => void
}
  