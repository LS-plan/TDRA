/*
 * @Author: your name
 * @Date: 2021-07-16 14:09:22
 * @LastEditTime: 2021-08-08 16:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \saas\components\activeForm\js\verification.js
 */
// import Vrules from "./vregular.js"; //正则验证

let verification = {};
verification.install = function(Vue) {
    //校验
    Vue.prototype.$vervify = function(formData) {
        formData.forEach((item) => {
            if (item.rules.verify) {
                switch (item.type) {
                    case "checkbox":
                        if (item.rules.value.length == 0) {
                            uni.showToast({
                                title: item.rules.errMess || "请选择" + item.label,
                                duration: 2000,
                                icon: "none",
                            });

                            throw Error(); //终止函数
                        }
                        break;
                    case "phone":
                        if (!item.rules.value) {
                            uni.showToast({
                                title: "手机号不能为空",
                                duration: 2000,
                                icon: "none",
                            });

                            throw Error(); //终止函数
                        }
                        if (!/^\s{0}$|^1\d{10}$/.test(item.rules.value)) {
                            uni.showToast({
                                title: "手机格式错误",
                                duration: 2000,
                                icon: "none",
                            });

                            throw Error(); //终止函数
                        }
                        break;
                    default:
                        if (!item.rules.value) {
                            uni.showToast({
                                title: item.rules.errMess || item.label + "不能为空",
                                duration: 2000,
                                icon: "none",
                            });

                            throw Error(); //终止函数
                        }
                        break;
                }
            }
        });
    };
    // 提交序列化的表单
    Vue.prototype.$submitForm = function(formData) {
        console.log("formData :>> ", formData);
        let submitData = {};
        for (let i = 0; i < formData.length; i++) {
            submitData[formData[i].rules.name] = formData[i].rules.value;
        }
        return submitData;
    };
    //自定义方法
    Vue.prototype.$f = {
        zIndex: {
            toast: 10090,
            noNetwork: 10080,
            // popup包含popup，actionsheet，keyboard，picker的值
            popup: 10075,
            mask: 10070,
            navbar: 980,
            topTips: 975,
            sticky: 970,
            indexListSticky: 965,
        },
        $parent(name = undefined) {
            let parent = this.$parent;
            // 通过while历遍，这里主要是为了H5需要多层解析的问题
            while (parent) {
                // 父组件
                if (parent.$options && parent.$options.name !== name) {
                    // 如果组件的name不相等，继续上一级寻找
                    parent = parent.$parent;
                } else {
                    return parent;
                }
            }
            return false;
        },
        addUnit(value = "auto", unit = "rpx") {
            /**
             * 验证十进制数字
             */
            function number(value) {
                return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            }

            value = String(value);
            // 用uView内置验证规则中的number判断是否为数值
            return number(value) ? `${value}${unit}` : value;
        },
        // 判断arr是否为一个数组，返回一个bool值
        isArray(arr) {
            return Object.prototype.toString.call(arr) === "[object Array]";
        },
        deepClone(obj) {
            // 对常见的“非”值，直接返回原来值
            if ([null, undefined, NaN, false].includes(obj)) return obj;
            if (typeof obj !== "object" && typeof obj !== "function") {
                //原始类型直接返回
                return obj;
            }
            var o = this.isArray(obj) ? [] : {};
            for (let i in obj) {
                if (obj.hasOwnProperty(i)) {
                    o[i] = typeof obj[i] === "object" ? this.deepClone(obj[i]) : obj[i];
                }
            }
            return o;
        },
        toast(title, duration = 1500, isSuccess) {
            isSuccess
                ?
                (uni.showToast({
                    title: title,
                    icon: "success",
                    duration: duration,
                })) :
                (uni.showToast({
                    title: title,
                    icon: "none",
                    duration: duration,
                }))
        },
    };
};
export default verification;