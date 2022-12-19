<template>
    <div v-for="city in myCities" :key="city.id">
        <City :city="city" @click="viewCity(city)"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import City from './City.vue';

// TODO - add view City button functionality
const myCities = ref([])
const getCities = async () => {
    if (localStorage.getItem("myCities")) {
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
    }

    //! NOTE - 
    // This API is not one we looked at documentation for:
    // https://openweathermap.org/current 
    // We looked at https://openweathermap.org/api/one-call-api 
    // I blame Open Weather's website for hiding the relevant tools
    const requests = []
    myCities.value.forEach((city) => {
        requests.push(
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=cb0e2c5ea4c83b9c517301b8e88f8121&units=imperial`
            )
        )
        console.log(requests)
    })

    // make a promise that waits until all requests are done
    const weatherData = await Promise.all(requests)
    console.log(weatherData)

    weatherData.forEach((value, idx) => {
        myCities.value[idx].weather = value.data
    })
}

await getCities();

console.log(myCities)

const router = useRouter();
const viewCity = (city) => {
    router.push({
        name: "city",
        params: { state: city.state, city: city.city },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lon: city.coords.lon,
        }
    })
}

</script>

