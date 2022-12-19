<template>
    <div>
        <Suspense>
            <AsyncCity />
            <template #fallback>
                <CitiesSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCity from '../components/AsyncCity.vue'
import CitiesSkeleton from '../skeletons/CitiesSkeleton.vue';
</script>
