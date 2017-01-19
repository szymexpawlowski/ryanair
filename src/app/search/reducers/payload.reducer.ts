import { PayloadActions } from '../actions';
import { Payload } from '../models';

export interface IPayloadState {
  payload: Payload;
}

const INITIAL_STATE: IPayloadState = {
  payload: {
    from: '',
    to: '',
    startDate: '',
    endDate: ''
  }
};

export function payloadReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PayloadActions.SET_PAYLOAD:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
