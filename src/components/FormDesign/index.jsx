import React, { forwardRef, useImperativeHandle, useEffect, useState, useCallback, useRef } from 'react';
import { Collapse } from 'antd';
import {
  basicsList,
  // highList,
  layoutList,
  customComponents
} from '../../config/formItemsConfig';

import CollapseItem from './module/CollapseItem'
import FormComponentPanel from './module/FormComponentPanel'
import OperatingArea from './module/OperatingArea'
import FormProperties from './module/FormProperties'
import hyperid from 'hyperid'
import ItemProperties from './module/ItemProperties';
import { cloneDeep, isNil, set } from 'lodash';
import { PreviewJsonModal } from '../Actions/PreviewJson'
import { PreviewFormModal } from '../Actions/PreviewForm'

const { Panel } = Collapse;

const instance = hyperid()

const FormDesign = forwardRef((props, ref) => {
  const { fields, toolbars } = props

  useImperativeHandle(ref, () => ({

  }))

  const [basics, setBasics] = useState([])
  const [layout, setLayout] = useState([])
  const [formConfig, setFormConfig] = useState({
    list: [],
    config: {
      layout: "horizontal",
      labelCol: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
      wrapperCol: { xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 },
      hideRequiredMark: false,
      customStyle: ""
    }
  })

  const [previewOptions, setPreviewOptions] = useState({
    width: 850
  })

  const [showPropertie, setShowPropertie] = useState(false)
  const [updateTime, setUpdateTime] = useState(0)
  const [selectItem, setSelectItem] = useState({ key: '' })
  const [startType, setStartType] = useState("")
  const [hideModel, setHideModel] = useState(false)

  const previewFormRef = useRef()
  const previewJsonRef = useRef()

  useEffect(() => {
    // 计算需要显示的基础字段
    setBasics(basicsList.filter(item => fields.includes(item.type)))
  }, [basicsList])

  useEffect(() => {
    // 计算需要显示的布局字段
    setLayout(layoutList.filter(item => fields.includes(item.type)))
  }, [layoutList])

  const setList = (res) => {
    formConfig.list = res
    setFormConfig({ ...formConfig })
  }

  const setListOfIndex = (index, d) => {
    formConfig.list[index] = d
    setList && setList(formConfig.list)
  }

  const handleSetSelectItem = (record) => {
    // console.log('handleSetSelectItem', record)
    // 操作间隔不能低于100毫秒
    let newTime = new Date().getTime();
    if (newTime - updateTime < 100) {
      return false;
    }

    setUpdateTime(newTime)
    // 设置selectItem的值
    setSelectItem(record)
    // console.log(record)
    // 判断是否选中控件，如果选中则弹出属性面板，否则关闭属性面板
    if (record.key) {
      setStartType(record.type)
      setShowPropertie(true)
    } else {
      setShowPropertie(false)
    }
  }

  const onChooseBasics = (evt) => {
    basics[evt.oldIndex].key = basics[evt.oldIndex].model = basics[evt.oldIndex].type + '_' + instance()
    setBasics(basics)
  }

  const onChooseLayout = (evt) => {
    layout[evt.oldIndex].key = layout[evt.oldIndex].model = layout[evt.oldIndex].type + '_' + instance()
    setLayout(layout)
  }

  const onListPush = (data) => {
    let record = cloneDeep(data)
    record.key = record.model = record.type + '_' + instance()
    delete record.icon
    delete record.component
    formConfig.list.push(record)
    setFormConfig({ ...formConfig })
    handleSetSelectItem(record)
  }

  const onAdd = (evt) => {
    setTimeout(() => {
      let record = cloneDeep(formConfig.list[evt.newIndex])
      if (record) {
        delete record.icon
        delete record.component
        set(formConfig, `list[${evt.newIndex}]`, record)
        handleSetSelectItem(record)
      }
    }, 0)
  }

  const onCopy = (index, data) => {
    let record = cloneDeep(data)
    record.key = record.model = record.type + '_' + instance()
    formConfig.list.splice(index + 1, 0, record)
    setFormConfig({ ...formConfig })
    handleSetSelectItem(record)
  }

  // 顶部操作栏
  const onGetJson = () => {
    previewJsonRef.current.open(formConfig)
  }

  const onPreview = () => {
    previewFormRef.current.open(formConfig)
  }

  const onItemPropertiesHide = useCallback(() => setShowPropertie(false), [])

  return (
    <div className="form-designer-container-9136076486841527">
      <div className="content">
        <aside className="left">
          <Collapse
            defaultActiveKey={['1', '4']}
          >
            {!basics.length ? null : <Panel header="基础控件" key="1">
              <CollapseItem
                list={basics}
                onChoose={onChooseBasics}
                onListPush={onListPush}
              // onEnd={onModelItemDragEnd}
              />
            </Panel>}

            {!layout.length ? null : <Panel header="布局控件" key="4">
              <CollapseItem
                list={layout}
                onChoose={onChooseLayout}
                onListPush={onListPush}
              // onEnd={onModelItemDragEnd}
              />
            </Panel>}
          </Collapse>

        </aside>
        <section className="main">
          <OperatingArea
            onGetJson={onGetJson}
            onPreview={onPreview}
          />
          <FormComponentPanel
            data={formConfig}
            setList={setList}
            selectItem={selectItem}
            hideModel={hideModel}
            handleSetSelectItem={handleSetSelectItem}
            onAdd={onAdd}
            onCopy={onCopy}
            setListOfIndex={setListOfIndex}
          />
          <PreviewFormModal ref={previewFormRef} />
          <PreviewJsonModal ref={previewJsonRef} />
        </section>

        <aside className="right">
          <FormProperties
            config={formConfig.config}
            setFormConfig={setFormConfig}
            previewOptions={previewOptions}
            setPreviewOptions={setPreviewOptions}
          />
          <ItemProperties
            cls={`form-item-properties ${showPropertie ? 'show-properties' : ''}`}
            selectItem={selectItem}
            setList={setList}
            list={formConfig.list}
            hideModel={hideModel}
            onHide={onItemPropertiesHide}
            handleSetSelectItem={handleSetSelectItem}
          />
        </aside>
      </div>
    </div>
  );
})

FormDesign.defaultProps = {
  fields: [
    'input',
    'textarea',
    'number',
    'select',
    'checkbox',
    'radio',
    'date',
    'time',
    'rate',
    'slider',
    'uploadFile',
    'uploadImg',
    'cascader',
    'treeSelect',
    'batch',
    'editor',
    'switch',
    'button',
    'alert',
    'text',
    'html',
    'divider',
    'card',
    'tabs',
    'row',
    'table'
  ],
  toolbars: [
    'save',
    'preview',
    'importJson',
    'exportJson',
    'exportCode',
    'reset',
    'close'
  ]
}

export default FormDesign;
