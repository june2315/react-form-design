import React, { memo, useEffect } from 'react';
import { TempItem, InputItem, TextItem, ButtonItem, SwitchItem, HTMLItem } from '../../LayoutFormItem'
import DragMoveItem from './DragMoveItem'

function LayoutItem(props) {
    const { index, selectItem, handleSetSelectItem, data = {} } = props

    let RenderItem = () => <></>

    if (data.state === 'temp') {
        RenderItem = TempItem
    } else {
        switch (data.type) {
            case 'input':
                RenderItem = InputItem
                break           
            case 'text':
                RenderItem = TextItem
                break
            case 'button':
                RenderItem = ButtonItem
                break
            case 'switch':
                RenderItem = SwitchItem
                break
            case 'html':
                RenderItem = HTMLItem
                break
        }
    }

    return (
        <div className="drag-move" >
            <DragMoveItem
                record={data}
                selectItem={selectItem}
                handleSetSelectItem={handleSetSelectItem}
            >
                <RenderItem {...props} />
            </DragMoveItem>
        </div>
    );
}

export default LayoutItem;
