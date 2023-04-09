import { useEffect, useState } from "react"
import "./App.css"
import { InfoBar } from "./components/InfoBar"
import { Intro } from "./components/Intro"
import { Quiz } from "./components/Quiz"
import { MyContext } from "./context"
import { Score } from "./components/Score"

type LanguageOptions = "JavaScript" | "React"
export type GameStates = "notStarted" | "playing" | "finished"
function App() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOptions>("JavaScript")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0)
  const [gameState, setGameState] = useState<GameStates>("notStarted")
  const [gameScore, setGameScore] = useState<{
    correct: number
    incorrect: number
  }>({ correct: 0, incorrect: 0 })

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value as LanguageOptions)
  }

  const handleQuestionChange = (id: number) => {
    setCurrentQuestionId(id)
  }

  const resetGame = () => {
    setGameState("notStarted")
    setCurrentQuestionId(0)
    setGameScore({ correct: 0, incorrect: 0 })
  }

  const handleScoreChange = (correct: number, incorrect: number) => {
    setGameScore((prevState) => ({
      ...prevState,
      correct: prevState.correct + correct,
      incorrect: prevState.incorrect + incorrect,
    }))
  }

  // Render functions

  const renderIntro = () => {
    return <Intro setLanguage={handleLanguageChange} />
  }

  const renderQuiz = () => {
    return (
      <div className="app-wrapper">
        <Quiz
          selectedLanguage={selectedLanguage}
          setCurrentQuestionId={handleQuestionChange}
          currentQuestionId={currentQuestionId}
          setGameScore={handleScoreChange}
        />
        <InfoBar
          selectedLanguage={selectedLanguage}
          currentQuestionId={currentQuestionId}
          isPlaying={isPlaying}
        />
      </div>
    )
  }

  const renderScore = () => {
    return (
      <Score score={gameScore} setCurrentQuestionId={handleQuestionChange} />
    )
  }

  // Effect hook

  useEffect(() => {
    if (gameState === "playing") {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [gameState])

  return (
    <div className="page-wrapper">
      <MyContext.Provider value={{ gameState, setGameState }}>
        <div className="top-bar">
          <h1 onClick={resetGame} className="title">
            QuizApp
          </h1>
        </div>

        {gameState === "notStarted" ? renderIntro() : null}
        {gameState === "playing" ? renderQuiz() : null}
        {gameState === "finished" ? renderScore() : null}
      </MyContext.Provider>
    </div>
  )
}

export default App
