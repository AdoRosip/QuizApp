import { useContext, useEffect, useState } from "react"
import questions from "../questions.json"
import { MyContext } from "../context"

interface InfoBarProps {
  selectedLanguage: "JavaScript" | "React"
  currentQuestionId: number
  isPlaying: boolean
}

export const InfoBar = ({
  selectedLanguage,
  currentQuestionId,
  isPlaying,
}: InfoBarProps) => {
  const numberOfQuestions = questions[selectedLanguage]
  const [time, setTime] = useState(0)
  const { gameState, setGameState } = useContext(MyContext)

  useEffect(() => {
    let interval: number
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  function formatTime(time: number): string {
    let seconds = Math.floor((time / 1000) % 60)
    let minutes = Math.floor(time / 1000 / 60)

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const checkGameState = () => {
    if (currentQuestionId === numberOfQuestions.length) {
      setGameState("finished")
    }
  }

  useEffect(() => {
    console.log(currentQuestionId, numberOfQuestions.length)
    checkGameState()
  }, [currentQuestionId])

  return (
    <div className="questions-tab">
      <div className="top-row">
        <p id="out-of">{`${currentQuestionId + 1} / ${
          numberOfQuestions.length
        }`}</p>
        <p id="time">{formatTime(time)}</p>
      </div>
      <div className="question-list">
        {numberOfQuestions.map((question) => {
          return (
            <button
              key={question.questionId}
              className={
                currentQuestionId + 1 === question.questionId
                  ? "question-button current-question"
                  : "question-button"
              }
            >
              {question.questionId}
            </button>
          )
        })}
      </div>
    </div>
  )
}
