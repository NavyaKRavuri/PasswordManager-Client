<template>
    <div class="p-20">
        <div class="flex justify-between">
            <div class="text-2xl semi-bold float-left">Websites:</div>
            <el-button class="float-right" @click="addNew">Add New</el-button>
        </div>

        <el-table :data="websites" style="width: 100%" empty-text="No Data">
            <el-table-column prop="title" label="Title"></el-table-column>
            <el-table-column prop="url" label="URL"></el-table-column>
            <el-table-column fixed="right" width="120">
               <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">
                        Edit
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="120">
               <template slot-scope="scope">
                    <el-button size="mini" @click="manage(scope.row)">
                        Manage
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="120">
               <template slot-scope="scope">
                    <el-button size="mini" @click="deleteWebsite(scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="openWebsiteForm">
            <website-form :website="website" @submit="submit" @close="close"></website-form>
        </div>
    </div>
</template>

<script>
import WebsiteForm from './Form.vue';

export default {
    name: "WebsitesList",

    components: {WebsiteForm},

    data() {
        return {
            loading: false,
            websites:  [],
            openWebsiteForm: false,
            website: {},
        }
    },

    mounted() {
        this.getWebsitesList();
    },

    methods: {
        close() {
            this.openWebsiteForm = false;
            this.website = {};
        },

        getWebsitesList() {
            this.loading = true;

            this.$axios
                .get("websites",{headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.websites = response.data;
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    // this.loading = false;
                });
        },

        edit(row) {
            this.website = row;
            this.openWebsiteForm = true;
        },

        manage(row) {
            this.$router.push({name: 'ManageWebsite', params: { websiteId: row._id }});
        },

        deleteWebsite(row) {
             this.loading = true;

            this.$axios
                .delete("website/"+row._id,{headers: {"x-access-token": localStorage.getItem("token")}})
                .then(() => {
                    this.getWebsitesList();
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    this.loading = false;
                });
        },

        addNew() {
           this.openWebsiteForm = true;
        },

        submit() {
            this.openWebsiteForm = false;
            this.getWebsitesList();
            this.website = {};
        }
    }
}
</script>