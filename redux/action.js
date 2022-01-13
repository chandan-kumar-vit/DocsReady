export const GET_DOCS = 'DOCS';

export const setDocs = (docs) => dispatch => {
    dispatch({
        type: GET_DOCS,
        payload: docs
    });
};