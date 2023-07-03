<template>
  <view class="content">
    <active-form :formDate.sync="formData" num></active-form>
    <view class="subform" @click="sub">提交表单</view>
  </view>
</template>

<script>
import ActiveForm from "@/components/active-form/active-form";
export default {
  components: {
    ActiveForm,
  },
  data() {
    return {
      formData: [
        {
          id: "tribe", //id必须唯一 可以是数字
          placeholder: "请输入部落名称",
          label: "部落",// 提示输入名
          type: "text", //类型
          rules: {
            name: "tribeName", //字段名 即提交给后端的字段
            value: "",
            verify: true, //是否开启校验
            errMess: "部落名称未填写",  //校验不通过的错误提示
          },
        },
       {
         id: "leader", //id必须唯一 可以是数字
         placeholder: "请输入负责人姓名",
         label: "负责人姓名",// 提示输入名
         type: "text", //类型
         rules: {
           name: "leaderName", //字段名 即提交给后端的字段
           value: "",
           verify: true, //是否开启校验
           errMess: "负责人未填写",  //校验不通过的错误提示
         },
       },
	   
		{
		  id: "phone", //id必须唯一 可以是数字
		  placeholder: "（例如：17864268115）",
		  label: "负责人联系方式",// 提示输入名
		  type: "number", //类型
		  rules: {
		    name: "phoneNumber", //字段名 即提交给后端的字段
		    value: "",
		    verify: true, //是否开启校验
		    errMess: "联系方式未填写",  //校验不通过的错误提示
		  },
		},
		
        {
          id: "changeContent",
          placeholder: "(请填写需要改动的信息名称，可以填写多项)",
          label: "改动信息名称",
          type: "textarea",
          rules: {
            name: "changeContent",
            value: "", //字段值
            verify: true,
            errMess: "请输入改动信息的内容",
          },
        },
		
		{
		  id: "originalContent",
		  placeholder: "请输入原信息内容",
		  label: "原信息内容",
		  type: "text",
		  rules: {
		    name: "originalContent",
		    value: "", //字段值
		    verify: true,
		    errMess: "请输入原信息内容",
		  },
		},
		
		{
		  id: "newContent",
		  placeholder: "请输入新信息内容",
		  label: "新信息内容",
		  type: "text",
		  rules: {
		    name: "newContent",
		    value: "", //字段值
		    verify: true,
		    errMess: "请输入新信息内容",
		  },
		}
		
		
      ],
    };
  },
  methods: {
    // 提交表单
    sub() {
      this.$vervify(this.formData); //表单校验 成功会继续往下走 失败抛出异常

      const res = this.$submitForm(this.formData); //校验成功 获取表单值
      console.log('表单对象 :>> ', res);
    },
  },
};
</script>

<style lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .subform {
    margin: 30rpx;
    padding: 20rpx 60rpx;
    border-radius: 18rpx;
    background-color: #E6E6E6;
  }
}
</style>