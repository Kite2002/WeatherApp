class Forecast{
  constructor(){
    this.key = 'T2M88bGeKAsinpxLtAwWqaZIVLgl0K91'
    this.weatherUri = 'http://dataservice.accuweather.com/currentconditions/v1/'
    this.cityUri = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  }

  async updateCity(city){
  const cityDet = await this.getCity(city);
  const weather = await this.getWeather(cityDet.Key);

  return {
    cityDet : cityDet,
    weather : weather
  }
  }

  async getCity(city){
  const query = `?apikey=${this.key}&q=${city}`;
  const response = await fetch(this.cityUri+query);
  const data = await response.json();
  return data[0];
  }

  async getWeather(id){
  const query = `${id}?apikey=${this.key}`;
  const response = await fetch(this.weatherUri + query);
  const data =  await response.json();
  return data[0];
  }
}


