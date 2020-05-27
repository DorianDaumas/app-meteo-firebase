<template>
        <div id="DailyDashboard" >
            <h2>Vos prévisions pour les 7 prochains jours à  {{this.infoLocation.name}}</h2>
    
            <div id="dashboardContent">
                <div id="tempPlacement">
                
                    <div id="placementDays">
                        <div id="dashboardContent" v-for="(date, index) in DateWeeks" :key="index">
                            <p id="fetchDay" >{{date.toUpperCase()}}</p>
                        </div>
                    </div>

                    <div id="placementDays">
                        <div v-for="(jours, index) in weather.daily" :key="index">
                            <div id="">
                                <div>
                                <img id='logoTemp' v-bind:src="'https://openweathermap.org/img/wn/'+jours.weather[0].icon+'@2x.png'">
                                <p id="degreResize">{{Math.trunc(jours.temp.day)}}°C</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
                <trend
                  :data="this.TempWeeks"
                  :key="this.TempWeeks[0]"
                  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                  auto-draw
                  smooth>
                </trend>
                
                <h2 style="margin-bottom: 45px">Détails</h2>

                <div id="placementDetailsWeeks">
                    <ul v-for="(details, index) in this.weather.daily" :key="index">
                        <li><p id="fetchDetails">Humidité</p></li>
                        <li ><p id="fetchDetails" >{{details.humidity}} %</p></li>
                        <hr>
                        <li><p id="fetchDetails">Vent</p></li>
                        <li ><p id="fetchDetails" >{{details.wind_speed}} Km/h</p></li>
                        <hr>
                        <li style="display: flex;justify-content: space-between;"><p id="fetchDetails">Uv </p><p id="fetchDetails">{{Math.round(details.uvi)}}</p></li>
                    </ul>
                </div>
                
            </div>
        </div>

         
</template>

<script>
import axios from 'axios'
import {apiKey , BaseUrl} from '../Api.js'
import Vue from "vue"


export default {
    name: "WeeksPrevision",
    data() {
        return {
            LatLon: this.PropsLatLon,
            infoLocation: this.PropsInfoLocation,
            weather: {},
            TempWeeks: [],
            DateWeeks: [],
            options: { weekday: 'short' },
        }
    },
    props: {
        PropsLatLon: {
            type: Object,
        } ,
        PropsInfoLocation: {
            type: Object
        }
    },
    watch: {
        PropsInfoLocation: function(){
            this.infoLocation = this.PropsInfoLocation
        } ,
        PropsLatLon: function() {
            this.LatLon = this.PropsLatLon
            this.getTempWeek()
        }
    },
    methods: {
        
        getTempWeek: function(){
                axios.get(`${BaseUrl}onecall?lat=${this.LatLon.lat}&lon=${this.LatLon.lon}&units=metric&lang=fr&appid=${apiKey}`).then(response => {
                    this.weather = response.data 
                    this.weather.daily.splice(0, 1)
                    this.TempWeeks = []
                    this.DateWeeks = []
                    console.log("daily",this.weather.daily)
                    for (const daily of this.weather.daily) {
                        this.TempWeeks.push(Math.trunc(daily.temp.day) )
                        this.DateWeeks.push(new Date(daily.dt * 1000).toLocaleDateString(undefined, this.options))
                    }  
            })
        }
    },
    mounted() {
        this.getTempWeek()
    },
    
}

</script>
