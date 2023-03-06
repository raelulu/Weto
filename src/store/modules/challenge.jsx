const initState = {
  challenge: [
    {
      name: '아침 운동하기 Challenge',
      content:
        '오전 6~11시 사이의 운동 인증샷을 올리면 기부금 1000원이 추가됩니다.\n일자와 시간이 적힌 인증사진을 올려주세요.\n※ 미충족 시, 게시글은 통보없이 삭제될 수 있습니다.',
      price: 1000,
    },
    {
      name: '저녁 운동하기 Challenge',
      content:
        '오후 5~10시 사이의 운동 인증샷을 올리면 기부금 1000원이 추가됩니다.\n일자와 시간이 적힌 인증사진을 올려주세요.\n※ 미충족 시, 게시글은 통보없이 삭제될 수 있습니다.',
      price: 1000,
    },
    {
      name: '5km 달리기 Challenge',
      content:
        '5km 달리기 인증샷을 올리면 기부금 1000원이 추가됩니다.\nkm와 시간이 적힌 인증사진을 올려주세요.\n※ 미충족 시, 게시글은 통보없이 삭제될 수 있습니다.',
      price: 1000,
    },
    {
      name: '1시간 운동하기 Challenge',
      content:
        '운동 인증샷을 올리면 기부금 1000원이 추가됩니다.\n시간, 심박수 등 확인 가능한 인증사진을 올려주세요.\n※ 미충족 시, 게시글은 통보없이 삭제될 수 있습니다.',
      price: 1000,
    },
  ],
  infoObj: {},
  modal: false,
  infoShow: false,
  goUpload: false,
  rerender: false,
};

const INFO = 'challenge/INFO';
const MODAL = 'challenge/MODAL';
const INFOSHOW = 'challenge/INFOSHOW';
const INFOCHANGE = 'challenge/INFOCHANGE';
const GOUPLOAD = 'challenge/GOUPLOAD';
const RERENDER = 'challenge/RERENDER';

export const info = () => ({ type: INFO });
export const modal = (show) => ({ type: MODAL, payload: show });
export const infoshow = (show) => ({ type: INFOSHOW, payload: show });
export const infochange = (data) => ({ type: INFOCHANGE, payload: data });
export const goupload = (show) => ({ type: GOUPLOAD, payload: show });
export const reRender = (show) => ({ type: RERENDER, payload: show });

export default function challenge(state = initState, action) {
  switch (action.type) {
    case INFO:
      return state;
    case MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case INFOSHOW:
      return {
        ...state,
        infoShow: action.payload,
      };
    case INFOCHANGE:
      return {
        ...state,
        infoObj: action.payload,
      };
    case GOUPLOAD:
      return {
        ...state,
        goUpload: action.payload,
      };
    case RERENDER:
      return {
        ...state,
        rerender: action.payload,
      };
    default:
      return state;
  }
}
