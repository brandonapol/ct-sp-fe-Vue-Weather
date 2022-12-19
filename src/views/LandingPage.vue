<template>
    <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center">
            <button class="bg-white p-3 rounded border-b-2 shadow-lg" @click="goToDash">Go To Dashboard</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const goToDash = () => {
    router.push({ name: "dashboard"})
}
</script>

<!-- Build Dashboard -->