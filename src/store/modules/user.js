const initState = {
  userInfo: {},
};

const USER_INFO = 'user/USERINFO';

export function userInfoCreate(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}

export default function user(state = initState, action) {
  switch (action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
