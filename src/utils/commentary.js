export const getCommentary = (classification) => {
  const comments = {
    best: [
      "Perfect chess!",
      "Engine approved.",
      "Couldn't play it better.",
      "Spot on!"
    ],
    excellent: [
      "Excellent calculation!",
      "Very strong move.",
      "Nearly perfect."
    ],
    good: [
      "Solid play.",
      "Good choice.",
      "Well played."
    ],
    inaccuracy: [
      "Slight inaccuracy.",
      "A bit loose.",
      "Not optimal."
    ],
    mistake: [
      "That's a mistake.",
      "Opportunity missed.",
      "Not the best."
    ],
    blunder: [
      "Oh no, a blunder!",
      "Costly error.",
      "Game changer."
    ]
  }

  const category = comments[classification] || comments.inaccuracy
  return category[Math.floor(Math.random() * category.length)]
}

