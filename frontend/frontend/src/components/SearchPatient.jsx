import * as React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchPatient({ patients }) {
  const history = useHistory();
  const dniList = patients.map((patient) => patient.idPatient);
  const idDoctor = localStorage.getItem('token');
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={dniList}
      sx={{ width: 300 }}
      onChange={(_, value) => history.push(`/view-patient/${idDoctor}/${value}`)}
      renderInput={(params) => <TextField {...params} label="Busca paciente" />}
    />
  );
}