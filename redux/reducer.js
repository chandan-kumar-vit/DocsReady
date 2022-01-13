import { GET_DOCS } from "./action";

const initialState = {
    docs: [],
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCS:
            return { ...state, docs: action.payload };
        default:
            return state;
    }
}

export default dataReducer;