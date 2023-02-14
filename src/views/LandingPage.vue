<template>
    <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center">
            <button 
                class="bg-white p-3 rounded border-b-2 shadow-lg" 
                @click="login"
                v-if="!isAuthenticated"
            >Login</button>
            <button 
                class="bg-white p-3 rounded border-b-2 shadow-lg" 
                @click="goToDash"
                v-if="isAuthenticated"
            >Dashboard</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
const router = useRouter()

const goToDash = () => {
    router.push({ name: "dashboard"})
}


const { loginWithRedirect, isAuthenticated } = useAuth0();

const login = () => loginWithRedirect();
</script>

<!-- Build Dashboard -->