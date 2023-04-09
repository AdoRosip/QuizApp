import { useContext, useState } from "react"
import { MyContext } from "../context"
interface IntroProps {
  setLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
export const Intro = ({ setLanguage }: IntroProps) => {
  const { gameState, setGameState } = useContext(MyContext)

  return (
    <div className="intro-page">
      <h1 className="intro-text">
        Welcome to a simple quiz app where you can test your general knowledge
        on different programming languages, frameworks, libraries and other
        concepts.
      </h1>
      <p>Select a topic you wish to be tested on.</p>
      <div className="question-section-wrapper">
        <select
          name="languages"
          className="languages-dropdown"
          onChange={setLanguage}
        >
          {["JavaScript", "React"].map((language) => {
            return (
              <option value={language} key={language}>
                {language}
              </option>
            )
          })}
        </select>
        <button
          className="start-button"
          onClick={() => {
            setGameState("playing")
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}
