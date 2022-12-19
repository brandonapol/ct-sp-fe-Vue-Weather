<template>
    <header class="sticky top-0 bg-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home' }" >
                <div class="flex items-center gap-3">
                    <i class="fas fa-sun text-2xl"></i>
                    <p class="text-2xl">The Local Weather</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <RouterLink :to="{ name: 'dashboard' }">
                    <i class="fas fa-list text-xl
                            hover:text-secondary
                            duration-150 cursor-pointer"></i>
                </RouterLink>
                <i class="fas fa-question-circle text-xl 
                    hover:text-secondary 
                    duration-150 cursor-pointer"
                    @click="toggleModal"
                ></i>
                <i class="fas fa-plus text-xl
                    hover:text-secondary
                    duration-150 cursor-pointer"
                    @click="addCity"
                    v-if="route.query"
                    ></i>
            </div>
            <Modal
                :modalActive="modalActive"
                @close-modal="toggleModal"
            >
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choice.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the 
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take you
                            to the current weather for that location.
                        </li>
                        <li>
                            Track the city by clicking the "+" icon in the top 
                            right corner. This will save the city to view later
                            from the dashboard.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing 
                            elit. Similique, illum repellat recusandae natus ut
                             officiis.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing Cities</h2>
                    <p>If you don't want to continue tracking a location, select
                        the city from the dashboard. At the bottom of the page,
                        select the "Remove City" icon.
                    </p>
                </div>
            </Modal>
        </nav>
    </header>
</template>

<script setup>
// imports
import { ref } from "vue";
import Modal from './Modal.vue';
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";

// instantiate router
const route = useRoute();
const router = useRouter();

// add city function
const myCities = ref([])

const addCity = () => {
    if (localStorage.getItem("myCities")) {
        myCities.value = JSON.parse(localStorage.getItem("myCities"))
    }

    const location = {
        id: uid(),
        // we establish these params in router/index.js
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lon: route.query.lon
        }
    }

    myCities.value.push(location);
    localStorage.setItem(
        "myCities", JSON.stringify(myCities.value)
    )

    // creates an object that includes a route request
    let query = Object.assign({}, route.query)
    // remove the preview query param from the URL
    delete query.preview;
    // add ID attribute to our location
    query.id = location.id;
    router.replace({ query})
}



const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value
}


</script>

