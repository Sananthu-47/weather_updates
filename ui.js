class Ui
{
      getCurrentData(response,city,unit)
      {
          document.querySelector('.result-div').innerHTML=`
          <img style="z-index: 2;" class="standing-img" src="./assets/standing-img.png">
        <div class="result-body">
            <h1 style="background-color: #007bff;color: white;">${city}</h1>
            <img src="http://openweathermap.org/img/wn/${response.weatherData.current.weather[0].icon}@2x.png" class="icon">
            <h2>Weather: <span>${response.weatherData.current.weather[0].main}</span></h2>
            <h2>Temperature: <span>${response.weatherData.current.temp} ${unit}</span></h2>
            <h2>Pressure: <span>${response.weatherData.current.pressure}</span></h2>
            <h2>Humidity: <span>${response.weatherData.current.humidity}</span></h2>
        </div>
          `;
      }
      getDailyData(response,unit)
      {
          const data= response.weatherData.daily;
          
          data.forEach((details,index)=>{
            let date=new Date(data[index].dt*1000).toString().slice(0, 15);
            document.querySelector('.wrapper-5').innerHTML+=`
            <div class="card">
                  <span style="color: yellow;">${date}</span>
                  <h3 style="color:white">Temperature</h3>
                  <div class="d-flex">
                      <h4 style="color: aqua;" id="temp">${details.temp.max}${unit}</h4>
                      <img src="http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png"> 
                  </div>
                  <p style="color: white;">${details.weather[0].main}</p>
                  <p style="color: lime;">Pressure: ${details.pressure}</p>
                  <p style="color: lime">Humidity: ${details.humidity}</p>
              </div>
            `;
          });
          document.querySelectorAll('.card')[0].style.border="5px solid yellow";
      }

      clearUi()
      {
        document.querySelector('.wrapper-5').innerHTML="";
      }

      alert(message)
      {
        document.querySelector('.alert-cls').innerHTML=`<h5>${message}</h5>`;
      }
}

