<template>
    <AdminAnalytics ref="analytics"></AdminAnalytics>
    <AdminUserTable></AdminUserTable>
    <AdminChatContainer @newChatAdded="updateAnalytics()"></AdminChatContainer>
</template>

<script>
import AdminAnalytics from './AdminAnalytics.vue';
import AdminChatContainer from './AdminChatContainer.vue';
import AdminUserTable from './AdminUserTable.vue';

export default {
    methods : {
        updateAnalytics() {
            this.$refs.analytics.fetchData() ; 
        }
    }
}

</script>