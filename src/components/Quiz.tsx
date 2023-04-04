import { useState } from "react"
import questions from "../questions.json"
// interface questionFormat {
//   questionId: number
//   question: string
//   answers: Array<string>
//   correctAnswer: string
// }
interface QuizProps {
  selectedLanguage: string
  currentQuestionId: number
  setCurrentQuestionId: (id: number) => void
}

export const Quiz = ({
  selectedLanguage,
  currentQuestionId,
  setCurrentQuestionId,
}: QuizProps) => {
  const question =
    selectedLanguage === "JavaScript"
      ? questions.JavaScript[currentQuestionId]
      : questions.React[currentQuestionId]
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | string | undefined
  >(undefined)
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = useState<number>(0)
  //
  const evaluateAnswer = () => {
    if (selectedAnswer === question.correctAnswer) {
      setCorrectAnswer((prev) => prev + 1)
    } else {
      setWrongAnswers((prev) => prev + 1)
    }
    setCurrentQuestionId(currentQuestionId + 1)
  }

  const handleSubmit = () => {
    if (selectedAnswer === undefined) {
      alert("Please select an answer!")
    } else {
      evaluateAnswer()
      setSelectedAnswer(undefined)
    }
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-topic">{selectedLanguage}</div>
      <div className="question">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer, index) => {
          return (
            <div className="button-container" key={answer}>
              <div className="number-of-question">{index + 1}</div>
              <button
                className="answer-button"
                onClick={() => setSelectedAnswer(answer)}
                key={answer}
              >
                {answer}
              </button>
            </div>
          )
        })}
      </div>
      <div className="buttons-wrapper">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}
