<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import Storage from "@/utils/storage";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

userStore.$subscribe(
  (mutation: any, state: any) => {
    Storage.setValue("userinfo", JSON.stringify(state));
  },
  { detached: true }
);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = {
        username: ruleForm.username,
        password: ruleForm.password,
      };
      if (data.username !== "admin" && data.password !== "password") {
        ElMessage("用户名或密码错误！");
        return false;
      }
      const token = "imt";
      // Storage.setValue('token', token)
      const userinfo = {
        username: ruleForm.username,
        token,
      };
      userStore.setUserInfo(userinfo);
      router.push("/home/config");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
