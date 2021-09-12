<template>
    <div class="text-center">
         <el-dialog 
            :visible.sync="openAccountForm"
            center
            fullscreen
            :before-close="handleClose"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
        >
            <span class="text-xl font-semibold flex justify-center">
                Attach Accounts
            </span>
            <span>
                <el-form 
                    ref="accountForm" 
                    label-position="left" 
                    label-width="50px" 
                    class="mt-5 flex justify-between"
                >
                     <el-select v-model="value" placeholder="Select" class="w-full" no-data-text="No Accounts Available">
                        <el-option
                            v-for="item in unlinked_accounts"
                            :key="item.name"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                    <el-button @click="submit">Attach</el-button>
                </el-form>
            </span>
         </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'AccountForm',

    props: {
        accounts: {type:Array},
    },

    data() {
        return  {
            openAccountForm: true,
            accountForm: {},
            unlinked_accounts: [],
            ids: [],
            value : '',
        }
    },

    mounted() {
        this.opened();
    },

    methods: {
        getUnlinkedAccounts() {
            this.$axios
                .get("unlinkedaccounts/"+ JSON.stringify(this.ids), {headers: {"x-access-token": localStorage.getItem("token")}})
                .then((response) => {
                    this.unlinked_accounts = response.data.accounts;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        
        handleClose() {
            this.$emit('close');
        },

        opened() {
            this.value = '';
            this.ids = this.accounts;
            this.getUnlinkedAccounts();
        },

        submit(e) {
            e.preventDefault();
            
            if(this.value === '') {
                this.$message.error("Please select an account to add.");
            } else {
                this.attachAccount();
            }
        },

        attachAccount() {
            this.$emit('submit', this.value);
        }
     }
}
</script>