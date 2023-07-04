import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import yoga from '../../static/images/yoga.png';
import pilates from '../../static/images/pilates.png';
import running from '../../static/images/running.png';
import health from '../../static/images/health.png';
import tennis from '../../static/images/tennis.png';
import board from '../../static/images/board.png';
import swim from '../../static/images/swim.png';
import { useSelector } from 'react-redux';

const Outer = styled.div`
  /* width: 25%;
  height: 70vh;
  margin-top: 150px;
  border-radius: 20px;
  left: 10%; */
  display: inline-block;
  position: fixed;
  top: 160px;
  padding: 3%;
  left: 10%;
  height: 70vh;
  width: 25%;
  color: white;
  /* background-color: yellow; */
  @media (max-width: 912px) {
  }
`;
const Title = styled.div`
  /* position: relative; */
  font-size: 3vh;
  font-style: normal;
  font-weight: 400;
  @media (max-width: 912px) {
  }
`;

const WeatherBox = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 10vh;
  background-color: #5800ff;
  border-radius: 20px;
  @media (max-width: 912px) {
  }
  @media (max-width: 426px) {
  }
`;

const Temp = styled.div`
  position: absolute;
  top: 5%;
  right: 10%;
  font-size: 5vh;
  color: #ffc600;
`;

const State = styled.img`
  width: 10vh;
  margin-right: 5%;
`;
const FitnessBox = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  border-radius: 20px;
  height: 23vh;
  background-color: #5800ff;

  /* position: relative;
  margin: 0 10% 0 10%;
  width: 80%;
  border: 1px solid #d8d8d8;
  background-color: #faf9f9;
  font-size: 1vw;
  font-family: 'Poppins';
  font-weight: 700; */
  @media (max-width: 912px) {
  }
  @media (max-width: 426px) {
  }
`;
const Fitimg = styled.img`
  width: 8vh;
  @media (max-width: 912px) {
  }
  @media (max-width: 426px) {
  }
`;

const WeatherCases = {
  Rain: {
    title: 'Raining',
    subtitle: '필라테스하기',
    icon: 'ios-rainy',
    img: pilates,
  },
  Clear: {
    title: 'Sunny',
    subtitle: '러닝하기',
    icon: 'ios-sunny',
    img: running,
  },
  Thunderstorm: {
    title: 'Thunderstrom',
    subtitle: '헬스장가기',
    icon: 'ios-thunderstorm',
    img: health,
  },
  Clouds: {
    title: 'Clouds',
    subtitle: '테니스치기',
    icon: 'ios-cloudy',
    img: tennis,
  },
  Snow: {
    title: 'Snow',
    subtitle: '보드타기',
    icon: 'ios-snow',
    img: board,
  },
  Drizzle: {
    title: 'Drizzle',
    subtitle: '요가하기',
    icon: 'ios-rainy-outline',
    img: yoga,
  },
  Haze: {
    title: 'Haze',
    subtitle: '요가하기',
    icon: 'ios-rainy-outline',
    img: yoga,
  },
  Mist: {
    title: 'Mist',
    subtitle: '수영하기',
    icon: 'ios-rainy-outline',
    img: swim,
  },
};
export default function Weather() {
  const [result, setResult] = useState({});
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();
  const [city, setCity] = useState(
    sessionStorage.city !== undefined
      ? sessionStorage.city.split('/')[0]
      : 'seoul'
  );

  // const API_KEY = '4281729cba61323b40e791c6036334ed';
  const iconurl = `http://openweathermap.org/img/w/${icon}.png`;
  // const Region = 'seoul';
  // ab9fd86fdb0d2bd4968a55bfa83cf03c
  // c8fffee56b961e5df0d6af641bd1a6e3
  // 242b309a31182dc5c37381b6642b796c
  // 4281729cba61323b40e791c6036334ed
  // const weatherRendering = () => {
  // }

  useEffect(() => {
    const weatherShow = async () => {
      const data = await axios({
        method: 'post',
        url: process.env.REACT_APP_URL + '/weather/today_weather',
        data: {
          city: city,
        },
        // id: sessionStorage.id,
        // url: `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${Region}&appid=${API_KEY}`,
      });
      setResult(data);
      setWeather(data.data.weather[0].main);
      setIcon(data.data.weather[0].icon);
    };
    weatherShow();
  }, []);
  return (
    <>
      {Object.keys(result).length !== 0 && (
        <Outer>
          <Title>
            Today,
            <br />
            Your City
          </Title>
          <Temp>{Math.round((result.data.main.temp - 273.15) * 10) / 10}℃</Temp>
          <WeatherBox>
            <State src={iconurl} alt="날씨" />
            {WeatherCases[weather].title}
          </WeatherBox>
          <br />
          <Title>
            Recommend
            <br />
            Fitness
          </Title>
          <FitnessBox>
            <br />
            <div className="sky">
              {WeatherCases[weather].subtitle}
              <br />
              좋은 날씨에요.
            </div>
            <Fitimg src={WeatherCases[weather].img} />
          </FitnessBox>
        </Outer>
      )}
    </>
  );
}
