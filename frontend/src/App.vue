<script setup>
    import Header from '@/components/Header.vue';
import LoadSpinner from './components/LoadSpinner.vue';
</script>

<template>
    <Header />
    <main>
        <RouterView class="view main" />
    </main>
</template>

<style>
    
</style>
