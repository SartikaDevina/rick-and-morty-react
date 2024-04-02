import React, { useEffect, useState } from 'react'
import SelectEpisode from '../components/Select/SelectEpisode';
import { Grid } from '@mui/material';
import CardCharacter from '../components/Card/CardCharacter';
import { getLocationByID } from '../api/getLocationByID';
import { useIsMobile } from '../shared/helpers';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { globalLoadingAtom } from '../shared/atoms';
import Loading from '../components/Loading';

export default function Location() {
    const [dataLocations, setDataLocations] = useState();
    const [dataCharacters, setDataCharacters] = useState([]);
    const [id, setID] = useState(1);
    const loading  = useRecoilValue(globalLoadingAtom)
    const setLoading = useSetRecoilState(globalLoadingAtom);
    const isMobile = useIsMobile();

    const fetchData = async (id) => {
        setLoading(true);
        const data = await getLocationByID(id);
        setDataLocations(data);
        setLoading(false);
    };

    useEffect(()=>{
        fetchData(id);
    }, [id]);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (dataLocations?.residents) {
                setLoading(true);
                let character = await Promise.all(
                    dataLocations?.residents.map(async (x) => {
                        const res = await fetch(x);
                        return await res.json();
                    })
                );
                setDataCharacters(character);
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [dataLocations]);

    const handleIDChange = (event) => {
        setID(event.target.value);
    };

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div>
                <h1 style={{ textAlign: 'center' }}>
                    Episode : <span style={{ color: '#1976d2' }}>{dataLocations?.name ? dataLocations?.name : 'Unknown'}</span>
                </h1>

                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <h2 style={{ textAlign: 'center' }}>Pick Episodes</h2>
                        <SelectEpisode
                            id={id}
                            handleIDChange={handleIDChange}
                            total={51}
                        />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={3}>
                            {dataCharacters?.map((character, index) => (
                                <Grid item xs={12} md={6} lg={4} style={{ display: isMobile ? 'flex' : 'initial', justifyContent: isMobile ? 'center' : 'initial' }}>
                                    <CardCharacter
                                        key={index}
                                        id={character?.id}
                                        name={character?.name}
                                        status={character?.status}
                                        location={character?.location?.name}
                                        image={character?.image}
                                        page_name={"location"}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}
