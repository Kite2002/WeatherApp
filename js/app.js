const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img');



const updateUi = (data)=>{
  console.log(data);
  const cityDet =  data.cityDet;
  const weather = data.weather;

  details.innerHTML = `
  <h5 class="my-3">${cityDet.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
  `;

  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc = 'img/day.svg'
  }else{
    timeSrc = 'img/night.svg'
  }
  time.setAttribute('src' , timeSrc)


  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  console.log(iconSrc)
  icon.setAttribute('src' , iconSrc)

  icon.setAttribute('src', iconSrc)

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none')
  }
}

const updateCity = async (city)=>{

  const cityDet = await getCity(city);
  const weather = await getWeather(cityDet.Key);

  return {
    cityDet : cityDet,
    weather : weather
  }
}

cityForm.addEventListener('submit' , e =>{
  e.preventDefault();
  
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data =>{
     updateUi(data);
    })
    .catch(err =>{
      console.log(err);
    });
})