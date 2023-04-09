import { MyContext } from "../context"
import { useContext } from "react"
interface ScoreProps {
  score: { correct: number; incorrect: number }
  setCurrentQuestionId: (id: number) => void
}

export const Score = ({ score, setCurrentQuestionId }: ScoreProps) => {
  const { gameState, setGameState } = useContext(MyContext)
  const resetGame = () => {
    setGameState("notStarted")
    setCurrentQuestionId(0)
  }
  return (
    <div className="score-container">
      <p>Correct answers: {score.correct}</p>
      <p>Incorrect answers: {score.incorrect}</p>
      <button onClick={resetGame}>Try Again!</button>
    </div>
  )
}
