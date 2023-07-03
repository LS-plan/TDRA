<template>
  <view class="form-container">
    <view class="form-box">
      <block v-for="(item, index) in formDate" :key="item.rules.name">
        <view class="form-item flex-row--c">
          <!-- 单行文本框 -->
          <view
            class="line"
            v-if="
              item.type == 'text' ||
              item.type == 'number' ||
              item.type == 'password'
            "
          >
            <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}</view
            >
            <!-- 发送验证码 -->
            <view
              class="line-right send-code-box"
              v-if="item.rules.name == 'yzm'"
            >
              <input
                :type="item.type"
                class="input"
                placeholder-class="plaClass"
                :placeholder="item.placeholder"
                v-model="item.rules.value"
                @input="inputVal(index)"
              />
              <view class="send-code" @click="sendCode()" :style="sendColor">{{
                codeFont
              }}</view>
            </view>
            <!-- 普通输入框 -->
            <view class="line-right" v-else>
              <input
                type="text"
                class="input"
                placeholder-class="plaClass"
                :placeholder="item.placeholder"
                v-model="item.rules.value"
                @input="inputVal(index)"
              />
            </view>
          </view>
          <!-- 下拉选择-->
          <view class="line" v-else-if="item.type == 'select'">
            <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}</view
            >
            <view class="line-right">
              <input
                disabled
                type="text"
                class="input"
                placeholder-class="plaClass"
                :placeholder="item.placeholder"
                v-model="item.rules.label"
                @click="formDate2[index].show = true"
              />
              <view class="select-icon"> </view>
            </view>
            <f-select
              :title="item.title"
              :currentIndex="index"
              v-model="formDate2[index].show"
              :list="item.list"
              value-name="value"
              label-name="label"
              @confirm="selectConfirm"
            ></f-select>
          </view>

          <!-- 多行文本框 -->
          <view class="textarea-box" v-else-if="item.type == 'textarea'">
            <view :class="item.rules.verify ? '' : 'p-l14 '"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}</view
            >
            <view class="line-bottom-textarea">
              <!-- placeholder-class="plaClass" -->
              <textarea
                rows=""
                style="color: #a7a7a7; font-size: 24rpx"
                auto-height
                :maxlength="-1"
                cols=""
                :placeholder="item.placeholder"
                v-model="item.rules.value"
                @input="inputVal(index)"
              >
              </textarea>
            </view>
          </view>
          <!-- 上传图片 -->
          <view class="img-box" v-else-if="item.type == 'image'">
            <view :class="item.rules.verify ? 'img-label' : 'p-l14 img-label'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}</view
            >
            <view class="line-right">
              <view v-if="item.rules.value" class="update-img-box">
                <view class="update-img-box2">
                  <img
                    :src="item.rules.value"
                    alt=""
                    mode="aspectFill"
                    class="update-img"
                  />
                  <img
                    src="https://yzhsaas-cdn.qietongvip.com/yzhvideo/delete_img.png"
                    alt=""
                    class="close-img"
                    @click="deleteImg(index)"
                  />
                </view>
              </view>
              <view v-if="!item.rules.value" class="update-btn-box">
                <img
                  src="https://yzhsaas-cdn.qietongvip.com/yzhvideo/update_btn.png"
                  alt=""
                  mode="aspectFill"
                  @click="chooseImage(index)"
                />
              </view>
            </view>
          </view>

          <!-- 单选框 -->
          <view class="line-col" v-else-if="item.type == 'radio'">
            <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}
              <text
                style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                "
                >(单选)</text
              ></view
            >
            <view
              class="line-bottom-select"
              :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
            >
              <f-radio-group
                :currentIndex="index"
                v-model="formDate2[index].rules.label"
                @change="radioChange"
              >
                <f-radio
                  icon-size="35"
                  label-size="25"
                  shape="circle"
                  v-for="(radioItem, radioIndex) in item.list"
                  :key="radioIndex"
                  :name="radioItem.label"
                  :disabled="radioItem.disabled"
                  >{{ radioItem.label }}</f-radio
                >
              </f-radio-group>
            </view>
          </view>
          <!-- 多选框 -->
          <view class="line-col" v-else-if="item.type == 'checkbox'">
            <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}
              <text
                style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                "
                >(多选)</text
              >
            </view>
            <view
              class="line-bottom-select"
              :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
            >
              <f-checkbox-group
                :currentIndex="index"
                @change="checkboxGroupChange"
              >
                <f-checkbox
                  icon-size="35"
                  label-size="25"
                  v-model="formDate2[index].list[checkboxIndex].checked"
                  v-for="(checkboxItem, checkboxIndex) in item.list"
                  :key="checkboxIndex"
                  :name="checkboxItem.name"
                  >{{ checkboxItem.name }}</f-checkbox
                >
              </f-checkbox-group>
            </view>
          </view>

          <!-- 手机输入框 -->
          <view class="line" v-else-if="item.type == 'phone'">
            <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'"
              ><text class="colorRed" v-if="item.rules.verify">*</text
              ><text class="num" v-if="num">{{ index + 1 }}.</text
              >{{ item.label }}</view
            >
            <view class="line-right">
              <input
                type="number"
                v-model="formDate2[index].rules.value"
                :placeholder="item.placeholder"
                @input="inputVal(index)"
                class="input"
                :maxlength="11"
                placeholder-class="plaClass"
              />
              <t-button
                height="52rpx"
                width="180rpx"
                open-type="getPhoneNumber"
                @getphonenumber="getphonenumber"
                v-if="item.oneKeyPhone"
                >一键获取
              </t-button>
            </view>
          </view>
          <!-- 删除按钮 -->
          <view class="del-button">
            <text
              class="saasIcon"
              style="margin-right: 20rpx; color: var(--color)"
              @click="editFormItem(index)"
              v-if="isEdit"
              >&#xe6ef;</text
            >
            <text
              class="saasIcon"
              style="color: red"
              @click="delFormItem(index)"
              v-if="isDel && isEdit"
              >&#xe79d;</text
            >
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import FCheckboxGroup from "./components/checkbox-group.vue";
import FCheckbox from "./components/checkbox.vue";
import FRadioGroup from "./components/radio-group.vue";
import FRadio from "./components/radio.vue";
import FSelect from "./components/select.vue";
export default {
  components: {
    FCheckboxGroup,
    FCheckbox,
    FRadioGroup,
    FRadio,
    FSelect,
  },
  name: "activeForm",
  data() {
    return {
      submitData: "",
      selectBox: [],
      currentSelectIndex: "",
      currentSelectValue: "",
      codeFont: "获取验证码",
      wait: 60,
      isSend: false,
      sendColor: "color:#ff5b01",

      formDate2: this.formDate,
    };
  },
  props: {
    //是否展示序号
    num: {
      type: Boolean,
      default: false,
    },
    formDate: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //是否编辑表单
    isEdit: {
      type: Boolean,
      default: false,
    },
    //是否能删除
    isDel: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    //监听formDate变化并赋值
    formDate: {
      handler(nval) {
        this.formDate2 = nval;
      },
    },
  },
  methods: {
    async getphonenumber({ detail }) {
      if (detail.errMsg === "getPhoneNumber:ok") {
        console.log("detail :>> ", detail);
        // return;
        const { code, data } = await this.$api.yzhvideo.baseA2.bindPhone({
          iv: detail.iv,
          encrypt_data: detail.encryptedData,
        });

        if (code == 200) {
          const { user_info } = await this.$store.dispatch(
            "yzhvideo/getUserInfo"
          );
          this.formDate2.forEach((item, index) => {
            if (item.type === "phone") {
              this.formDate2[index].rules.value = user_info.phone;
              this.$emit("update:formDate", this.formDate2);
            }
          });
        }
      }
    },
    // 点击删除表单项
    delFormItem(index) {
      console.log("index :>> ", index);
      this.formDate2.splice(index, 1);
      this.$emit("update:formDate", this.formDate2);
    },
    // 编辑该选项
    editFormItem(index) {
      console.log("编辑该选项 :>> ", index, this.formDate2[index]);
      this.$emit("edit", { data: this.formDate2[index], index });
    },
    //input输入框的值传给父组件
    inputVal(index) {
      const data = {
        val: this.formDate[index].rules.value,
        index: index,
      };
      if (String(data.val) != "" && String(data.index) != "") {
        this.formDate2[data.index].rules.value = data.val;
      }
      this.$emit("update:formDate", this.formDate2);
    },

    // 单选 下拉框点击确定
    selectConfirm(param) {
      console.log("param; :>> ", param);
      this.formDate2[+param.currentIndex].rules.label = param[0].label;
      this.formDate2[+param.currentIndex].rules.value = param[0].value;
      this.$emit("update:formDate", this.formDate2);
    },
    //单选 点击触发
    radioChange(param) {
      console.log("param; :>> ", param);
	  console.log(param)
      this.formDate2[+param.currentIndex].rules.label = param.val;
      this.formDate2[+param.currentIndex].rules.value = param.val;
      this.$emit("update:formDate", this.formDate2);
    },
    //复选框 点击触发
    checkboxGroupChange(param) {
      console.log("param; :>> ", param);
      this.formDate2[+param.currentIndex].rules.value = param.values;
      this.$emit("update:formDate", this.formDate2);
    },
    // 上传图片
    chooseImage(index) {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          console.log("res :>> ", res);
          this.formDate2[index].rules.value = res.tempFilePaths[0];
          this.$emit("update:formDate", this.formDate2);
        },
        fail: (err) => {
          console.log("chooseImage fail", err);
        },
      });
    },
    // 删除图片
    deleteImg(index) {
      this.formDate2[index].rules.value = "";
      this.$emit("update:formDate", this.formDate2);
    },
    //选择值
    selectItem(value, index) {
      this.currentSelectValue = value;
      for (var i = 0; i < this.selectBox.length; i++) {
        this.$set(this.selectBox[i], "flag", false);
      }
      this.selectBox[index].flag = true;
    },
    // 发送验证码
    sendCode() {
      var that = this;
      var setTime = 0;
      if (!that.isSend) {
        that.isSend = true;
        setTime = setInterval(function () {
          that.wait--;
          that.sendColor = "color:#999";
          that.codeFont = that.wait + "重新发送";
          if (that.wait == 0) {
            clearInterval(setTime);
            that.codeFont = "获取验证码";
            that.isSend = false;
            that.wait = 60;
            that.sendColor = "color:#ff5b01";
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.plaClass {
  text-align: right;

  font-size: 26rpx;
}
// 弹框
.select-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 300000;
  .select-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .select-box {
    position: absolute;
    left: 0;
    bottom: -1000upx;
    width: 100%;
    background: #fff;
    max-height: 50%;
    // height: 0%;
    overflow: auto;
    .select-title {
      display: flex;
      justify-content: space-between;
      height: 80upx;
      background: #f5f5f5;
      line-height: 80upx;
      padding: 0 30upx;
    }
    .select-item {
      font-size: 28upx;
      color: #333;
      border-bottom: 1px solid #eee;
      height: 75upx;
      line-height: 75upx;
      padding: 0 30upx;
      i {
        display: block;
        float: right;
        border-bottom: 4upx solid #1ca032;
        border-right: 4upx solid #1ca032;
        width: 12upx;
        height: 26upx;
        transform: rotate(45deg);
        margin-top: 24.5upx;
      }
    }
  }
  @keyframes mymove {
    0% {
      max-height: 10%;
    }

    100% {
      max-height: 50%;
    }
  }

  /*Safari 和 Chrome:*/
  @-webkit-keyframes mymove {
    0% {
      max-height: 10%;
    }

    100% {
      max-height: 50%;
    }
  }
}

// 下拉icon
.select-icon {
  // display: block;
  float: right;
  border-bottom: 2upx solid #999;
  border-right: 2upx solid #999;
  width: 16upx;
  height: 16upx;
  transform: rotate(-45deg);
  margin-right: 10upx;
}
.color-orange {
  color: var(--color);
}
.color-999 {
  color: #999;
}
.font32 {
  font-size: 32upx;
}

.form-container {
  .del-button {
    font-size: 35rpx;
    color: #ccc;
    padding-left: 30rpx;
  }
  .form-box {
    width: 100%;
    box-sizing: border-box;
  }
  .colorRed {
    color: red;
    padding: 0 10rpx;
  }
  .img-box {
    border-bottom: 1px solid #ededed;
    .line-right {
      margin-left: 36rpx;
    }
    padding: 30upx 0;
    .update-img-box {
      border: 1px solid #ededed;
      display: flex;

      .update-img {
        width: 140upx;
        height: 140upx;
      }
    }
    .update-img-box2 {
      overflow: hidden;
      display: flex;
    }
    .update-img-box,
    .update-btn-box {
      width: 140upx;
      height: 140upx;
      position: relative;
      margin-top: 20upx;
    }
    .update-img-box .close-img {
      width: 40upx;
      height: 40upx;
      position: absolute;
      right: -12upx;
      top: -16upx;
      background: #fff;
      border-radius: 50%;
    }
    img {
      width: 140upx;
      height: 140upx;
      object-fit: cover;
    }
  }
  .line-right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .line-bottom-select {
    padding-top: 40rpx;
  }
  .line-bottom-textarea {
    padding-top: 20rpx;
    textarea {
      min-height: 100rpx;
    }
  }
  min-height: 200px;
  .send-code-box {
    .send-code {
      font-size: 28upx;
      padding: 0;
      white-space: nowrap;
      // width: 60%;
      //color:#ff5b01;
      height: 90upx;
      line-height: 90upx;
      cursor: pointer;
    }
  }
  .line-left {
    display: flex;
    min-width: 22%;
    align-items: center;
    height: 100%;
    letter-spacing: 0.5px;
    font-size: 26rpx;
    // font-weight: 550;
    color: #000000;
    box-sizing: border-box;
  }
  .img-label {
    width: 100%;
    height: 100%;
    font-size: 28upx;
    color: #333;
    box-sizing: border-box;
  }
  .p-l14 {
    padding-left: 34rpx;
  }
  .textarea-box {
    // display: flex;
    width: 100%;
    border-bottom: 1px solid #ededed;
    padding-top: 20upx;
    // align-items: center;
    textarea {
      padding-left: 32rpx;
      height: 100rpx;
      font-size: 25rpx;
      color: #333;
    }
  }
  .line {
    padding: 27rpx 0;
    margin-top: 30upx;
    // min-height: 100rpx;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;
    overflow: hidden;
    .input {
      padding-right: 20upx;
      height: 100%;
      width: 100%;
      text-align: right;
      font-size: 28upx;
      color: #333;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
    }
  }
  .line-col {
    padding: 27rpx 0;
    margin-top: 30upx;
    // min-height: 100rpx;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;
    overflow: hidden;
    .input {
      padding-right: 20upx;
      height: 100%;
      width: 100%;
      text-align: left;
      font-size: 28upx;
      color: #333;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
    }
  }
  .num {
    margin-right: 8rpx;
  }
  // 自定义css
  .flex-row {
    display: flex;
  }

  .flex-row-c {
    display: flex;
    justify-content: center;
  }

  .flex-row--c {
    display: flex;
    align-items: center;
  }

  .flex-row-c-c {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-row-sb-c {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-row-sb-t {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .flex-row-sb-b {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .flex-row-c-sb {
    display: flex;
    justify-content: center;
    align-items: space-between;
  }

  .flex-row-sb {
    display: flex;
    justify-content: space-between;
  }

  .flex-row-l {
    display: flex;
    justify-content: flex-start;
  }

  .flex-row-l-c {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .flex-row-c-t {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .flex-row-r-c {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .flex-row-r {
    display: flex;
    justify-content: flex-end;
  }

  .flex-row--b {
    display: flex;
    align-items: flex-end;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-col-c {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .flex-col--c {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flex-col-c-c {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flex-col-sb-c {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .flex-col-c-sb {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
  }

  .flex-col-sb {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .flex-col-t-c {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .flex-col-c-l {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .flex-col-t {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .flex-col-b {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .flex-col-b-c {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .flex-col-c-l {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  .flex-col--l {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .flex-col--r {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
