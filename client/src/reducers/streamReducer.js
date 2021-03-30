import _ from 'lodash';

import {
    CREATE_STREAM, 
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';


// Redux requirement : Always return a new object!!!!!!
export default (state = {}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}; //we are taking state object, creating a new object with keys as the id of the prev object and value as the object
        case CREATE_STREAM :
            return {...state, [action.payload.id] : action.payload};
        case FETCH_STREAM:
            return {...state, [action.payload.id] : action.payload}; // returning a new object
        case EDIT_STREAM:
            return {...state, [action.payload.id] : action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload); //we do not have to do '.id' also as in this case action.payload is the id itself.(actions/index.js)
            //omit is not going to change the actual object. It creates a new object without the object that is being omitted.
        default:
            return state;
    }
}