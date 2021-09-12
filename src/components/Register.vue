<template>
    <div class="flex text-center justify-center mt-32">
        <el-card shadow="always" class="w-1/2 pb-10">
            <div class="text-3xl py-5">Register</div>
            <el-form
                label-position="left"
                :model="registerForm"
                ref="registerForm"
                :rules="rules"
            >
                <el-form-item label="User Name" prop="user_name" :error="errors.get('user_name')">
                    <el-input type="text" v-model="registerForm.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" :error="errors.get('password')">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="confirm_password" :error="errors.get('confirm_password')">
                    <el-input type="password" v-model="registerForm.confirm_password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="submitForm">Submit</el-button>

            <div class="text-xs pt-3">
                Already a user
                <a href="/login" class="underline" style="color: blue">login</a>
            </div>
        </el-card>
    </div>
</template>

<script>
import Errors from "../assets/modules/Errors";
import {mapMutations} from 'vuex';

export default {
    name: "Register",

    data() {
        return {
            registerForm: {
                user_name: "",
                password: "",
                confirm_password: "",
            },

            errors: new Errors(),

            rules:{
                user_name: {
                    required: true,
                    message: "user name field is required",
                    trigger: blur,
                },
                password: [{
                    required: true,
                    message: "password field is required",
                    trigger: blur,
                },{
                    min: 8,
                    message: "Password must be atleast 8 characters long",
                    trigger: blur,
                }], 
                confirm_password: {
                    required: true,
                    message: "confirm password field is required",
                    trigger: blur,
                }
            },
        };
    },

    methods: {
        ...mapMutations('user', ['setUser']),

        submitForm(e) {
            e.preventDefault();

            this.$refs["registerForm"].validate((valid) => {
                if (!valid) {
                    return;
                }

                this.errors.clear();
                this.registerUser();
            });
        },

        registerUser() {
            let data = {
                username: this.registerForm.user_name,
                password: this.registerForm.password,
                confirm_password: this.registerForm.confirm_password,
            };

            this.$axios
                .post("user/register", data)
                .then((response) => {
                    this.setUser(response.data);
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('home');
                })
                .catch((error) => {
                    localStorage.removeItem('token')
                    this.errors.record(error.response.data);
                });
        }
    },
};
</script>