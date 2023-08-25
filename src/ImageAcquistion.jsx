import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";

import Detect  from './Detect ';

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user"
};

export default function ImageAcquistion() {
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <Box textAlign='center'>
      {isCaptureEnable || (
        <Button onClick={() => setCaptureEnable(true)}>撮影開始</Button>
      )}
      {isCaptureEnable && !url && (
        <>
          <Button onClick={() => setCaptureEnable(false)}>撮影中止</Button>
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            />
          <Button onClick={capture}>撮影</Button>
        </>
      )}
      {url && (
        <>
          <img src={url} alt="Screenshot" />
          <Detect img={url} />
          <Button
            onClick={() => {
              setUrl(null);
            }}
          >
            再撮影
          </Button>
        </>
      )}
    </Box>
  );
};
