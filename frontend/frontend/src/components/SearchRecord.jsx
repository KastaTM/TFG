import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

export default function SearchRecord({ records }) {
    const history = useHistory();
    const params = useParams();

    const idDoctor = localStorage.getItem('token');
    const [idP] = useState(params.idPatient);
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={records}
            sx={{ width: 300 }}
            key={option => option.idRecord}
            getOptionLabel={(option) => option.dateRecord}
            onChange={(_, indice) => {
                const recordIdentifier = indice.idRecord;
                history.push(`/view-record/${idDoctor}/${idP}/${recordIdentifier}`)
            }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    key={option.idRecord}
                    {...props}
                >
                    {option.dateRecord}
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Busca registro" />}
        />
    );
}