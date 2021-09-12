<template>
    <div class="text-center">
        <el-dialog 
            :visible.sync="openWebsiteForm"
            width="60%" 
            center
            @open="clearForm" 
            :before-close="handleClose"
            :close-on-press-escape="false"
            :close-on-click-modal	="false"
        >
        <span class="text-xl font-semibold flex justify-center">
            <span v-if="create_mode">Add New Website</span>
            <span v-else>Update Website</span>
        </span>
        <span>
            <el-form 
                ref="websiteForm" 
                label-position="left" 
                label-width="50px" 
                class="mt-5"
                :model="websiteForm" 
                :rules="rules"
            >
                <el-form-item label="Title" prop="title" :error="errors.get('title')">
                    <el-input v-model="websiteForm.title"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url" :error="errors.get('url')">
                    <el-input v-model="websiteForm.url"></el-input>
                </el-form-item>
            </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
            <el-button @click="submit">Submit</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Errors from "../../assets/modules/Errors";
import _ from 'lodash';

export default {
    name: 'WebsiteForm',

    props: {
        website: {type: Object},
    },

    data() {
        return {
            openWebsiteForm: true,
            errors: new Errors(),            
            websiteForm: {
                title: '',
                url: '',
            },
            rules : {
                title: {
                    required: true,
                    message: "title field is required",
                    trigger: blur,
                },
                url: {
                    required: true,
                    message: "url field is required",
                    trigger: blur,
                }
            },
            create_mode: false,
            edit_mode: false,
        }
    },

    mounted() {
        this.clearForm();
        if(_.isEmpty(this.website)) {
            this.create_mode = true;
        } else {
            this.edit_mode = true;
            this.websiteForm.title = this.website.title;
            this.websiteForm.url = this.website.url;
        }
    },

    methods: {
        handleClose() {
            this.clearForm();
            this.$emit('close');
        },

        clearForm() {
            this.websiteForm = {
                title: '',
                url: '',
            };
        },

        submit(e) {
            this.errors.clear();
            e.preventDefault();
            
            this.$refs['websiteForm'].validate((valid) => {
                if(!valid) {
                    return;
                }

                if(this.create_mode) {
                    this.addWebsite();
                }
                
                if(this.edit_mode) {
                    this.editWebsite();
                }
            });
        },

        addWebsite() {
            let data = {
                title: this.websiteForm.title,
                url: this.websiteForm.url,
            };

            this.$axios
                .post("websites", data,{headers: {"x-access-token": localStorage.getItem("token")}})
                .then(() => {
                    this.$emit('submit');
                })
                .catch((error) => {
                    this.errors.record(error.response.data);
                });
        },

        editWebsite() {
            let data = {
                title: this.websiteForm.title,
                url: this.websiteForm.url,
            };

            this.$axios
                .post("website/"+ this.website._id, data,{headers: {"x-access-token": localStorage.getItem("token")}})
                .then(() => {
                    this.$emit('submit');
                })
                .catch((error) => {
                    this.errors.record(error.response.data);
                });
        },
    }
}
</script>