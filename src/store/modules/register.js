const initState = {
  user: {},
};

const JOIN = 'register/join';

export function userJoin(payload) {
  return {
    type: JOIN,
    payload,
  };
}

export default function register(state = initState, action) {
  switch (action.type) {
    case JOIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
