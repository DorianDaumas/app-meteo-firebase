<template>
    <div>
      <div class="container">
          <div class="field">
            <input 
              type="text" 
              id="fullname" 
              placeholder="Cherchez votre ville..."
              v-model="query"
              @keypress="fetchWeather"/>
              <!--<input type="text" name="fullname" id="fullname" placeholder="Full Name" autofill="autofill">-->
              <label for="fullname">Cherchez votre ville...</label>
          </div>
          <div v-if="error" class="alert alert-danger" v-html="error"></div>
      </div>

      
      
      <div  v-if="weather.timezone" id='placementResults' >
      
        <div id="CurrentDashboard" >
          
          <h2>Aujourd'hui dans la ville de </h2>
          <h3>{{infoLocation.name}} ( {{infoLocation.sys.country}} )</h3>
          <img id='logoTemp' v-bind:src="'https://openweathermap.org/img/wn/'+this.weather.current.weather[0].icon+'@2x.png'">
          
          <div id="CurrentDetails" >
            <div id="Current" >
              <h3>Température</h3>
                <hr class="hr" style='width:90%'>
                <ul>
                    <li id="placementDetail"><p>Matin</p><span>{{Math.trunc(this.weather.daily[0].temp.morn)}}°C</span></li>
                    <li id="placementDetail"><p>Journée</p><span>{{Math.trunc(this.weather.daily[0].temp.day)}}°C</span></li>
                    <li id="placementDetail"><p>Soirée</p><span>{{Math.trunc(this.weather.daily[0].temp.eve)}}°C</span></li>
                    <li id="placementDetail"><p>Nuit</p><span>{{Math.trunc(this.weather.daily[0].temp.night)}}°C</span></li>
                </ul>
            </div>
            
            <div id="Spacement"></div>
            
            <div id="Details" >
              <h3>Détails</h3>
                <hr class="hr" style='width:90%'>
                <ul>
                    <li id="placementDetail"><p>Temps </p><span>{{this.weather.current.weather[0].description}}</span></li>
                    <li id="placementDetail"><p>Humidité </p><span>{{this.weather.current.humidity}} %</span></li>
                    <li id="placementDetail"><p>Vitesse du vent </p><span>{{this.weather.current.wind_speed}} Km/h</span></li>
                    <li id="placementDetail"><p>Uv </p><span > {{Math.round(this.weather.current.uvi)}}</span></li>
              </ul>
            </div>

          </div>

        </div>

        <WeeksPrevision :PropsLatLon="LatLon" :PropsInfoLocation="infoLocation"></WeeksPrevision>
        <HoursPrevision :PropsQuery="query" ></HoursPrevision>
   
      </div>
     
         
    </div>
</template>

<script>
import axios from 'axios'
import {apiKey , BaseUrl} from '../Api.js'
import Vue from "vue"
import WeeksPrevision from './WeeksPrevision.vue'
import HoursPrevision from './HoursPrevision.vue'

export default {
    name: "InfoMeteo",
    components: {
      WeeksPrevision,
      HoursPrevision
    },
    data() {
        return {
            query: "",
            error: null,
            LatLon: {},
            infoLocation: {},
            weather: {},
            options: { weekday: 'short' },
            optionsHourly: { hour: '2-digit'},
            
        }
    },
    methods: {
        fetchWeather (e) {
            if (e.key == "Enter") {
              
              this.error = null
                axios.get(`${BaseUrl}weather?q=${this.query}&units=metric&lang=fr&appid=${apiKey}`).then(response => {
                    this.LatLon = response.data.coord 
                    this.infoLocation = response.data
                    axios.get(`${BaseUrl}onecall?lat=${this.LatLon.lat}&lon=${this.LatLon.lon}&units=metric&lang=fr&appid=${apiKey}`).then(response => {
                        this.weather = response.data 
                    })
                    console.log('current',this.weather)
                }).catch(error => {
                  error.response.data.message = "Le nom de la ville n'a pas était trouvé"
                  this.error =  error.response.data.message
                });
              // this.query = null
            }
        }
    },
    
}

</script>

<style lang="css">
.field {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
          flex-flow: column-reverse;
}
label,
input {
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
}
input {
  font-size: 24px;
  color: #ccc;
  border: 0;
  border-bottom: 1px solid #ccc;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 5px 0;
  background: transparent;
}
input:focus {
  outline: 0;
  border-color: coral;
}
input:placeholder-shown + label {
  margin-left: -30px;
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-transform-origin: left bottom;
          transform-origin: left bottom;
  -webkit-transform: translate(0, 2.125em) scale(1.5);
          transform: translate(0, 2.125em) scale(1.5);
}
input:not(:placeholder-shown) + label,
input:focus + label {
  -webkit-transform: translate(0, 0) scale(1);
          transform: translate(0, 0) scale(1);
  cursor: default;
  color: coral;
}
label {
  max-width: 66%;;
  color: #ccc;
}
::-webkit-input-placeholder {
  opacity: 0;
  -webkit-transition: inherit;
  transition: inherit;
}
.container{
      width: 310px!important;
    margin: auto!important;
}

#logoTemp{
    width: 50px;
    transform: rotate(0deg);
    cursor: auto
}
#placementResults{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-left: 200px;
    padding-right: 200px;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: 0!important;
    margin-right: 0!important
}
#Spacement{
  width: 50px
}
.alert-danger{
margin-top: 30px;
}

@media screen and (max-width: 640px) {
  #placementResults{
    padding-left: 20px!important;
    padding-right: 20px!important;
  }
  #DailyDashboard {
    padding: 10px!important;
  }
  h2{
    font-size: 1.1rem
  }

  #logoTemp{
    width: 40px!important
  }

  #placementDays{
    margin-bottom: 0!important
  }
  #placementHourly{
        padding: 55px;
  }

  #CurrentDetails {
    flex-wrap: wrap!important;
  }
}

@media screen and (max-width: 750px) {
  #Spacement{
    width: 10px!important
  }
    #fetchDay{
    font-size: x-small!important;
  }
    #degreResize{
    font-size: smaller!important
  }
  #placementDetail{
    font-size: smaller!important;
    width: 95%!important;
  }
}
@media screen and (max-width: 820px) {
  #placementDetail p span {
        font-size: x-small!important;
  }
}


@media screen and (max-width: 1608px) {
  #CurrentDashboard{
    padding: 35px!important;
   }

}

@media screen and (min-width: 1700px){
  #CurrentDetails{
    flex-wrap: wrap
  }
}

@media screen and (max-width: 1700px) {
  #placementResults{
    display: block
  }
    #CurrentDashboard{
    padding: 35px!important;
    margin-bottom: 35px!important
  }
  #CurrentDetails {
    margin-top: 50px;
    display: flex;
    margin-left: 60px;
    justify-content: space-evenly;
    margin-right: 60px;
    flex-wrap: unset;
  }
    #placementDetail{
    width: 45%;
    margin: 20px auto
  }
}


@media screen and (max-width: 1350px) {

    #placementDetail{
    width: 85%;
    margin: 20px auto
  }
}

@media screen and (max-width: 1000px) {

  #CurrentDetails {
    margin-left: 0px;
    margin-right: 0px;
  }
  #fetchDetails{
    font-size: x-small!important;
  }
}

@media screen and (max-width: 1200px) {

#placementResults{
    padding-left: 100px;
    padding-right: 100px;
  }
}

#CurrentDetails{
  margin-top: 50px;
  display: flex;
  
}

#Current{
margin: auto;
width: 100%
}
#Details{
  margin: auto;
  width: 100%
}
#fetchDay{
  font-size: large
}
#fetchDetails{
  font-size: large
}
#placementFetch {
  /*padding: 50px;*/
  margin: auto
}
#prevision{
  width: 100%;
    margin-top: 75px;
}
#CurrentDashboard{
  background: #27293d;
  border-radius: 7px;
  padding: 58px;
}
#DailyDashboard{
  background: #27293d;
  border-radius: 7px;
  padding: 45px;
}
#HourlyDashboard{
  background: #27293d;
  border-radius: 7px;
  margin-bottom: 100px;
  margin: 55px auto;
  padding: 45px;
  width: 100%;
}
#dashboardContent{
    padding-left: 10px;
    margin-bottom: 25px;
    margin-top: 30px;
    padding-right: 7px;
}
#placementTemp{
  display: flex;
  width: 100%
}
#tempPlacement{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
#placementDetail{
  text-align: start;
  display: flex;
  padding: 0px;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-between;

}
hr {
    margin-top: 1rem;
    margin-bottom: 3rem;
    color: white;
    border: 0;
    border-top: 1px solid white!important;
}
#placementDays{

  display: flex;
  width: 100%;
  flex-flow: wrap;
  justify-content: space-between;

}
li{
  padding-left: 0!important
}

#alignResult{
  text-align: center!important;
}

#placementDetailsWeeks{
  display: flex;
  justify-content: space-between
}

#placementHourly{
  border-right: 1px solid white;
}
#titleHourly{
  margin-bottom: 60px;
  margin-top: 40px;
}
h3{
  font-size: 1rem!important;
}


</style>
