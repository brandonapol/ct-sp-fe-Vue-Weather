<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div
                v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen
                top-0 left-0 flex justify-center px-8"
            >
                <Transition name="modal-inner">
                    <div
                        v-if="modalActive"
                        class="p-4 bg-white self-start mt-32 max-w-screen-md"
                    >
                        <slot />
                        <button class="text-white mt-8 bg-primary py-2 px-6"
                                @click="$emit('close-modal')"
                        >
                            Close
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
    // emits is like a component return value
    defineEmits(['close-modal']);
    // Define the props so we can use them
    defineProps({
        modalActive: {
            type: Boolean,
            default: false,
        },
    })

</script>

