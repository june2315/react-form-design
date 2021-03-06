/*
 * author kcz
 * date 2019-11-20
 * description 表单控件项
 */
// TODO 数组合并
const mergeItem = (target, props) => {
  for (let key in props) {
    let targetType = Object.prototype.toString.call(target[key])
    let propsType = Object.prototype.toString.call(props[key])
    if (targetType === propsType) {
      switch (targetType) {
        case '[object Array]':
          for (let i = 0; i < target[key].length; i++) {
            mergeItem(target[key][i], props[key][i])
          }
          break;
        case '[object Object]':
          mergeItem(target[key], props[key])
          target[key] = Object.assign({}, props[key], target[key])
          break;
        default:
          target[key] = props[key]
      }
    }
  }
}

const mergeList = (list, props) => {
  for (let item of list) {
    mergeItem(item, props)
  }
  // console.log(list)
  return list
}

const commonProps = {
  formOptions: {
    // labelCol: { span: 4 },
    // wrapperCol: { span: 18 },
    rules: [
      //验证规则
      {
        required: false, // 必须填写
        message: "必填项"
      }
    ]
  },
}
// 基础控件
export const basicsList = mergeList([
  {
    formOptions: {
      label: "输入框", // 标题文字
    },
    type: "input", // 表单类型
    icon: "icon-write",
    options: {
      type: "text",
      width: 100, // 宽度
      defaultValue: "", // 默认值
      placeholder: "请输入", // 没有输入时，提示文字
      clearable: false,
      maxLength: null,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    model: "", // 数据字段
    key: "",
  },
  {
    formOptions: {
      label: "文本框", // 标题文字
    },
    type: "textarea", // 表单类型

    icon: "icon-edit",
    options: {
      width: "100", // 宽度
      minRows: 4,
      maxRows: 6,
      maxLength: null,
      defaultValue: "",
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      placeholder: "请输入"
    },
    model: "", // 数据字段
    key: "",
  },
  {
    formOptions: {
      label: "数字输入框", // 标题文字
    },
    type: "number", // 表单类型
    icon: "icon-number",
    options: {
      width: 100, // 宽度
      defaultValue: 0, // 默认值
      min: null, // 可输入最小值
      max: null, // 可输入最大值
      // precision: null,
      step: 1, // 步长，点击加减按钮时候，加减多少
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, //是否禁用
      placeholder: "请输入"
    },
    model: "", // 数据字段
    key: "",
    rules: [
      {
        required: false,
        message: "必填项"
      }
    ]
  },
  {
    formOptions: {
      label: "下拉选择器", // 标题文字
    },
    type: "select", // 表单类型
    icon: "icon-xiala",
    options: {
      width: 100, // 宽度
      defaultValue: undefined, // 下拉选框请使用undefined为默认值
      multiple: false, // 是否允许多选
      disabled: false, // 是否禁用
      clearable: false, // 是否显示清除按钮
      hidden: false, // 是否隐藏，false显示，true隐藏
      placeholder: "请选择", // 默认提示文字
      dynamicKey: "",
      dynamic: false,
      options: [
        // 下拉选择项配置
        {
          value: "1",
          label: "下拉框1"
        },
        {
          value: "2",
          label: "下拉框2"
        }
      ],
      showSearch: false // 是否显示搜索框，搜索选择的项的值，而不是文字
    },

    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "多选框", // 标题文字
    },
    type: "checkbox",
    icon: "icon-duoxuan1",
    options: {
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: [],
      dynamicKey: "",
      dynamic: false,
      options: [
        {
          value: "1",
          label: "选项1"
        },
        {
          value: "2",
          label: "选项2"
        },
        {
          value: "3",
          label: "选项3"
        }
      ]
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "单选框", // 标题文字
    },
    type: "radio", // 表单类型
    icon: "icon-danxuan-cuxiantiao",
    options: {
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: "", // 默认值
      dynamicKey: "",
      dynamic: false,
      options: [
        {
          value: "1",
          label: "选项1"
        },
        {
          value: "2",
          label: "选项2"
        },
        {
          value: "3",
          label: "选项3"
        }
      ]
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "日期选择框", // 标题文字
    },
    type: "date", // 表单类型
    icon: "icon-calendar",
    options: {
      width: 100, // 宽度
      defaultValue: "", // 默认值，字符串 12:00:00
      // rangeDefaultValue: [], // 默认值，字符串 12:00:00
      range: false, // 范围日期选择，为true则会显示两个时间选择框（同时defaultValue和placeholder要改成数组），
      showTime: false, // 是否显示时间选择器
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false, // 是否显示清除按钮
      placeholder: "请选择",
      rangePlaceholder: ["开始时间", "结束时间"],
      format: "YYYY-MM-DD" // 展示格式  （请按照这个规则写 YYYY-MM-DD HH:mm:ss，区分大小写）
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "时间选择框", // 标题文字
    },
    type: "time", // 表单类型
    icon: "icon-time",
    options: {
      width: 100, // 宽度
      defaultValue: "", // 默认值，字符串 12:00:00
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false, // 是否显示清除按钮
      placeholder: "请选择",
      format: "HH:mm:ss" // 展示格式
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "评分", // 标题文字
    },
    type: "rate", // 表单类型
    icon: "icon-pingfen_moren",
    options: {
      defaultValue: 0,
      max: 5, // 最大值
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowHalf: false // 是否允许半选
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "滑动输入条", // 标题文字
    },
    type: "slider", // 表单类型
    icon: "icon-menu",
    options: {
      width: 100, // 宽度
      defaultValue: 0, // 默认值， 如果range为true的时候，则需要改成数组,如：[12,15]
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长，取值必须大于 0，并且可被 (max - min) 整除
      showInput: false // 是否显示输入框，range为true时，请勿开启
      // range: false // 双滑块模式
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "上传文件", // 标题文字
    },
    type: "uploadFile", // 表单类型
    icon: "icon-upload",
    options: {
      defaultValue: "[]",
      multiple: false,
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      drag: false,
      downloadWay: "a",
      dynamicFun: "",
      width: 100,
      limit: 3,
      data: "{}",
      fileName: "file",
      headers: {},
      action: "http://cdn.kcz66.com/uploadFile.txt",
      placeholder: "上传"
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "上传图片", // 标题文字
    },
    type: "uploadImg",
    icon: "icon-image",
    options: {
      defaultValue: "[]",
      multiple: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      width: "100%",
      data: "{}",
      limit: 3,
      placeholder: "上传",
      fileName: "image",
      headers: {},
      action: "http://cdn.kcz66.com/upload-img.txt",
      listType: "picture-card"
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "树选择器", // 标题文字
    },
    type: "treeSelect", // 表单类型
    icon: "icon-tree",
    options: {
      width: 100,
      disabled: false, //是否禁用
      defaultValue: undefined, // 默认值
      multiple: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false, // 是否显示清除按钮
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      treeCheckable: false,
      placeholder: "请选择",
      dynamicKey: "",
      dynamic: true,
      options: [
        {
          value: "1",
          label: "选项1",
          children: [
            {
              value: "11",
              label: "选项11"
            }
          ]
        },
        {
          value: "2",
          label: "选项2",
          children: [
            {
              value: "22",
              label: "选项22"
            }
          ]
        }
      ]
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "级联选择器", // 标题文字
    },
    type: "cascader", // 表单类型
    icon: "icon-guanlian",
    options: {
      width: 100,
      disabled: false, //是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: undefined, // 默认值
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      placeholder: "请选择",
      clearable: false, // 是否显示清除按钮
      dynamicKey: "",
      dynamic: true,
      options: [
        {
          value: "1",
          label: "选项1",
          children: [
            {
              value: "11",
              label: "选项11"
            }
          ]
        },
        {
          value: "2",
          label: "选项2",
          children: [
            {
              value: "22",
              label: "选项22"
            }
          ]
        }
      ]
    },
    model: "",
    key: "",
  },
  // {
  //   type: "batch",
  //   label: "动态表格",
  //   icon: "icon-biaoge",
  //   list: [],
  //   options: {
  //     scrollY: 0,
  //     disabled: false,
  //     hidden: false, // 是否隐藏，false显示，true隐藏
  //     showLabel: false,
  //     hideSequence: false,
  //     width: "100%"
  //   },
  //   model: "",
  //   key: ""
  // },
  {
    formOptions: {
      label: "富文本", // 标题文字
    },
    type: "editor",
    icon: "icon-LC_icon_edit_line_1",
    list: [],
    options: {
      height: 300,
      placeholder: "请输入",
      defaultValue: "",
      chinesization: true,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      showLabel: false,
      width: 100
    },
    model: "",
    key: "",
  },
  {
    formOptions: {
      label: "开关", // 标题文字
    },
    type: "switch", // 表单类型
    icon: "icon-kaiguan3",
    options: {
      defaultValue: false, // 默认值 Boolean 类型
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用
      checkedChildren: '',
      unCheckedChildren: '',
    },
    model: "",
    key: "",
  },
  {
    type: "button", // 表单类型
    label: "按钮", // 标题文字
    icon: "icon-button-remove",
    hideModel: true,
    options: {
      type: "primary",
      handle: "submit",
      dynamicFun: "",
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    key: ""
  },
  {
    type: "alert",
    label: "警告提示",
    icon: "icon-zu",
    hideModel: true,
    options: {
      type: "success",
      description: "",
      showIcon: false,
      banner: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      closable: false
    },
    key: ""
  },
  {
    type: "text",
    label: "文字",
    icon: "icon-zihao",
    hideModel: true,
    options: {
      textAlign: "left",
      hidden: false, // 是否隐藏，false显示，true隐藏
      showRequiredMark: false
    },
    key: ""
  },
  {
    type: "html",
    label: "HTML",
    icon: "icon-ai-code",
    hideModel: true,
    options: {
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: "<strong>HTML</strong>"
    },
    key: ""
  }
], commonProps)

// 高级控件
// export const highList = [];

// import { Alert } from "ant-design-vue";

// 自定义组件
export const customComponents = {
  title: "自定义组件",
  list: [
    // {
    //   label: "测试",
    //   type: "jkjksdf",
    //   component: Alert,
    //   options: {
    //     multiple: false,
    //     disabled: false,
    //     width: "100%",
    //     data: "{}",
    //     limit: 3,
    //     placeholder: "上传",
    //     action: "",
    //     listType: "picture-card"
    //   },
    //   model: "",
    //   key: "",
    //   rules: [
    //     {
    //       required: false,
    //       message: "必填项"
    //     }
    //   ]
    // }
  ]
};
// window.$customComponentList = customComponents.list;

// 布局控件
export const layoutList = [
  {
    type: "divider",
    label: "分割线",
    icon: "icon-fengexian",
    options: {
      orientation: "left"
    },
    key: "",
    model: ""
  },
  {
    type: "card",
    label: "卡片布局",
    icon: "icon-qiapian",
    list: [],
    key: "",
    model: "",
  },
  {
    type: "tabs",
    label: "标签页布局",
    icon: "icon-tabs",
    options: {
      tabBarGutter: null,
      type: "line",
      tabPosition: "top",
      size: "default",
      animated: true
    },
    columns: [
      {
        value: "1",
        label: "选项1",
        list: []
      },
      {
        value: "2",
        label: "选项2",
        list: []
      }
    ],
    key: "",
    model: ""
  },
  {
    type: "row",
    label: "栅格布局",
    icon: "icon-zhage",
    columns: [
      {
        type: 'col',
        span: 12,
        list: []
      },
      {
        type: 'col',
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0
    },
    key: "",
    model: "",
    hideModel: true
  },
  {
    type: "table",
    label: "表格布局",
    icon: "icon-biaoge",
    trs: [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ],
    options: {
      width: "100%",
      bordered: true,
      bright: false,
      small: true,
      customStyle: ""
    },
    key: "",
    model: ""
  }
];
