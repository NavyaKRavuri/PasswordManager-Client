<template>
<div>
    <Header></Header>
    <div class="text-center">
        <el-card class="box-card p-8 m-3">
            <div class="font-semibold">Websites Count</div>
            <div>{{websites_count}}</div>
        </el-card>
         <el-card class="box-card p-16 m-5">
            <div class="font-semibold">Accounts Count</div>
            <div>{{accounts_count}}</div>
        </el-card>
        <el-card class="box-card p-16 m-5">
            <div class="font-semibold">Top Website</div>
            <div>{{top_website.title}}</div>
        </el-card>
    </div>
</div>
</template>

<script>
import Header from './partials/Header.vue';
export default {
    components: { Header },
    name: "Dashboard",

    data() {
        return {
            websites_count: 0,
            accounts_count: 0,
            top_website: '',
        }
    },

    mounted() {
        this.getWebsitesCount();
        this.getAccountsCount();
        this.getTopWebsite();
    },

    methods: {
        getWebsitesCount() {
              this.$axios
                .get("websitescount",{headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.websites_count = response.data;
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
        },

        getAccountsCount() {
             this.$axios
                .get("accountsCount",{headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.accounts_count = response.data;
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
        },

        getTopWebsite() {
              this.$axios
                .get("topWebsite",{headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.top_website = response.data.data;
                    console.log(this.top_website);
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>