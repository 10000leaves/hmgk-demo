import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Info from './Info';
import Copyright from './Copyright';

import ButtonAppBar from './ButtonAppBar';
import UseWidth from './UseWidth';
import ImageAcquisition from './ImageAcquisition';

export default function App() {

  return (
    <>
      <ButtonAppBar/>
      <Container fixed>
        <Box sx={{ my: 4 }}>
          <UseWidth/>
          <Info text={'写真を撮影すると、何が写っているか判定します'} />
          <ImageAcquisition/>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
