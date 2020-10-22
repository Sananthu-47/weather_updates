const api = new Weather;
const ui = new Ui;
let units="kelvin";
let keyUnit="&#8490;";

window.addEventListener('load', main);
function main() {
    navigator.geolocation.watchPosition(() => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            api.getCity(position.coords.latitude, position.coords.longitude,units)
                .then((Dresponse) => {
                    document.querySelector('.full-result').classList.remove('active');
                    document.querySelector('.loading-page').classList.add('active');
                    ui.getCurrentData(Dresponse, Dresponse.weatherData.timezone,keyUnit);
                    ui.getDailyData(Dresponse,keyUnit);
                })
        })
    }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
            document.querySelector('.full-result').classList.add('active');
            document.querySelector('.loading-page').classList.add('active');
            document.querySelector('.alert-cls').classList.remove('active');
            ui.alert("Oops! we couldn't locate you. Please try to search your location");
        }
    })


    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            document.querySelector('.search').click();
        }
    })

    document.querySelector('#select').addEventListener('change',unitChange);

    function  unitChange(){
        const user = document.getElementById("select");
        let userSelect= user.options[user.selectedIndex];
        if(userSelect.value=="0")
        {
            units = "kelvin";
            keyUnit="&#8490;";
        }else
        if(userSelect.value=="1"){
           units = "metric";
           keyUnit="&#8451;";
        }else
        if(userSelect.value=="2")
        {
            units = "imperial";
            keyUnit="&#8457;";
        }
        document.querySelector('.search').click();
    }

    const inputCity = document.getElementById('input-field');
    document.querySelector('.search').addEventListener('click', () => {
        document.querySelector('.alert-cls').classList.add('active');
        document.querySelector('.full-result').classList.add('active');
        document.querySelector('.loading-page').classList.remove('active');
        if (inputCity.value !== "") {
            ui.clearUi();
            api.getCityName(inputCity.value,units)
                .then((cityName) => {
                    if (cityName.weatherCData.message !== "city not found") {
                        api.getCity(cityName.weatherCData.coord.lat, cityName.weatherCData.coord.lon, units)
                            .then((dataResponse) => {
                                document.querySelector('.full-result').classList.remove('active');
                                document.querySelector('.loading-page').classList.add('active');
                                ui.getCurrentData(dataResponse, cityName.weatherCData.name + " / " + cityName.weatherCData.sys.country,keyUnit);
                                ui.getDailyData(dataResponse,keyUnit);
                            })
                    } else {
                        document.querySelector('.full-result').classList.add('active');
                        document.querySelector('.loading-page').classList.add('active');
                        document.querySelector('.alert-cls').classList.remove('active')
                        ui.alert("City not found please try other cities!");
                    }
                })
        } else {
                        document.querySelector('.full-result').classList.add('active');
                        document.querySelector('.loading-page').classList.add('active');
                        document.querySelector('.alert-cls').classList.remove('active');
                        ui.alert("Please enter a city!!!");
        }
    });
}