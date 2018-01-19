import React from 'react'

const Label = ({className,title}) => (
    <div className={className}>
        <span className="label">{title}</span>
    </div>
);

export default Label;