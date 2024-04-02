import React from 'react';
import '../../App.css';
import { getStatusColor } from '../../shared/helpers';

const CardCharacter = ({ id, name, status, location, image, page_name }) => {
    const handleCardClick = (id) => {
        window.location.href = `/${page_name}/${id}`;
    };

    return (
        <div className="card" onClick={()=> handleCardClick(id)}>
            <div className="status-indicator" style={{ backgroundColor: getStatusColor(status) }}>
                {status}
            </div>
            <div className="image-container">
                <img src={image} alt={name} className="image" />
            </div>
            <div className="content">
                <b>{name}</b>
                <br/>
                <p>Last Location</p>
                <p>{location}</p>
            </div>
        </div>
    );
};

export default CardCharacter;
