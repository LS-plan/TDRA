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
          id: "activity", //id必须唯一 可以是数字
          placeholder: "请输入活动名称",
          label: "活动名称",// 提示输入名
          type: "text", //类型
          rules: {
            name: "activityName", //字段名 即提交给后端的字段
            value: "",
            verify: true, //是否开启校验
            errMess: "活动名称未填写",  //校验不通过的错误提示
          },
        },
       {
         id: "type", //id必须唯一 可以是数字
         placeholder: "请输入学时类型",
         label: "学时类型",// 提示输入名
         type: "text", //类型
         rules: {
           name: "typeName", //字段名 即提交给后端的字段
           value: "",
           verify: true, //是否开启校验
           errMess: "类型未填写",  //校验不通过的错误提示
         },
       },
	   
        {
          id: "number", //id必须唯一 可以是数字
          placeholder: "（例如：2）",
          label: "所获学时数量",// 提示输入名
          type: "number", //类型
          rules: {
            name: "numberName", //字段名 即提交给后端的字段
            value: "",
            verify: true, //是否开启校验
            errMess: "学时数量未填写",  //校验不通过的错误提示
          },
        },
        
		
		{
		  id: "time", //id必须唯一 可以是数字
		  placeholder: "（例如：2020.03.31）",
		  label: "活动时间",// 提示输入名
		  type: "text", //类型
		  rules: {
		    name: "activityTime", //字段名 即提交给后端的字段
		    value: "",
		    verify: true, //是否开启校验
		    errMess: "活动时间未填写",  //校验不通过的错误提示
		  },
		},
		
		{
		  id: "place", //id必须唯一 可以是数字
		  placeholder: "请输入活动地点",
		  label: "活动地点",// 提示输入名
		  type: "text", //类型
		  rules: {
		    name: "activityPlace", //字段名 即提交给后端的字段
		    value: "",
		    verify: true, //是否开启校验
		    errMess: "活动地点未填写",  //校验不通过的错误提示
		  },
		},
		
		
		{
		  id: "personNumber", //id必须唯一 可以是数字
		  placeholder: "（例如：120）",
		  label: "导入人次",// 提示输入名
		  type: "number", //类型
		  rules: {
		    name: "personNumber", //字段名 即提交给后端的字段
		    value: "",
		    verify: true, //是否开启校验
		    errMess: "导入人次未填写",  //校验不通过的错误提示
		  },
		},
		
		
		{
		  id: "Leadername", //id必须唯一 可以是数字
		  placeholder: "请输入负责人名称",
		  label: "负责人姓名",// 提示输入名
		  type: "text", //类型
		  rules: {
		    name: "Leadername", //字段名 即提交给后端的字段
		    value: "",
		    verify: true, //是否开启校验
		    errMess: "负责人姓名未填写",  //校验不通过的错误提示
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
          id: "content",
          placeholder: "(请填写活动的形式与内容)",
          label: "活动内容",
          type: "textarea",
          rules: {
            name: "activityContent",
            value: "", //字段值
            verify: true,
            errMess: "请输入活动主要内容",
          },
        },
		
		{
		  id: "host",
		  placeholder: "请输入活动的主办单位",
		  label: "主办单位",
		  type: "text",
		  rules: {
		    name: "hostName",
		    value: "", //字段值
		    verify: true,
		    errMess: "请输入活动主办单位",
		  },
		},
		
		
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