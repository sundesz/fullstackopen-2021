import anecdoteService from '../services/anecdotes'
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'CREATE':
      return [...state, action.payload]
    case 'VOTE':
      return state.map((a) => (a.id === action.payload.id ? action.payload : a))
    default:
      return state
  }
}

export const castVote = (id, anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({ type: 'VOTE', payload: savedAnecdote })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.create(anecdote)
    dispatch({ type: 'CREATE', payload: savedAnecdote })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', payload: anecdotes })
  }
}

export default reducer
