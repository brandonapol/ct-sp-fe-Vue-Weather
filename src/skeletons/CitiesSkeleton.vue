<template>
    <div class="flex flex-col flex-1">
        <div class="flex flex-col py-12 items-center">
            <Animation class="max-w-[300px] w-full mb-2" />
            <Animation class="max-w-[300px] w-full mb-12" />
            <Animation class="max-w-[300px] h-[100px] w-full mb-2" />
            <Animation class="max-w-[300px] w-full mb-8" />
            <Animation class="max-w-[300px] h-[75px]  w-full" />
        </div>
        <div class="flex flex-col py-12 items-center">
            <Animation class="max-w-screen-md h-[100px] w-full mb-12" />
        </div>
        <div class="flex flex-col py-12 px-8 items-center">
            <Animation class="max-w-screen-md h-[100px] w-full mb-12" />
        </div>
    </div>
</template>

<script setup>
import Animation from './Animation.vue';
</script>

