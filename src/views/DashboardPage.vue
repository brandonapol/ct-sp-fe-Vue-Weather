<template>
    <main class="container bg-primary text-white flex-1">
    <div class="pt-4 mb-8 relative">
        <input 
            type="text" 
            v-model="searchQuery"
            @input="getSearchResults"
            placeholder="Search for a city or state" 
            class="py-2 px-1 text-black w-full bg-white border-b
            focus:border-secondary focus:outline-none
            focus:shadow-[0px_1px_0_0_#004E71]"
        />
            <ul
                class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="mapboxSearchResults"
            >
                <p class="py-2" v-if="searchError">
                    Sorry, there was an error. Please try again.
                </p>
                <p class="py-2"
                v-if="!searchError && mapboxSearchResults.length === 0">
                No results match your search, please try something else.    
                </p>
                <template v-else>
                    <li v-for="searchResult in mapboxSearchResults"
                        :key="searchResult.id"
                        class="py-2 cursor-pointer"
                        @click="previewCity(searchResult)"
                    >
                        {{ searchResult.place_name }}
                    </li>
                </template>

            </ul>
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <CityList />
                <template #fallback>
                    <CardSkeleton />
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
// connect to the router
// create a search bar that connects to an API and gets data back
// search bar should have a preview of options for cities
// dashboard should display saved cities

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from "axios";
import CityList from '../components/CityList.vue';
import CardSkeleton from '../skeletons/CardSkeleton.vue';


const router = useRouter();
// Prevew requires Get Search Results
const previewCity = (searchResult) => {
    // destructures the city and state separated by the comma
    const [city, state] = searchResult.place_name.split(",");
    // This will add our new city and state to our router object
    router.push({
        name: "city",
        params: { state: state.replaceAll(" ", ""), city: city },
        query: {
            lat: searchResult.geometry.coordinates[1],
            lon: searchResult.geometry.coordinates[0],
            preview: true,
        },
    });
};

// API connection section - Get Search Results
const mapboxKey = 'pk.eyJ1IjoiYnJhbmRvbmFwb2wiLCJhIjoiY2w4NGtrNXozMGdrYTN1bzA3YWUyYTY2NSJ9.Q-nw4bQ-_O2XMFUTaWU97Q'
const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== "") {
            try {
                // url/v5/endpoint/${ search terms }/${api key}/${ optional extra parameters}
                const result = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxKey}&types=place`
                );
                console.log(result)
                mapboxSearchResults.value = result.data.features;
            } catch {
                searchError.value = true;
            }
        } 
    }, 300)
}
</script>