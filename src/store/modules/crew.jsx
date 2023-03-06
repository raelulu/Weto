// 초기 상태값 지정
const initState = {
  crewInfo: [],
  infoShow: false,
  modalShow: false,
  crewDetail: [],
  crewChange: false,
  crewMain: false,
  page: 0,
};

// 액션명 지정
const CREWSHOW = 'crew/CREWSHOW';
const INFOSHOW = 'crew/INFOSHOW';
const MODALSHOW = 'crew/MODALSHOW';
const DETAILSHOW = 'crew/DETAILSHOW';
const CREWCHANGE = 'crew/CREWCHANGE';
const CREWPAGI = 'crew/CREWPAGI';

// 액션 함수 지정
export const crewShow = (data) => ({ type: CREWSHOW, payload: data });
export const infoShow = (show) => ({ type: INFOSHOW, payload: show });
export const modalShow = (show) => ({ type: MODALSHOW, payload: show });
export const detailShow = (data) => ({ type: DETAILSHOW, payload: data });
export const crewChange = (change) => ({ type: CREWCHANGE, payload: change });
export const crewPagination = (page) => ({ type: CREWPAGI, payload: page });

// 리덕스 지정
export default function crew(state = initState, action) {
  switch (action.type) {
    case CREWSHOW:
      return {
        ...state,
        crewInfo: action.payload,
      };
    case INFOSHOW:
      return {
        ...state,
        infoShow: action.payload,
      };
    case MODALSHOW:
      return {
        ...state,
        modalShow: action.payload,
      };
    case DETAILSHOW:
      return {
        ...state,
        crewDetail: action.payload,
      };
    case CREWCHANGE:
      return {
        ...state,
        crewChange: action.payload,
      };
    case CREWPAGI:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
