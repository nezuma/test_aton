<script>
    export default {
        name: 'clients',
        props: {
            client: {
                type: Object,
                required: true,
            },
            popup: {
                type: Boolean,
                required: true
            },
            hiddenPP: {
                type: Function,
                required: true
            }
        },
        methods: {
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
            },
        }
    }
</script>
<template>
    <tr>
        <td>{{ client.number }}</td>
        <td>{{ client.surename }}</td>
        <td>{{ client.firstname }}</td>
        <td>{{ client.patronymic }}</td>
        <td><div :class="getStatusClass(client.status)">{{ client.status }}</div></td>
        <td><a class="link" @click="hiddenPP(client)">Подробнее</a></td>
    </tr>
</template>
<style>
    .status-not-working {
        border: 1px solid;
        margin: 5px;
        padding: 0 10px;
        border-radius: 5px;
        background: #454545;
    }
    .status-rejected {
        border: 1px solid;
        margin: 5px;
        padding: 0 10px;
        border-radius: 5px;
        background: #b62324;
    }
    .status-closed {
        border: 1px solid;
        margin: 5px;
        padding: 0 10px;
        border-radius: 5px;
        background: #369513;
    }
    .status-working {
        border: 1px solid;
        margin: 5px;
        padding: 0 10px;
        border-radius: 5px;
        background: #bfa512;
    }
</style>