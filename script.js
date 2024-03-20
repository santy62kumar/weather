let cityWeather=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_temperature=document.querySelector(".weather_temperature");
let w_icon=document.querySelector(".weather_icon");
let w_minTem=document.querySelector(".weather_min");
let w_maxTem=document.querySelector(".weather_max");


let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");

let citySearch=document.querySelector(".weather_search");




// 8f906b423779bc6619f34221a81047b9

//to get the actual countryName
const getCountryName=(code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// link to formate datetime "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat"
const getDateTime =(dt)=>{
    //console.log(dt);
    const currDate=new Date(dt*1000); //convet it to milisecond
    //console.log(currDate);

    const options={

        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour:'numeric',
        minute:'numeric',
    }

    const formatter=new Intl.DateTimeFormat('en-IN', options);
    //console.log(formatter);
    return formatter.format(currDate);

}
let city="patna";

//search functionality
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    //console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName="";

    
});




//this is fat arrow function 
const getWeatherData = async () => {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f906b423779bc6619f34221a81047b9`;
  //console.log(weatherUrl);

    try{
        const res=await fetch(weatherUrl);
        const data=await res.json();   
       // console.log(data);  

        const {main,name,weather,wind,sys,dt}=data;
        
        // cityWeather.innerHTML=`${name},${sys.country}`;
        //problem with this method is that we can't set the cityName like this because it shows eg:patna ,IN,
        // which is a problem we want to display india not IN so we have to convert it to it's parent country name using the country code  
        // link for converting countryName----> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames

        cityWeather.innerHTML=`${name},${getCountryName(sys.country)}`;
       // we have to formate the dt obtained 
        dateTime.innerHTML=getDateTime(dt);

        w_forecast.innerHTML=weather[0].main;
        w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        // https://openweathermap.org/img/wn/${weather[0].icon}@4x.png

        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTem.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML=`${main.humidity}%`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure} hPa`;




    }catch(error){
        console.log(error);
    }
};



document.body.addEventListener("load",getWeatherData());



