<script>
    import axios from 'axios';
    import Header from '@/components/header.vue'
    export default {
        name: 'auth',
        data() {
            return {
                login: '',
                password: ''
            }
        },
        components: {
            Header
        },
        methods: {
            async authentification() {
                const response = await axios.post('/api/users/login', {
                    login: this.login,
                    password: this.password
                });
                if(response.status == 200) {
                    window.location.href = '/main'
                }
            }
        },
    }
</script>
<template>
    <Header />
    <div class="auth">
        <div class="auth-header">
            <h1>Авторизация</h1>
        </div>
        <div class="auth-main">
            <form action="/api/users/login" method="post" @submit.prevent="authentification">
                <label for="login">Логин:</label>
                <input v-model="login" type="login" class="input">
                <label for="password">Пароль:</label>
                <input v-model="password" type="password" class="input">
                <button type="submit" class="button">Авторизоваться</button>
            </form>
        </div>
    </div>
</template>
<style>
    .auth {
        background: #27273e;
        border-radius: 25px;
        height: 300px;
        width: 300px;
        margin: 0 auto;
        margin-top: 5%;
    }
    .auth-header {
        text-align: center;
        border-bottom: 1px solid;
    }
    .auth-main form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 30px;
    }
    .auth-main form .button {
        margin-top: 25px;
    }
</style>