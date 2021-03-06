import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN , 
    SIGN_OUT, 
    CREATE_STREAM, 
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type : SIGN_IN,
        payload : userId
    };
};

export const signOut = () => {
    return {
        type : SIGN_OUT
    };
};

//action creator for creating a stream
export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth; //uderId is unique for every user. This will be used for actions which is uniquely done by the user who has logged in such as delete/edit idea?
    const response = await streams.post('/streams', {...formValues, userId});

    dispatch({type: CREATE_STREAM, payload: response.data});
    // We want to do some programmatic navigation
    // to get the user back to the root route.
    history.push('/');
};

//for fetching streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({type: FETCH_STREAMS, payload: response.data});
};

//for fetching a particular record
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({type: FETCH_STREAM, payload: response.data});
};

//edit
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push('/');
};

//delete
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({type: DELETE_STREAM, payload: id});
    history.push('/');
};