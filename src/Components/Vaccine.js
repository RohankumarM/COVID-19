import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Paper, TableRow, TableCell, TableContainer, Table, TableHead, TableBody } from '@material-ui/core';
import '../styles/Vaccine.css';

function Vaccine() {

  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineInfo, setVaccineInfo] = useState([]);

  // const vaccineDetails = [{details: ["Large-scale trials", "Half way to Phase 3", "Expanded trial growth",
  //   "Expanded safety trials", "Half way to Phase 2", "Small-scale safety trials",
  //   "Not yet in human trials", "Ongoing research"]}]; 

  useEffect(() => {
    const fetchVaccineData = async () => {
      await fetch("https://disease.sh/v3/covid-19/vaccine")
        .then((response) => {
          return response.json();
        }).then((data) => {
          const phasesDetails = data.phases.map((phase) => ({
            phase: phase.phase,
            vaccinePerPhase: phase.candidates
          }));
          setVaccineData(phasesDetails);
          setVaccineInfo(data.data);
        })
    };
    fetchVaccineData();
  }, []);



  return (
    <div className="vaccine">
      <Card className="vaccine__card">
        <CardContent className="card__content">
          <Typography className="card__phase__name">Approved</Typography>
          <Typography className="card_phase_no"> 0</Typography>
        </CardContent>
        {
          vaccineData.map((vaccine, index) => {
            return (
              <Grid key={index}>
                <CardContent className="card__content">
                  <Typography className="card__phase__name">{vaccine.phase}</Typography>
                  <Typography className="card_phase_no">{vaccine.vaccinePerPhase}</Typography>
                </CardContent>
              </Grid>
            )
          })
        }
      </Card>

      {/* Table Container */}

      <TableContainer component={Paper}>
        <Table className="vaccineInfo__table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phase</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Developed by/Researcher</TableCell>
              <TableCell align="right">Mechanism</TableCell>
              <TableCell align="right">Sponsors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccineInfo.map((vaccine, index) => (
              <TableRow key={index}>
                <TableCell scope="row">
                  {vaccine.trialPhase}
                </TableCell>
                <TableCell align="right">{vaccine.candidate}</TableCell>
                <TableCell align="right">{vaccine.institutions}</TableCell>
                <TableCell align="right">{vaccine.mechanism}</TableCell>
                <TableCell align="right">{vaccine.sponsors}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Vaccine
