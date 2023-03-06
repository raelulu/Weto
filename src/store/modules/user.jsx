// 초기값 지정
const initState = {
  user_name: '',
};

// 액션타입 지정
const CHANGE = 'user/CHANGE';

// 액션함수 지정
export const change = (name) => ({ type: CHANGE, payload: { name: name } });

// 리듀서 지정
export default function user(state = initState, action) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        user_name: action.payload.name,
      };
    default:
      return state;
  }
}
