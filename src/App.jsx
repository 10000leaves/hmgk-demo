import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Info from './Info';
import Copyright from './Copyright';

import ButtonAppBar from './ButtonAppBar';
import UseWidth from './UseWidth';
import WebCamera from './WebCamera';

export default function App() {

  return (
    <>
      <ButtonAppBar/>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <UseWidth/>
          <Info text={'仮想通貨を獲得するには○○アカウントの登録が必要です'} />
          <WebCamera/>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
