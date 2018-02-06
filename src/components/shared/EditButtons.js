import React from 'react';
import { Button } from 'antd';

const EditButtons = ({ loading, onCancel, onSave }) => (
    <div className="edit-ctrl-btns">
        <Button disabled={loading} onClick={e => onCancel(e)}>cancel</Button>
        <Button type="primary"
                loading={loading}
                onClick={e => onSave(e)} >Save</Button>
    </div>
);

export default EditButtons;
