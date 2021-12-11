import React from 'react';

export default function Group(props) {

    const { name, id, onClick, className } = props;


       return(
        <div key={id} onClick={onClick} className={className}>{name}</div>
       );
}