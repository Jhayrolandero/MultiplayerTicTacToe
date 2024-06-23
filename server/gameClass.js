class GameState {
  player1Socket;
  player2Socket;
  room;
  player1;
  player2;
  player1Score;
  player2Score;
  board = Array(9).fill(null);
  winner;
  round;
  matchStart;

  constructor(room, player1, player1Socket) {
    this.room = room;
    this.player1 = player1;
    this.player1Socket = player1Socket;
    this.matchStart = false;
  }

  JoinMatch = (player2, player2Socket) => {
    this.player2 = player2;
    this.player2Socket = player2Socket;
    this.round = true;
    this.matchStart = true;
  };

  PlayerMove = (index, value) => {
    this.gameState.grid[index] = value;
  };

  CheckWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a];
      }
    }
    return null;
  };

  FullBoard = () => {
    if (!this.board.includes(null) && !this.winner) return true;
    return false;
  };

  Room = () => {
    return this.room;
  };
}

module.exports = {
  GameState,
};
