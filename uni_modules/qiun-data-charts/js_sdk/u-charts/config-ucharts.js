/*
 * uCharts®
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
 * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 
 * uCharts®官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
const color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];

//事件转换函数，主要用作格式化x轴为时间轴，根据需求自行修改
const formatDateTime = (timeStamp, returnType)=>{
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if(returnType == 'full'){return y + '-' + m + '-' + d + ' '+ h +':' + minute + ':' + second;}
  if(returnType == 'y-m-d'){return y + '-' + m + '-' + d;}
  if(returnType == 'h:m'){return  h +':' + minute;}
  if(returnType == 'h:m:s'){return  h +':' + minute +':' + second;}
  return [y, m, d, h, minute, second];
}

//事件转换函数，主要用作格式化x轴为时间轴，根据需求自行修改
const formatDateTime_JS = (timeStamp, returnType) => {
	const dateObj = new Date(+timeStamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
	const y = dateObj.getFullYear() // 获取年，
	const m = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
	const d = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
	const h = pad(dateObj.getHours()) // 获取时, pad函数用来补0
	const minute = pad(dateObj.getMinutes()) // 获取分
	const second = pad(dateObj.getSeconds()) // 获取秒
	if (returnType == 'full') {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	}
	if (returnType == 'y-m-d') {
		return y + '-' + m + '-' + d;
	}
	if (returnType == 'h:m') {
		return h + ':' + minute;
	}
	if (returnType == 'h:m:s') {
		return h + ':' + minute + ':' + second;
	}
	return [y, m, d, h, minute, second];
}
function pad(str) {
	return +str >= 10 ? str : '0' + str
}

module.exports = {
  //demotype为自定义图表类型，一般不需要自定义图表类型，只需要改根节点上对应的类型即可
	"type":["pie","ring","rose","word","funnel","map","arcbar","line","column","bar","area","radar","gauge","candle","mix","tline","tarea","scatter","bubble","demotype","varial_number","ActivityWordCloud","average_number","rise_number","WayofGetting","classTotal","partimix","warningTotal","changingline","tribefunnel","staffrose"],
	"range":["饼状图","圆环图","玫瑰图","词云图","漏斗图","地图","圆弧进度条","折线图","柱状图","条状图","区域图","雷达图","仪表盘","K线图","混合图","时间轴折线","时间轴区域","散点图","气泡图","自定义类型","学时统计","热门活动"],
  //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型，例如最后的"demotype"
  //自定义类型时需要注意"tline","tarea","scatter","bubble"等时间轴（矢量x轴）类图表，没有categories，不需要加入categories
	"categories":["line","column","bar","area","radar","gauge","candle","mix","demotype"],
  //instance为实例变量承载属性，不要删除
  "instance":{},
  //option为opts及eopts承载属性，不要删除
  "option":{},
  //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
  "formatter":{
    "yAxisDemo1":function(val){return val+'元'},
    "yAxisDemo2":function(val){return val.toFixed(2)},
    "xAxisDemo1":function(val){return val+'年'},
    "xAxisDemo2":function(val){return formatDateTime(val,'h:m')},
		"xAxisDemo3":function(val){return formatDateTime_JS(val,'h:m')},
    "seriesDemo1":function(val){return val+'元'},
    "tooltipDemo1":function(item, category, index, opts){
      if(index==0){
      	return '随便用'+item.data+'年'
      }else{
      	return '其他我没改'+item.data+'天'
      }
    },
    "pieDemo":function(val, index, series){
      if(index !== undefined){
        return series[index].name+'：'+series[index].data+'元'
      }
    },
  },
  //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在opts参数，会将demotype与opts中option合并后渲染图表。
  "demotype":{
    //我这里把曲线图当做了自定义图表类型，您可以根据需要随意指定类型或配置
    "type": "line",
    "color": color,
    "padding": [15,10,0,15],
    "xAxis": {
      "disableGrid": true,
    },
    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
    },
    "legend": {
    },
    "extra": {
    	"line": {
    		"type": "curve",
    		"width": 2
    	},
    }
  },
  //下面是自定义配置，请添加项目所需的通用配置
	"pie":{
		"type": "pie",
    "color": color,
		"padding": [5,5,5,5],
		"extra": {
			"pie": {
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": true,
				"borderWidth": 3,
				"borderColor": "#FFFFFF"
			},
		}
	},
	"ring":{
		"type": "ring",
    "color": color,
		"padding": [5,5,5,5],
		"rotate": false,
		"dataLabel": true,
		"legend": {
			"show": true,
			"position": "right",
      "lineHeight": 25,
		},
		"title": {
			"name": "收益率",
			"fontSize": 15,
			"color": "#666666"
		},
		"subtitle": {
			"name": "70%",
			"fontSize": 25,
			"color": "#7cb5ec"
		},
		"extra": {
			"ring": {
				"ringWidth":30,
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": true,
				"borderWidth": 3,
				"borderColor": "#FFFFFF"
			},
		},
	},
	"rose":{
		"type": "rose",
    "color": color,
		"padding": [5,5,5,5],
		"legend": {
			"show": true,
			"position": "left",
      "lineHeight": 25,
		},
		"extra": {
			"rose": {
				"type": "area",
				"minRadius": 50,
				"activeOpacity": 0.5,
				"activeRadius": 10,
				"offsetAngle": 0,
				"labelWidth": 15,
				"border": false,
				"borderWidth": 2,
				"borderColor": "#FFFFFF"
			},
		}
	},
	"word":{
		"type": "word",
    "color": color,
		"extra": {
			"word": {
				"type": "normal",
				"autoColors": false
			}
		}
	},
	"funnel":{
		"type": "funnel",
    "color": color,
		"padding": [15,15,0,15],
		"extra": {
			"funnel": {
				"activeOpacity": 0.3,
				"activeWidth": 10,
				"border": true,
				"borderWidth": 2,
				"borderColor": "#FFFFFF",
				"fillOpacity": 1,
				"labelAlign": "right"
			},
		}
	},
	"map":{
		"type": "map",
    "color": color,
		"padding": [0,0,0,0],
    "dataLabel": true,
		"extra": {
			"map": {
				"border": true,
				"borderWidth": 1,
				"borderColor": "#666666",
				"fillOpacity": 0.6,
				"activeBorderColor": "#F04864",
				"activeFillColor": "#FACC14",
				"activeFillOpacity": 1
			},
		}
	},
	"arcbar":{
		"type": "arcbar",
    "color": color,
		"title": {
			"name": "百分比",
			"fontSize": 25,
			"color": "#00FF00"
		},
		"subtitle": {
			"name": "默认标题",
			"fontSize": 15,
			"color": "#666666"
		},
		"extra": {
			"arcbar": {
				"type": "default",
				"width": 12,
				"backgroundColor": "#E9E9E9",
				"startAngle": 0.75,
				"endAngle": 0.25,
				"gap": 2
			}
		}
	},
	"line":{
		"type": "line",
    "color": color,
		"padding": [15,10,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
		},
		"legend": {
		},
		"extra": {
			"line": {
				"type": "straight",
				"width": 2
			},
		}
	},
  "tline":{
  	"type": "line",
    "color": color,
  	"padding": [15,10,0,15],
  	"xAxis": {
      "disableGrid": false,
      "boundaryGap":"justify",
  	},
  	"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data":[
        {
          "min":0,
          "max":80
        }
      ]
  	},
  	"legend": {
  	},
  	"extra": {
  		"line": {
  			"type": "curve",
  			"width": 2
  		},
  	}
  },
  "tarea":{
  	"type": "area",
    "color": color,
  	"padding": [15,10,0,15],
  	"xAxis": {
      "disableGrid": true,
      "boundaryGap":"justify",
  	},
  	"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data":[
        {
          "min":0,
          "max":80
        }
      ]
  	},
  	"legend": {
  	},
  	"extra": {
  		"area": {
  			"type": "curve",
  			"opacity": 0.2,
  			"addLine": true,
  			"width": 2,
  			"gradient": true
  		},
  	}
  },
	"column":{
		"type": "column",
    "color": color,
		"padding": [15,15,0,5],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
      "data":[{"min":0}]
		},
		"legend": {
		},
		"extra": {
			"column": {
				"type": "group",
				"width": 30,
				"meterBorde": 1,
				"meterFillColor": "#FFFFFF",
				"activeBgColor": "#000000",
				"activeBgOpacity": 0.08
			},
		}
	},
  "bar":{
  	"type": "bar",
    "color": color,
  	"padding": [15,30,0,5],
  	"xAxis": {
      "boundaryGap":"justify",
      "disableGrid":false,
      "min":0,
      "axisLine":false
  	},
  	"yAxis": {
  	},
  	"legend": {
  	},
  	"extra": {
  		"bar": {
  			"type": "group",
  			"width": 30,
  			"meterBorde": 1,
  			"meterFillColor": "#FFFFFF",
  			"activeBgColor": "#000000",
  			"activeBgOpacity": 0.08
  		},
  	}
  },
	"area":{
		"type": "area",
		"color": color,
		"padding": [15,15,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
      "gridType": "dash",
      "dashLength": 2,
		},
		"legend": {
		},
		"extra": {
			"area": {
				"type": "straight",
				"opacity": 0.2,
				"addLine": true,
				"width": 2,
				"gradient": false
			},
		}
	},
	"radar":{
		"type": "radar",
		"color": color,
		"padding": [5,5,5,5],
		"legend": {
			"show": false,
			"position": "right",
      "lineHeight": 25,
		},
		"extra": {
			"radar": {
				"gridType": "radar",
				"gridColor": "#CCCCCC",
				"gridCount": 3,
				"opacity": 0.2,
				"max": 200
			},
		}
	},
	"gauge":{
		"type": "gauge",
		"color": color,
		"title": {
			"name": "66Km/H",
			"fontSize": 25,
			"color": "#2fc25b",
			"offsetY": 50
		},
		"subtitle": {
			"name": "实时速度",
			"fontSize": 15,
			"color": "#1890ff",
			"offsetY": -50
		},
		"extra": {
			"gauge": {
				"type": "default",
				"width": 30,
				"labelColor": "#666666",
				"startAngle": 0.75,
				"endAngle": 0.25,
				"startNumber": 0,
				"endNumber": 100,
				"labelFormat": "",
				"splitLine": {
					"fixRadius": 0,
					"splitNumber": 10,
					"width": 30,
					"color": "#FFFFFF",
					"childNumber": 5,
					"childWidth": 12
				},
				"pointer": {
					"width": 24,
					"color": "auto"
				}
			}
		}
	},
	"candle":{
		"type": "candle",
		"color": color,
		"padding": [15,15,0,15],
		"enableScroll": true,
		"enableMarkLine": true,
		"dataLabel": false,
		"xAxis": {
			"labelCount": 4,
			"itemCount": 40,
			"disableGrid": true,
			"gridColor": "#CCCCCC",
			"gridType": "solid",
			"dashLength": 4,
			"scrollShow": true,
			"scrollAlign": "left",
			"scrollColor": "#A6A6A6",
			"scrollBackgroundColor": "#EFEBEF"
		},
		"yAxis": {
		},
		"legend": {
			"show": false
		},
		"extra": {
			"candle": {
				"color": {
					"upLine": "#f04864",
					"upFill": "#f04864",
					"downLine": "#2fc25b",
					"downFill": "#2fc25b"
				},
				"average": {
					"show": true,
					"name": ["MA5","MA10","MA30"],
					"day": [5,10,20],
					"color": ["#1890ff","#2fc25b","#facc14"]
				}
			},
			"markLine": {
				"type": "dash",
				"dashLength": 5,
				"data": [
					{
						"value": 2150,
						"lineColor": "#f04864",
						"showLabel": true
					},
					{
						"value": 2350,
						"lineColor": "#f04864",
						"showLabel": true
					}
				]
			}
		}
	},
	"mix":{
		"type": "mix",
		"color": color,
		"padding": [15,15,0,15],
		"xAxis": {
      "disableGrid": true,
		},
		"yAxis": {
			"disabled": false,
			"disableGrid": false,
			"splitNumber": 5,
			"gridType": "dash",
			"dashLength": 4,
			"gridColor": "#CCCCCC",
			"padding": 10,
			"showTitle": true,
			"data": []
		},
		"legend": {
		},
		"extra": {
			"mix": {
				"column": {
					"width": 20
				}
			},
		}
	},
	"scatter":{
		"type": "scatter",
		"color":color,
		"padding":[15,15,0,15],
    "dataLabel":false,
    "xAxis": {
      "disableGrid": false,
      "gridType":"dash",
      "splitNumber":5,
      "boundaryGap":"justify",
      "min":0
    },
    "yAxis": {
      "disableGrid": false,
      "gridType":"dash",
    },
    "legend": {
    },
    "extra": {
    	"scatter": {
    	},
    }
	},
	"bubble":{
		"type": "bubble",
		"color":color,
		"padding":[15,15,0,15],
    "xAxis": {
      "disableGrid": false,
      "gridType":"dash",
      "splitNumber":5,
      "boundaryGap":"justify",
      "min":0,
      "max":250
    },
    "yAxis": {
      "disableGrid": false,
      "gridType":"dash",
      "data":[{
        "min":0,
        "max":150
      }]
    },
    "legend": {
    },
    "extra": {
    	"bubble": {
        "border":2,
        "opacity": 0.5,
    	},
    }
	},
	"varial_number":{
	    "type": "column",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff7f",
	        "#ffff00",
	        "#ff00ff",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": true,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "solid",
	        "dashLength": 8,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": false,
	        "data": [
				{"min": 0,
				}
			]
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "column": {
	            "type": "group",
	            "width": 12,
	            "seriesGap": 2,
	            "categoryGap": 3,
	            "barBorderCircle": false,
	            "linearType": "custom",
	            "linearOpacity": 1,
	            "colorStop": 0,
	            "meterBorder": 1,
	            "meterFillColor": "#FFFFFF",
	            "activeBgColor": "#000000",
	            "activeBgOpacity": 0.08,
	            "meterBorde": 1
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"ActivityWordCloud":{
	    "type": "word",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#91CB74",
	        "#FAC858",
	        "#EE6666",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "extra": {
	        "word": {
	            "type": "normal",
	            "autoColors": false
	        }
	    }
	},
	"average_number":{
	    "type": "column",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff7f",
	        "#ffff00",
	        "#ff00ff",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": true,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": true,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "solid",
	        "dashLength": 8,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": false,
	        "data": [
				{"min": 0,
				}
			]
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "column": {
	            "type": "group",
	            "width": 20,
	            "seriesGap": 3,
	            "categoryGap": 1,
	            "barBorderCircle": false,
	            "linearType": "custom",
	            "linearOpacity": 1,
	            "colorStop": 0,
	            "meterBorder": 1,
	            "meterFillColor": "#FFFFFF",
	            "activeBgColor": "#000000",
	            "activeBgOpacity": 0.08,
	            "meterBorde": 1
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"rise_number":{
	    "type": "bar",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff00",
	        "#ffff00",
	        "#ff00ff",
	        "#ffaa00",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        30,
	        0,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": true,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": false,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": false,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "justify",
	        "disableGrid": false,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "min": 0,
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "solid",
	        "dashLength": 8,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": false,
	        "data": []
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "bar": {
	            "type": "stack",
	            "width": 30,
	            "seriesGap": 2,
	            "categoryGap": 3,
	            "barBorderCircle": false,
	            "linearType": "custom",
	            "linearOpacity": ["#00ffff", "#aaff00","#ffaa00","#ffaaff","#0055ff"],
	            "colorStop": 0.6,
	            "activeBgColor": "#000000",
	            "activeBgOpacity": 0.08,
	            "meterBorde": 1,
	            "meterFillColor": "#FFFFFF"
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"WayofGetting":{
	    "type": "pie",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff00",
	        "#ffaa00",
	        "#aa55ff",
	        "#55ffff",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        5,
	        5,
	        5,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "hollow",
	    "tapLegend": true,
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "pie": {
	            "activeOpacity": 0.5,
	            "activeRadius": 10,
	            "offsetAngle": 0,
	            "customRadius": 0,
	            "labelWidth": 15,
	            "border": true,
	            "borderWidth": 3,
	            "borderColor": "#FFFFFF",
	            "linearType": "custom"
	        },
	        "tooltip": {
	            "showBox": false,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        }
	    }
	},
	"classTotal":{
	    "type": "ring",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff7f",
	        "#ffff00",
	        "#EE6666",
	        "#aa55ff",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        5,
	        5,
	        5,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": false,
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 5,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "title": {
	        "name": "课程总数",
	        "fontSize": 16,
	        "color": "#666666",
	        "offsetX": 0,
	        "offsetY": 0
	    },
	    "subtitle": {
	        "name": "8180",
	        "fontSize": 20,
	        "color": "#7cb5ec",
	        "offsetX": 0,
	        "offsetY": 0
	    },
	    "extra": {
	        "ring": {
	            "ringWidth": 30,
	            "centerColor": "#FFFFFF",
	            "activeOpacity": 0.5,
	            "activeRadius": 10,
	            "offsetAngle": 0,
	            "customRadius": 0,
	            "labelWidth": 15,
	            "border": true,
	            "borderWidth": 3,
	            "borderColor": "#FFFFFF",
	            "linearType": "custom"
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        }
	    }
	},
	"partimix":{
	    "type": "mix",
	    "canvasId": "",
	    "canvas2d": true,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff00",
	        "#ff00ff",
	        "#EE6666",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        15
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": true,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": true,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "dash",
	        "dashLength": 4,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": true,
	        "data": []
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "mix": {
	            "column": {
	                "width": 20,
	                "seriesGap": 2,
	                "barBorderCircle": false,
	                "linearType": "custom",
	                "linearOpacity": 1,
	                "colorStop": 0
	            }
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"warningTotal":{
	    "type": "ring",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff7f",
	        "#ffff00",
	        "#EE6666",
	        "#aa55ff",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        5,
	        5,
	        5,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": false,
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 5,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "title": {
	        "name": "预警总人次",
	        "fontSize": 16,
	        "color": "#666666",
	        "offsetX": 0,
	        "offsetY": 0
	    },
	    "subtitle": {
	        "name": "1345",
	        "fontSize": 20,
	        "color": "#7cb5ec",
	        "offsetX": 0,
	        "offsetY": 0
	    },
	    "extra": {
	        "ring": {
	            "ringWidth": 30,
	            "centerColor": "#FFFFFF",
	            "activeOpacity": 0.5,
	            "activeRadius": 10,
	            "offsetAngle": 0,
	            "customRadius": 0,
	            "labelWidth": 15,
	            "border": true,
	            "borderWidth": 3,
	            "borderColor": "#FFFFFF",
	            "linearType": "custom"
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        }
	    }
	},
	"changingline":{
	    "type": "line",
	    "canvasId": "",
	    "canvas2d": true,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#ff0000",
	        "#FAC858",
	        "#EE6666",
	        "#73C0DE",
	        "#3CA272",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        10,
	        0,
	        15
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "xAxis": {
	        "disabled": false,
	        "axisLine": true,
	        "axisLineColor": "#CCCCCC",
	        "calibration": false,
	        "fontColor": "#666666",
	        "fontSize": 13,
	        "rotateLabel": false,
	        "itemCount": 5,
	        "boundaryGap": "center",
	        "disableGrid": true,
	        "gridColor": "#CCCCCC",
	        "gridType": "solid",
	        "dashLength": 4,
	        "gridEval": 1,
	        "scrollShow": false,
	        "scrollAlign": "left",
	        "scrollColor": "#A6A6A6",
	        "scrollBackgroundColor": "#EFEBEF",
	        "format": ""
	    },
	    "yAxis": {
	        "disabled": false,
	        "disableGrid": false,
	        "splitNumber": 5,
	        "gridType": "dash",
	        "dashLength": 2,
	        "gridColor": "#CCCCCC",
	        "padding": 10,
	        "showTitle": false,
	        "data": [
	            {                
	                "min": 0
	            }
	        ]
	    },
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "line": {
	            "type": "straight",
	            "width": 2
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        },
	        "markLine": {
	            "type": "solid",
	            "dashLength": 4,
	            "data": []
	        }
	    }
	},
	"tribefunnel":{
	    "type": "funnel",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff00",
	        "#aaaaff",
	        "#ff0000",
	        "#ffff00",
	        "#5555ff",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        15,
	        15,
	        0,
	        15
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 11,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "funnel": {
	            "type": "pyramid",
	            "activeOpacity": 0.3,
	            "activeWidth": 10,
	            "border": true,
	            "borderWidth": 2,
	            "borderColor": "#FFFFFF",
	            "fillOpacity": 1,
	            "labelAlign": "right",
	            "linearType": "custom"
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        }
	    }
	},
	"staffrose":{
	    "type": "rose",
	    "canvasId": "",
	    "canvas2d": false,
	    "background": "none",
	    "animation": true,
	    "timing": "easeOut",
	    "duration": 1000,
	    "color": [
	        "#1890FF",
	        "#00ff7f",
	        "#ffff00",
	        "#ff00ff",
	        "#ffaa00",
	        "#55ffff",
	        "#FC8452",
	        "#9A60B4",
	        "#ea7ccc"
	    ],
	    "padding": [
	        5,
	        5,
	        5,
	        5
	    ],
	    "rotate": false,
	    "errorReload": true,
	    "fontSize": 13,
	    "fontColor": "#666666",
	    "enableScroll": false,
	    "touchMoveLimit": 60,
	    "enableMarkLine": false,
	    "dataLabel": true,
	    "dataPointShape": true,
	    "dataPointShapeType": "solid",
	    "tapLegend": true,
	    "legend": {
	        "show": true,
	        "position": "bottom",
	        "float": "center",
	        "padding": 5,
	        "margin": 5,
	        "backgroundColor": "rgba(0,0,0,0)",
	        "borderColor": "rgba(0,0,0,0)",
	        "borderWidth": 0,
	        "fontSize": 13,
	        "fontColor": "#666666",
	        "lineHeight": 25,
	        "hiddenColor": "#CECECE",
	        "itemGap": 10
	    },
	    "extra": {
	        "rose": {
	            "type": "radius",
	            "minRadius": 40,
	            "activeOpacity": 0.5,
	            "activeRadius": 10,
	            "offsetAngle": 0,
	            "labelWidth": 15,
	            "border": true,
	            "borderWidth": 2,
	            "borderColor": "#FFFFFF",
	            "linearType": "none"
	        },
	        "tooltip": {
	            "showBox": true,
	            "showArrow": true,
	            "showCategory": false,
	            "borderWidth": 0,
	            "borderRadius": 0,
	            "borderColor": "#000000",
	            "borderOpacity": 0.7,
	            "bgColor": "#000000",
	            "bgOpacity": 0.7,
	            "gridType": "solid",
	            "dashLength": 4,
	            "gridColor": "#CCCCCC",
	            "fontColor": "#FFFFFF",
	            "splitLine": true,
	            "horizentalLine": false,
	            "xAxisLabel": false,
	            "yAxisLabel": false,
	            "labelBgColor": "#FFFFFF",
	            "labelBgOpacity": 0.7,
	            "labelFontColor": "#666666"
	        }
	    }
	}
}