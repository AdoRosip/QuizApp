import { createContext } from 'react';
import { GameStates } from './App';
interface MyContextValue {
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<GameStates>>;
}

export const MyContext = createContext<MyContextValue>({
  gameState: "notStarted",
  setGameState: () => {},
});