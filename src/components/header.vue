<script>
    export default {
        name: 'Header'
    }
</script>
<template>
    <header class="header">
        <h1>ATON TEST QUEST</h1>
    </header>
</template>
<style>
    .header {
        text-align: center;
        border-bottom: 1px solid;
        animation: shadow-animation 5s linear infinite;
    }
    @keyframes shadow-animation {
        0% {
            box-shadow: 0 0 20px 10px rgba(95, 75, 139, 1);
        }
        20% {
            box-shadow: 0 0 40px 10px rgb(141, 122, 182);
        }
        40% {
            box-shadow: 0 0 60px 10px rgb(199, 192, 215);
        }
        60% {
            box-shadow: 0 0 40px 10px rgb(141, 122, 182);
        }
        100% {
            box-shadow: 0 0 20px 10px rgba(95, 75, 139, 1);
        }
    }
</style>