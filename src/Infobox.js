import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './styles/Infobox.css';

function Infobox({ title, noOfCases, totalCases, active, isRed, ...props }) {
  return (

    <Card className={`infobox ${active && "infobox--selected"} ${isRed && "infobox--red"}`} onClick={props.onClick}>
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">{title}</Typography>
        <h2 className={`infobox__cases ${!isRed && "infobox__cases--green"}`}> {noOfCases}</h2>
        <Typography className="infobox__total-cases">{totalCases}</Typography>
      </CardContent>
    </Card>
  )
}

export default Infobox;
