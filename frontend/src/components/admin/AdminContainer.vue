<template>
    <AdminAnalytics ref="analytics"></AdminAnalytics>
    <AdminUserTable 
    @user-deleted = deleteUser()
    ></AdminUserTable>
    <AdminChatContainer @newChatAdded="updateAnalytics()"
     @chat-deleted = deleteChat()>
    </AdminChatContainer>
</template>

<script>

export default {
    methods : {
        updateAnalytics() {
            this.$refs.analytics.fetchData() ; 
            this.$emit('new-chat-added') ; 
        }, 
        deleteChat() {
            this.$refs.analytics.fetchData() ; 
            this.$emit("chat-deleted")
        }, 
        deleteUser() {
            this.$refs.analytics.fetchData() ;
            this.$emit('user-deleted')
        }
    }
}

</script>