import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

export default function Info(props) {
  const {text} = props
  return (
    <Grid container alignItems="center" spacing={1} wrap="nowrap">
      <Grid item>
        <InfoIcon />
      </Grid>
      <Grid item>
        <Typography color="text.secondary">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}