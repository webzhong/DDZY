<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <p slot="title" class='tit'>
                    配电不停电作业管控平台
            </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="账号">
                               
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="密码">
                                
                            </Input>
                        </FormItem>
                        <FormItem  prop="checkbox" class='checkbox'>
                            <CheckboxGroup v-model="form.checkbox">
                                <Checkbox label="记住密码"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名[admin1、admin2、admin3、admin4]和任意密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: '',
                checkbox:[]
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                	sessionStorage.user = this.form.userName;
                	sessionStorage.password = this.form.password;
                    this.$store.commit('setAvator', '');
                    if (this.form.userName === 'admin') {
                    	sessionStorage.access = 0;
                    } else {
                       sessionStorage.access = 1;
                    }
                    this.$router.push({
                        name: 'index'
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
