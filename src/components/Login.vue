<template>
    <div class="flex justify-center text-center mt-32">
        <el-card shadow="always" class="w-1/2 pb-10">
            <div class="text-3xl py-5">Login</div>
            <el-form
                :model="loginForm"
                ref="loginForm"
                label-position="left"
                :rules="rules"
            >
                <el-form-item label="User Name" prop="user_name" :error="errors.get('user_name')">
                    <el-input type="text" v-model="loginForm.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" :error="errors.get('password')">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="submitForm">Submit</el-button>

            <div class="text-xs pt-3">
                First time here?
                <a href="/register" class="underline" style="color: blue">create account</a>
            </div>
        </el-card>
    </div>
</template>

<script>
import Errors from "../assets/modules/Errors";
import {mapMutations} from 'vuex';

export default {
    name: "Login",

    data() {
        return {
            loginForm: {
                user_name: "",
                password: "",
            },
            
            errors: new Errors(),

            rules:{
                user_name: {
                    required: true,
                    message: "user name field is required",
                    trigger: blur,
                },
                password: {
                    required: true,
                    message: "password field is required",
                    trigger: blur,
                }
            }
        };
    },

    methods: {
        ...mapMutations('user', ['setUser']),

        submitForm(e) {
            e.preventDefault();

             this.$refs["loginForm"].validate((valid) => {
                if (!valid) {
                    return;
                }

                this.errors.clear();
                this.loginUser();
            });
        },

        loginUser() {
            let data = {
                username: this.loginForm.user_name,
                password: this.loginForm.password,
            };

            this.$axios
                .post("user/login", data)
                .then((response) => {
                    this.setUser(response.data);
                    localStorage.setItem('token', response.data.token);
                    this.$router.replace({ name: 'home' });
                })
                .catch((error) => {
                    localStorage.removeItem('token');
                    this.errors.record(error.response.data);

                    if(this.errors.has('combined_error')) {
                        this.$message.error(error.response.data.combined_error);
                    }
                });
        }
    },
};
</script>