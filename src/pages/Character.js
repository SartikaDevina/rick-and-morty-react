import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Grid, Pagination } from '@mui/material';
import { getAllCharacter } from '../api/getAllCharacter';
import Loading from '../components/Loading';
import CardCharacter from '../components/Card/CardCharacter';
import { InputSearchCharacter } from '../components/Input/InputSearchCharacter';
import { AccordionFilter } from '../components/Accordion/AccordionFilter';
import { clearFilters, useIsMobile } from '../shared/helpers';
import { globalLoadingAtom } from '../shared/atoms';

export default function Character (){
    const [dataCharacters, setDataCharacters] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        species: '',
        type: '',
        gender: ''
    });
    const loading  = useRecoilValue(globalLoadingAtom)
    const setLoading = useSetRecoilState(globalLoadingAtom);
    const isMobile = useIsMobile();

    const fetchData = async (page, filters) => {
        setLoading(true);
        const data = await getAllCharacter(page, filters);
        setDataCharacters(data);
        setLoading(false); 
    };

    useEffect(()=>{
        fetchData(currentPage, filters);
    }, [currentPage]);

    const handlePageChange = (e, page) => {
        setCurrentPage(page);
    };

    const handleSearch = async () => {
        setCurrentPage(1);
        fetchData(1, filters);
    };

    const handleFilterChange = (filter) => {
        const { id, value } = filter;

        setFilters(prevFilters => ({
            ...prevFilters,
            [id]: value
        }));
    };
    
    return (
        <React.Fragment>
            {loading && <Loading />}
            <div>
                <h1 style={{ textAlign: 'center' }}>
                    Characters
                </h1>

                <InputSearchCharacter 
                    value={filters.name}
                    onChange={(e) => handleFilterChange({ id: 'name', value: e.target.value })}
                    onSearch={handleSearch}
                />

                <Grid container spacing={2} style={{ marginTop: '30px' }}>
                    <Grid item xs={12} lg={4}>
                        <AccordionFilter onFilterChange={handleFilterChange} clearFilters={clearFilters} filters={filters}/>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={3}>
                            {
                                dataCharacters?.results?.map((characters) => (
                                    <Grid item xs={12} md={6} lg={4} key={characters.id} style={{ display: isMobile ? 'flex' : 'initial', justifyContent: isMobile ? 'center' : 'initial' }}>
                                        <CardCharacter 
                                            id={characters?.id}
                                            name={characters?.name}
                                            status={characters?.status}
                                            location={characters?.location?.name}
                                            image={characters?.image}
                                            page_name={"character"}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Pagination
                            count={dataCharacters?.info?.pages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            style={{ marginTop: '20px' }}
                            shape="rounded"
                        />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
};