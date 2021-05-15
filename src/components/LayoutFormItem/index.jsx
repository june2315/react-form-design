import React, { memo, useEffect, useState } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch, Input, InputNumber, Divider, Select, Checkbox, Radio, DatePicker, TimePicker, Rate, Slider, Upload, TreeSelect, Cascader, Alert } from 'antd'
import GridItem from './GridItem'
import CardItem from './CardItem'
import TabsItem from './TabsItem'
import TableItem from './TableItem'
import { UploadFile, UploadImage } from '../Upload'
import RichEditor from '../RichEditor'
import FormItemDragWrap from './FormItemDragWrap'
import { CodepenOutlined } from '@ant-design/icons'
import moment from 'moment'

import './index.less'
export {
  GridItem,
  CardItem,
  TabsItem,
  TableItem,
}

const { RangePicker } = DatePicker
const { Dragger } = Upload


const FormItemWarpper = (props) => {
  const { data, config, children, form, showLabel = true, formProps = {} } = props

  useEffect(() => {
    form.resetFields([data.model])
  }, [data.options.minRows])

  useEffect(() => {
    if (/^input$|^textarea$|^number$|^checkbox$|^radio$|^date$|^rate$|^slider$|^select$|^switch$|^html$/g.test(data.type)) {
      form.setFieldsValue({ [data.model]: data.options.defaultValue })
    }
  }, [data.options.defaultValue])

  return <FormItemDragWrap {...props}>
    <Form.Item
      label={showLabel ? data.label : ''}
      labelCol={config.layout === 'horizontal' ? config.labelCol : {}}
      wrapperCol={config.layout === 'horizontal' ? config.wrapperCol : {}}
      name={data.model}
      // initialValue={data.options.defaultValue}
      hidden={data.options.hidden}
      rules={data.rules}
      {...formProps}
    >{children}</Form.Item>
  </FormItemDragWrap>
}

/* 输入框 */
export const InputItem = memo((props) => {
  const { data, config, onChange } = props
  const { placeholder, type, clearable, maxLength, disabled, width, defaultValue } = data.options || {}
  return <FormItemWarpper {...props} >
    <Input
      onChange={onChange}
      style={{ width: width + '%' }}
      placeholder={placeholder}
      type={type}
      value={defaultValue}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
    />
  </FormItemWarpper>
})

/* 数字输入框 */
export const InputNumberItem = memo(props => {
  const { data, config, onChange } = props
  const { width, min, max, step, precision, defaultValue, placeholder } = data.options
  // console.log(precision)
  return <FormItemWarpper {...props} >
    <InputNumber
      style={{ width: width + '%' }}
      onChange={onChange}
      min={min}
      max={max}
      disabled={props.disabled || data.options.disabled}
      step={step}
      value={defaultValue}
      precision={(precision > 50 || (precision && precision !== 0)) ? null : precision}
    />
  </FormItemWarpper>
})

/* 文本框 */
export const TextAreaItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, type, clearable, maxLength, disabled, width, minRows = 1, maxRows = 4 } = data.options || {}
  return <FormItemWarpper {...props} >
    <Input.TextArea
      onChange={onChange}
      style={{ width: width + '%' }}
      value={defaultValue}
      placeholder={placeholder}
      type={type}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
      autoSize={{ minRows, maxRows }}
      rows={minRows}
    />
  </FormItemWarpper>
})

/* 下拉选择器 */
export const SelectItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, width, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Select
      style={{ width: width + '%' }}
      value={defaultValue}
      placeholder={placeholder}
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      showSearch={showSearch}
      filterOption={showSearch ? (inputValue, option) => {
        return (
          option.label
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) >= 0
        )
      } : false}
      disabled={props.disabled || disabled}
      allowClear={clearable}
      mode={multiple ? 'multiple' : ''}
    />
  </FormItemWarpper>
})

/* 多选框 */
export const CheckboxGroupItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Checkbox.Group
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      disabled={props.disabled || disabled}
      value={defaultValue}
      placeholder={placeholder}
    />
  </FormItemWarpper>
})

/* 单选框 */
export const RadioGroupItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Radio.Group
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      disabled={props.disabled || disabled}
      value={defaultValue}
      placeholder={placeholder}
    />
  </FormItemWarpper>
})


/* 日期选择器 */
export const DatePickerItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, rangePlaceholder, rangeDefaultValue, showTime, clearable, format, disabled, range, width } = data.options || {}

  const dateValue = () => {
    if (!range && !defaultValue) return
    if (range && !defaultValue.length) return
    if (range) return defaultValue.map(d => moment(d, format))
    return moment(defaultValue, format)
  }

  let PickerComponent = DatePicker

  if (range) PickerComponent = RangePicker
  return <FormItemWarpper {...props}>
    <div>
      <PickerComponent
        style={{ width: width + '%' }}
        showTime={showTime}
        disabled={props.disabled || disabled}
        allowClear={clearable}
        format={format}
        value={dateValue()}
        placeholder={range ? rangePlaceholder : placeholder}
      />
    </div>
  </FormItemWarpper>
})

/* 时间选择器 */
export const TimePickerItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, rangePlaceholder, showTime, clearable, format, disabled, range, width } = data.options || {}

  return <FormItemWarpper {...props}>
    <TimePicker
      style={{ width: width + '%' }}
      showTime={showTime}
      disabled={props.disabled || disabled}
      allowClear={clearable}
      format={format}
      // value={defaultValue}
      placeholder={range ? rangePlaceholder : placeholder}
    />
  </FormItemWarpper>
})

/* 评分 */
export const RateItem = memo((props) => {
  const { data, config } = props
  const { defaultValue, disabled, max, allowHalf, width } = data.options || {}
  return <FormItemWarpper {...props}>
    <Rate
      style={{ width: width + '%' }}
      count={max}
      disabled={props.disabled || disabled}
      allowHalf={allowHalf}
      value={defaultValue}
    />
  </FormItemWarpper>
})

/* 滑动输入条 */
export const SliderItem = memo((props) => {
  const { data, config, form } = props
  const { defaultValue, disabled, min, max, step, showInput, width } = data.options || {}
  const val = form.getFieldValue(data.model)

  const [value, setValue] = useState(val)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])


  const onChange = (value) => {
    setValue(value)
    form.setFieldsValue({ [data.model]: value })
  }

  return <FormItemWarpper {...props}>
    <div className="slider-box" style={{ width: width + '%' }}>
      <div className="slider">
        <Slider
          count={max}
          disabled={props.disabled || disabled}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </div>
      {showInput ? <div className="number">
        <InputNumber
          style={{ width: '100%' }}
          // onChange={onChange}
          disabled={props.disabled || disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
        />
      </div> : null}
    </div>
  </FormItemWarpper>
})

/* 上传文件 */
export const UploadFileItem = memo((props) => {
  return <FormItemWarpper {...props}>
    <UploadFile {...props} />
  </FormItemWarpper>
})

/* 上传图片 */
export const UploadImageItem = memo((props) => {
  return <FormItemWarpper {...props}>
    <UploadImage {...props} />
  </FormItemWarpper>
})

/* 树形选择器 */
export const TreeSelectItem = memo((props) => {
  const { data, config, onChange, form, dynamicData = {} } = props
  const { defaultValue, disabled, placeholder, multiple, showSearch, treeCheckable, options, dynamic, dynamicKey, clearable, width } = data.options || {}

  return <FormItemWarpper {...props}>
    <TreeSelect
      style={{ width: `${width}%` }}
      placeholder={placeholder}
      multiple={multiple}
      showSearch={showSearch}
      treeCheckable={treeCheckable}
      disabled={disabled}
      defaultValue={defaultValue}
      allowClear={clearable}
      treeData={dynamic ? dynamicData[dynamicKey] || [] : options}
    />
  </FormItemWarpper>
})

/* 级联选择器 */
export const CasaderItem = memo((props) => {
  const { data, config, onChange, form, dynamicData = {} } = props
  const { defaultValue, disabled, placeholder, showSearch, options, dynamic, dynamicKey, clearable, width } = data.options || {}

  return <FormItemWarpper {...props}>
    <Cascader
      style={{ width: `${width}%` }}
      placeholder={placeholder}
      showSearch={showSearch}
      disabled={disabled}
      defaultValue={defaultValue}
      allowClear={clearable}
      options={dynamic ? dynamicData[dynamicKey] || [] : options}
    />
  </FormItemWarpper>
})

/* 动态表格 */
export const DynamicTableItem = memo((props) => {
  const { data, config, onChange, form, dynamicData = {} } = props
  const { defaultValue, disabled, placeholder, showSearch, options, dynamic, dynamicKey, clearable, width } = data.options || {}
  return <FormItemWarpper {...props} showLabel={false}>
    <div>动态表格</div>
  </FormItemWarpper>
})


/* 富文本 */
export const EditorItem = memo((props) => {
  const { data, config, form, dynamicData = {} } = props
  const { defaultValue, dynamic, dynamicKey, width, showLabel } = data.options || {}

  const onEditorChange = () => {

  }

  return <FormItemWarpper {...props} showLabel={showLabel}
    formProps={
      {
        labelCol: config.layout === 'horizontal' && showLabel ? config.labelCol : {},
        wrapperCol: config.layout === 'horizontal' && showLabel ? config.wrapperCol : {}
      }
    }
  >
    <div>
      <RichEditor
        style={{ width: `${width}%` }}
        disabled={props.disabled}
        data={data}
        dynamicData={dynamicData}
        defaultValue={defaultValue}
        onChange={onEditorChange}
      />
    </div>

  </FormItemWarpper>
})

/* 警告提示 */
export const AlertItem = memo((props) => {
  const { data, config, onChange, form, dynamicData = {} } = props
  const { description, type, showIcon, closable, banner } = data.options || {}
  return <FormItemWarpper {...props} showLabel={false} formProps={{ labelCol: {}, wrapperCol: {} }}>
    <Alert
      message={data.label}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
      banner={banner}
    />
  </FormItemWarpper>
})

/* 文字 */
export const TextItem = memo((props) => {
  const { data } = props
  const { textAlign, showRequiredMark } = data.options

  return <FormItemWarpper {...props} showLabel={false} formProps={{ labelCol: {}, wrapperCol: {} }}>
    <div style={{ textAlign }}>
      <label
        // className={showRequiredMark ? 'ant-form-item-required' : ''}
      >{data.label}</label>
    </div>
  </FormItemWarpper>
})

/* 按钮 */
export const ButtonItem = memo((props) => {
  const { data, dynamicData, handleReset } = props
  const { disabled, dynamicFun, handle, type } = data.options || {}

  const onClick = (ev) => {
    if (handle === 'submit') return
    if (handle === 'reset') return handleReset && handleReset(ev)
    if (dynamicData && dynamicData['dynamicFun']) return dynamicData['dynamicFun'](ev)
  }

  return <FormItemWarpper {...props} showLabel={false}>
    <Button
      disabled={props.disabled || disabled}
      onClick={onClick}
      type={type}
      htmlType={handle === 'submit' ? 'submit' : undefined}
    >{data.label}</Button>
  </FormItemWarpper>
})

/* 开关 */
export const SwitchItem = memo((props) => {
  const { data } = props
  const { checkedChildren, unCheckedChildren } = data.options
  return <FormItemWarpper {...props} formProps={{ valuePropName: 'checked' }}>
    <Switch
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    >{data.label}</Switch>
  </FormItemWarpper>
})

/* HTML */
export const HTMLItem = memo((props) => {
  const { data } = props
  return <FormItemWarpper {...props} showLabel={false} formProps={{ labelCol: {}, wrapperCol: {} }}>
    <div dangerouslySetInnerHTML={{ __html: data.options.defaultValue }}></div>
  </FormItemWarpper>
})

/* 分割线 */
export const DividerItem = memo((props) => {
  const { data, config, onChange } = props
  return <FormItemDragWrap {...props}>
    <Divider orientation={data.options.orientation}>{data.label}</Divider>
  </FormItemDragWrap>
})
