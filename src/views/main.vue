<script>
    import axios from 'axios'
    import Header from '@/components/header.vue'
    import Clients from '@/components/client.vue'
    export default {
        name: 'Main',
        data() {
            return {
                clientlist: [],
                popup: false,
                selectedClient: {},
                change: false,
                selectedOption: '',
                loading: true
            }
        },
        components: {
            Header,
            Clients
        },
        methods: {
            async getClients() {
                try {
                    const response = await axios.get('/api/clients');
                    this.clientlist = response.data.clientlist;
                    this.loading = !this.loading;
                    
                } catch (error) {
                    if(error.response.status != 400) {
                        console.error(error);
                    } else {
                        alert(error.response.data.message);
                    }
                }   
            },
            async saveClient() {
                try {
                    const response = await axios.put('/clients/update', {
                        client: this.selectedClient,
                        status: this.selectedOption
                    });
                    alert(response.data.message);
                    location.reload();
                } catch (error) {
                    if(error.response.status != 400) {
                        console.error(error);
                    } else {
                        alert(error.response.data.message);
                    }
                }
            },
            hiddenPP(client) {
                this.selectedClient = client;
                this.popup = !this.popup;
            },
            closePP() {
                this.popup = !this.popup;
            },
            changeClient() {
                this.closePP();
                this.change = !this.change;
            },
            closeClient() {
                this.change = !this.change;
            },
            getStatusClass(status) {
                if (status === 'Не в работе') {
                    return 'status-not-working';
                } else if (status === 'В работе') {
                    return 'status-working';
                } else if (status === 'Отказ') {
                    return 'status-rejected';
                } else if (status === 'Сделка закрыта') {
                    return 'status-closed';
                }
            }
        },
        created() {
            this.getClients();
        }
    }
</script>
<template>
    <Header />
    <div class="main-content">
        <div class="main-inner">
            <table>
                <tr>
                    <th>Номер договора</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                <tr v-if="loading">Загрузка</tr>
                <Clients v-else v-for="client in clientlist" :key="client.id" :client="client" :popup="popup" :hiddenPP="hiddenPP"/>
            </table>
            <div v-if="popup">
                <div class="bg--closer" @click="hiddenPP"></div>
                <div class="popup-window">
                    <div class="popup-content">
                        <h2>{{ selectedClient.surname }} {{ selectedClient.firstname }} {{ selectedClient.patronymic }}</h2>
                        <p>Номер счета: {{ selectedClient.number }}</p>
                        <p>Дата рождения: {{ selectedClient.birthday }}</p>
                        <p>ИНН: {{ selectedClient.inn }}</p>
                        <p>ФИО ответственного: {{ selectedClient.nameresponsible }}</p>
                        <p>Статус: <span :class="getStatusClass(selectedClient.status)">{{ selectedClient.status }}</span></p>
                        <button class="button" @click="changeClient(selectedClient)">Изменить</button>
                    </div>
                </div>
            </div>
            <div v-if="change">
                <div class="bg--closer" @click="closeClient"></div>
                <div class="popup-window">
                    <div class="popup-content">
                        <form action="/clients/update" method="put" @submit.prevent="saveClient">
                            <label for="status">Статус:</label>
                            <select type="status" class="select" v-model="selectedOption">
                                <option value="Не в работе">Не в работе</option>
                                <option value="В работе">В работе</option>
                                <option value="Отказ">Отказ</option>
                                <option value="Сделка закрыта">Сделка закрыта</option>
                            </select><br>
                            <button type="submit" class="button">Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .main-content {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .main-inner {
        width: 100%;
        height: 100%;
    }    
    .main-inner table {
        border: 1px solid;
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 25px;
    }
    .main-inner table tr td, .main-inner table tr th {
        border: 1px solid;
        padding: 0 10px;
    }
    .popup-window {
        position: fixed;
        left: 35%;
        top: 20%;
        z-index: 3;
    }

    .popup-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 450px;
        height: 250px;
        color: #000;
    }
    .select {
        padding: 0 10px;
        margin-left: 10px;
        border-radius: 12px;
        border: 1px solid #000;
    }
</style>