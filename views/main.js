var html = require('choo/html')

var TITLE = '🚂🚋🚋'

module.exports = view

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const pattern = state.patterns[state.activePattern]
  const pct = pattern.currentStep / pattern.steps.length
  const stepHeight = 3
  const middle = stepHeight * (pattern.steps.length - 1) / 2
  const offset = middle - stepHeight * pattern.currentStep

  const bodyStyle = `
    height: 100%;
    overflow: hidden;
    font-family: sans-serif;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    background-color: hsl(${pct * 360}, 70%, 60%);
  `
  const h1Style = `
    position: absolute;
    margin: 0px;
    top: 10px;
    left: 10px;
  `
  const ulStyle = `
    transition: all 0.2s;
    list-style: none;
    padding: 1em;
    transform: translateY(${offset + 'rem'});
  `
  return html`
    <body style=${bodyStyle}>
      <h1 style=${h1Style}>${pattern.title}</h1>
      <ul style=${ulStyle}>
        ${pattern.steps.map((s, i) => step(s, i, pattern.currentStep === i))}
      </ul>
    </body>
  `
}

function step(text, index, active) {
  const liStyle = `
    height: 3rem;
    padding: 1em;
    opacity: 0.5;
    transition: all 0.2s;
    ${active
      ? `
      transform: scale(4, 4);
      transform-origin: 50% 50%;
      opacity: 1;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);
    `
      : ''}
  `
  return html`
    <li style=${liStyle}>${index + 1} - ${text}</li>
  `
}
