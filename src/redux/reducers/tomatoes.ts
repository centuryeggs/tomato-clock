import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from '../actionTypes'

export default (state: any[] = [], action: any): any => {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]

    case INIT_TOMATOES:
      return [...action.payload]
      
    case UPDATE_TOMATO:
      return state.map(t => {
        if (action.payload.id === t.id) {
          return action.payload
        } else {
          return t
        }
      })
    default: return state
  }

}
