import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getEpisodeByID } from '../api/getEpisodeByID';
import { Grid } from '@mui/material';
import CardCharacter from '../components/Card/CardCharacter';
import SelectEpisode from '../components/Select/SelectEpisode';
import { useIsMobile } from '../shared/helpers';
import { globalLoadingAtom } from '../shared/atoms';
import Loading from '../components/Loading';

export default function Episode() {
    const [dataEpisodes, setDataEpisodes] = useState();
    const [dataCharacters, setDataCharacters] = useState([]);
    const [id, setID] = useState(1);
    const loading  = useRecoilValue(globalLoadingAtom)
    const setLoading = useSetRecoilState(globalLoadingAtom);
    const isMobile = useIsMobile();

    const fetchData = async (id) => {
        setLoading(true);
        const data = await getEpisodeByID(id);
        setDataEpisodes(data);
        setLoading(false);
    };

    useEffect(()=>{
        fetchData(id);
    }, [id]);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (dataEpisodes?.characters) {
                setLoading(true);
                let character = await Promise.all(
                    dataEpisodes?.characters.map(async (x) => {
                        const res = await fetch(x);
                        return await res.json();
                    })
                );
                setDataCharacters(character);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [dataEpisodes]);

    const handleIDChange = (event) => {
        setID(event.target.value);
    };

    return (
        <React.Fragment>
            {loading && <Loading />}
            <div>
                <h1 style={{ textAlign: 'center' }}>
                    Episode Name : <span style={{ color: '#1976d2' }}>{dataEpisodes?.name ? dataEpisodes?.name : 'Unknown'}</span>
                </h1>
                <h2 style={{ textAlign: 'center' }}>Air Date: {dataEpisodes?.air_date ? dataEpisodes?.air_date : 'Unknown'}</h2>

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
                                        page_name={"episode"}
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
