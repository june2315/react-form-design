import React from 'react';
import IconFont from '../../Icon'
import { ReactSortable } from "react-sortablejs";
import { get } from 'lodash-es';

function CollapseItem(props) {
    const { list, onChoose, onEnd, onListPush } = props

    const setData = (dataTransfer, dragEl) => {
        // console.log(dataTransfer, dragEl)
    }

    return (
        <ReactSortable
            tag="ul"
            list={list}
            setList={() => { }}
            group={{ name: 'form-draggable', pull: 'clone', put: false }}
            sort={false}
            animation={180}
            ghostClass={'moving'}
            onChoose={onChoose}
            onEnd={onEnd}
            setData={setData}
        >
            {
                list.map((d, i) => <Item key={i} data={d} index={i} onListPush={onListPush} />)
            }
        </ReactSortable>
    );
}

const Item = (props) => {
    const { data, index, onListPush } = props

    return (
        <li
            role="Box"
            data-testid={`box-${index}`}
            // dragstart="$emit('generateKey', list, index)"
            onClick={() => onListPush && onListPush(data)}
        >
            {!data.icon ? null : <IconFont type={data.icon} className="icon" />}
            {get(data, 'formOptions.label') || get(data, 'label')}
        </li>

    );
}

export default CollapseItem;
