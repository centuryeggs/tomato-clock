import { ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODOS } from '../actionTypes'


export default (state: any[] = [], action: any): any => {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload,...state ]

    case INIT_TODOS:
      return action.payload

    case UPDATE_TODOS:
      return state.map(t => {
        if (action.payload.id === t.id) {
          return action.payload
        } else {
          return t
        }
      })
    case EDIT_TODOS:
      return state.map((t) => {
        if (action.payload === t.id) {
          return Object.assign({}, t, { editing: true })
        } else {
          return Object.assign({}, t, { editing: false })
        }
      })

    default: return state
  }

}
