import { Carousel } from 'antd';
import banner1 from '../../static/images/banner1.png'
import banner2 from '../../static/images/banner2.png'
import banner3 from '../../static/images/banner3.png'

const MainCrew = () => (
  <Carousel autoplay>
        <img src={banner1} alt="" />
        <img src={banner2} alt="" />
        <img src={banner3} alt="" />
  </Carousel>
);
export default MainCrew;
