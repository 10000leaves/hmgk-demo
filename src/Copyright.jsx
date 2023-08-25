import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.biprogy-ken.com/">
      BIPROGY研究会 関東2G
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}