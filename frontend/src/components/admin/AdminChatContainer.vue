<template>
    <AdminAddChat
    @newChatAdded="updateData"></AdminAddChat>
    <AdminChatTable ref="chatTable"
    @chat-deleted = deleteChat()
    ></AdminChatTable>
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
            this.$emit("newChatAdded")
            this.$refs.chatTable.updateTable() 
        }, 
        deleteChat() {
            this.$emit("chat-deleted")
        }
    }
}
</script>