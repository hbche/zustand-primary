import { useShallow } from 'zustand/react/shallow';
import useGameStore from '../store/use-game-store';
import Square from './square';

type SquareType = 'X' | 'O' | null;

// 计算赢家
function calculateWinner(squares: SquareType[]): SquareType {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// 计算可选择的格子的数量
function calculateTurns(squares: SquareType[]): number {
  return squares.filter((square) => !square).length;
}

// 计算游戏状态:游戏结束存在赢家,游戏结束不存在赢家,未结束当前选手
function calculateStatus(winner: SquareType, turns: number, player: string) {
  if (!winner && !turns) return 'Draw';
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useGameStore(
    useShallow((state) => [state.xIsNext, state.setXIsNext])
  );

  const [squares, setSquares] = useGameStore(
    useShallow((state) => [state.squares, state.setSquares])
  );

  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O';
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i: number) => {
    // 如果已经被填写了 X \ O ,则直接返回,避免覆盖
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            value={square}
            key={squareIndex}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  );
}
