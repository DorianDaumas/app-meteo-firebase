<template>
    <div>
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
        <div id='placementResults'>
            <div id="placementFetch" v-if="weather.timezone" v-for="(jours, index) in weather.daily" :key="index">
                <div>
                    <img id='logoTemp' v-bind:src="'https://openweathermap.org/img/w/'+jours.weather[0].icon+'.png'">
                    <p>{{Math.round(jours.temp.max)}}°C</p>
                    <p> à  {{ infoLocation.name }}</p>
                    
                    </br>
                </div>
            </div>
            
            <p v-else>
                Inserer le nom d'une ville pour afficher la meteo
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {apiKey , BaseUrl} from '../Api.js'

const getDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default {
    name: "InfoMeteo",
    data() {
        return {
            query: "",
            LatLon: {},
            infoLocation: {},
            weather: {},
            DayName: ''
        }
    },
    methods: {
        fetchWeather (e) {
            if (e.key == "Enter") {
                axios.get(`${BaseUrl}weather?q=${this.query}&units=metric&appid=${apiKey}`).then(response => {
                    this.LatLon = response.data.coord 
                    this.infoLocation = response.data
                    console.log("coordoner",this.LatLon.lat)
                    console.log("infoLocation",this.infoLocation)
                    axios.get(`${BaseUrl}onecall?lat=${this.LatLon.lat}&lon=${this.LatLon.lon}&units=metric&appid=${apiKey}`).then(response => {
                        this.weather = response.data 
                            console.log("final resultat",this.weather)
                        // for (const day of this.weather.daily) {
                        //     let getDay = new Date(day.dt*1000)
                        //     this.DayName = getDays[getDay.getDay()]
                        //     console.log("day",this.DayName);
                        // }
                    })
                })
            }
        }
    },
    // watch: {
    //     weather: function(query, weather) {
    //         console.log(this.query, this.weather)
    //     }
//   }
}

</script>

<style lang="css">
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
#logoTemp{
    width: 50px;
    transform: rotate(0deg);
    cursor: auto
}
#placementResults{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
}
#placementFetch {
    padding: 50px;
    
}
</style>