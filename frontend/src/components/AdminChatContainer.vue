<template>
    <AdminAddChat
    @newChatAdded="updateData"></AdminAddChat>
    <AdminChatTable ref="chatTable"></AdminChatTable>
</template>
<script>
import AdminAddChat from './AdminAddChat.vue';
import AdminChatTable from './AdminChatTable.vue';

export default {
    components : {
        AdminAddChat,
        AdminChatTable
    }, 
    methods : {
        updateData() {
            this.$refs.chatTable.updateTable() 
        }
    }
}
</script>