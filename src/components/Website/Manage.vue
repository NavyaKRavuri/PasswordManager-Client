<template>
    <div>
        <Header></Header>
        <div class="p-20 flex flex-col text-lg">
            <div class="flex items-center justify-between">
                <div>
                    <div>
                        <span class="font-semibold pr-10">Title:</span>
                        <span>{{website.title}}</span>
                    </div>
                    <div>
                        <span class="font-semibold pr-10">URL:</span>
                        <span>{{website.url}}</span>
                    </div>
                </div>
                <el-button class="float-right" size="mini" @click="openAccountsForm = true">Add Account</el-button>
            </div>
            
            <el-table :data="accounts" style="width: 100%" empty-text="No Data">
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column label="Secret">
                    <el-table-column prop="secrets.user" label="User"></el-table-column>
                    <el-table-column prop="secrets.password" label="Password"></el-table-column>
                </el-table-column>
                <el-table-column fixed="right" width="120">
                <template slot-scope="scope">
                        <el-button size="mini" @click="detachAccount(scope.row)">
                            Remove
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div v-if="openAccountsForm">
                <account-form :accounts="accountids" @submit="addAccount" @close="close"></account-form>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../partials/Header.vue';
import AccountForm from  '../Account/Form.vue';

export default {
    name: 'ManageWebsite',

    props:['websiteId'],

    components: {Header, AccountForm},

    data() {
        return {
            website: {},
            accounts: [],
            accountids: [],
            openAccountsForm: false,
        }
    },

    mounted() {
        this.getWebsiteDetails();
    },

    methods: {
        getWebsiteDetails() {
            this.$axios
                .get("website/"+this.websiteId, {headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.website = response.data.website;
                    this.accounts = response.data.accounts;
                    this.accountids = this.accounts.map(account => account._id);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        detachAccount(row) {
            this.$axios
                .delete("account/detach/"+this.websiteId+"/"+row._id,
                 {headers: {"x-access-token": localStorage.getItem("token")}})
                .then(() => {
                  this.getWebsiteDetails();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        close() {
            this.openAccountsForm = false;
        },

        addAccount(value) {
            this.openAccountsForm = false;
            
            let data = {
                websiteId :this.websiteId,
                accountId: value,
            };

            this.$axios.post("account", data, {headers: {"x-access-token": localStorage.getItem("token")}})
                .then(() => {
                    // 
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.getWebsiteDetails();
                })
        }
    }
}
</script>