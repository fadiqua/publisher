import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => (
    <div className="text-center">
        <h2>NotFound Page <Link to="/">Home</Link></h2>
    </div>
);

export default NotFound;
