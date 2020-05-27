<template>
    <div id="HourlyDashboard" >
        <h2 id="titleHourly">Vos Prévisions toutes les 3 heures</h2>
        <hr >
        <Carousel
            :paginationEnabled="true"
            :per-page="4">
            <Slide id="placementHourly" v-for="(hourlyWeather, index) in this.hourlyWeather" :key="`event_${hourlyWeather.dt}`">
            <p>{{new Date(hourlyWeather.dt * 1000).toLocaleTimeString("fr-FR", optionsDayHour)}}</p>
                </br>
                <img id='logoTemp' v-bind:src="'https://openweathermap.org/img/wn/'+hourlyWeather.weather[0].icon+'@2x.png'">
                </br>
                <p>{{hourlyWeather.weather[0].description}}</p>
                </br>
                <p>{{Math.round(hourlyWeather.main.temp)}}°C</p>
            </Slide>
        </Carousel>
    </div>
         
</template>

<script>
import axios from 'axios'
import {apiKey , BaseUrl} from '../Api.js'
import Vue from "vue"
import { Carousel, Slide } from 'vue-carousel';


export default {
    name: "WeeksPrevision",
    components: {
      Carousel,
      Slide,
    },
    data() {
        return {
            query: this.PropsQuery,
            hourlyWeather: [],
            optionsDayHour: { weekday: 'long' , hour: '2-digit'}

        }
    },
    props: {
        PropsQuery: {
            type: String,
        }  
    },
    watch: { 
        PropsQuery: function() {
            this.LatLon = this.PropsQuery
            this.getHoursPrev()
        }
    },
    methods: {
        
        getHoursPrev: function(){
            axios.get(`${BaseUrl}forecast?q=${this.query}&units=metric&lang=fr&appid=${apiKey}`).then(response => {
                this.hourlyWeather = response.data.list
            })   
        }
    },
    mounted() {
        this.getHoursPrev()
    },
    
}

</script>
