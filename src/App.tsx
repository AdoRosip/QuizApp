import { useState } from "react"
import "./App.css"
import { InfoBar } from "./components/InfoBar"
import { Intro } from "./components/Intro"
import { Quiz } from "./components/Quiz"

// interface questionFormat {
//   questionId: number
//   question: string
//   answers: Array<string>
//   correctAnswer: string
// }

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("JavaScript")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0)

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value)
  }
  const handleGameState = () => {
    setIsPlaying(!isPlaying)
  }
  const handleQuestionChange = (id: number) => {
    setCurrentQuestionId(id)
  }

  return (
    <div className="page-wrapper">
      <div className="top-bar">
        <h1 className="title">QuizApp</h1>
      </div>

      {!isPlaying ? (
        <Intro
          setLanguage={handleLanguageChange}
          setIsPlaying={handleGameState}
        />
      ) : (
        <div className="app-wrapper">
          <Quiz
            selectedLanguage={selectedLanguage}
            setCurrentQuestionId={handleQuestionChange}
            currentQuestionId={currentQuestionId}
          />
          <InfoBar
            selectedLanguage={selectedLanguage}
            currentQuestionId={currentQuestionId}
            isPlaying={isPlaying}
          />
        </div>
      )}

      {/* <div className="results">
          <h2>Correct Answers: {correctAnswer}</h2>
          <h2>Wrong Answers: {wrongAnswers}</h2>
        </div> */}
    </div>
  )
}

export default App
