import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterByID } from '../../api/getCharacterByID';
import "../../App.css"
import { Grid } from '@mui/material';
import { getStatusColor } from '../../shared/helpers';

export default function CardCharacterDetail() {
    const { id } = useParams();
    const [dataCharacters, setDataCharacters] = useState();

    const fetchData = async (id) => {
        const data = await getCharacterByID(id);
        setDataCharacters(data);
    };

    useEffect(()=>{
        fetchData(id);
    }, [id]);


    return (
        <>
            <Grid container alignItems={"center"} style={{ flexDirection:'column' }}>
                <h1>{dataCharacters?.name}</h1>
                <img src={dataCharacters?.image} alt={dataCharacters?.name}/>
                <div className='status-indicator-detail' style={{ backgroundColor: getStatusColor(dataCharacters?.status) }}>
                    {dataCharacters?.status}
                </div>
                <ul style={{ textAlign: 'left', width: '310px' }}>
                    <li><strong>Gender:</strong> {dataCharacters?.gender}</li>
                    <li><strong>Species:</strong> {dataCharacters?.species}</li>
                    <li><strong>Location:</strong> {dataCharacters?.location?.name}</li>
                    <li><strong>Origin:</strong> {dataCharacters?.origin?.name}</li>
                    <li><strong>Status:</strong> {dataCharacters?.status}</li>
                </ul>
            </Grid>
        </>
    );
}
