<template>
    <div>
        <el-row class="w-full bg-black h-20 list-item">
            <div class="text-white pl-5 text-xl float-left cursor-pointer" @click="goToHome">Password Manager</div>
            <el-button class="float-right mr-5" @click="goToDashboard">Dashboard</el-button>
            <el-button class="float-right mr-5" @click="logout">logout</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Header',

    methods: {
        goToHome() {
            if(!(this.$router.currentRoute.path == '/' || this.$router.currentRoute.path == '/home')) {
                this.$router.push({ name: "home" });
            }
        },

        logout() {
            localStorage.removeItem("token");
            this.$router.replace({ name: "login" });
        },

        goToDashboard() {
            this.$router.replace({name: "dashboard"});
        }
    }
}
</script>