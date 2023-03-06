import { combineReducers } from 'redux';
import main from './modules/main';
import crew from './modules/crew';
import challenge from './modules/challenge';
import mypage from './modules/mypage';
import recommendation from './modules/recommendation';
import register from './modules/register';
import user from './modules/user';



export default combineReducers({
  user,
  main,
  crew,
  challenge,
  mypage,
  recommendation,
  register,
  user,
});
