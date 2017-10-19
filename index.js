var css = require('sheetify')
var choo = require('choo')

var Store = require('./store.js')
var dataStore = new Store({
  configName: 'patterns',
  defaults: [
    {
      title: 'Example pattern',
      steps: ['do this', 'do that'],
    },
    {
      title: 'Example two',
      steps: ['foo', 'bar', 'baz'],
    },
  ],
})

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}

app.use(store)

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

function store(state, emitter) {
  var data = dataStore.getData()
  state.patterns = data.map(pattern =>
    Object.assign({}, pattern, { currentStep: 0 })
  )
  state.activePattern = 0
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
      state.patterns[state.activePattern].currentStep--
      if (state.patterns[state.activePattern].currentStep < 0) {
        state.patterns[state.activePattern].currentStep = 0
      }
      emitter.emit('render')
    } else if (event.key === 'ArrowDown') {
      state.patterns[state.activePattern].currentStep++
      if (
        state.patterns[state.activePattern].currentStep >=
        state.patterns[state.activePattern].steps.length
      ) {
        state.patterns[state.activePattern].currentStep =
          state.patterns[state.activePattern].steps.length - 1
      }
      emitter.emit('render')
    } else if (event.key === 'ArrowLeft') {
      state.activePattern--
      if (state.activePattern < 0) {
        state.activePattern = 0
      } else {
        emitter.emit('render')
      }
    } else if (event.key === 'ArrowRight') {
      state.activePattern++
      if (state.activePattern >= state.patterns.length) {
        state.activePattern = state.patterns.length - 1
      } else {
        emitter.emit('render')
      }
    }
  })
}

if (!module.parent) app.mount('body')
else module.exports = app
