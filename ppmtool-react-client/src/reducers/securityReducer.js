import { SET_CURRENT_USER } from "../actions/types"

const initialState = {
    user: {},
    validToken: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                user: payload,
                validToken: payload?true:false
            }

        default:
            return state
    }
}
