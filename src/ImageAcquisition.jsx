import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Detect from './Detect';

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function ImageAcquisition() {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [isCaptureEnabled, setCaptureEnabled] = useState(false);

  const startCapture = () => {
    setCaptureEnabled(true);
  };

  const stopCapture = () => {
    setCaptureEnabled(false);
    setUrl(null);
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, []);

  return (
    <Box textAlign="center">
      {!isCaptureEnabled ? (
        <Button onClick={startCapture}>撮影開始</Button>
      ) : !url && (
        <>
          <Button onClick={stopCapture}>撮影中止</Button>
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <Button onClick={handleCapture}>撮影</Button>
        </>
      )}

      {url && (
        <>
          <img src={url} alt="Screenshot" />
          <Detect img={url} />
          <Button onClick={() => setUrl(null)}>再撮影</Button>
        </>
      )}
    </Box>
  );
}
