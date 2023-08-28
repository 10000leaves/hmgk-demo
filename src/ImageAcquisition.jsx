import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import Detect from './Detect';

const videoConstraints = {
  width: '100%',
  height: 360,
  facingMode: "user",
};

export default function ImageAcquisition() {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [isCaptureEnabled, setCaptureEnabled] = useState(false);
  const [isLoading, setLoading] = useState(false); // ローディング状態

  const stopLoading = () => {
    setLoading(false);
  };

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
      setLoading(true); // ローディングを開始
      setUrl(imageSrc); // 撮影された画像のURLを設定
    }
  }, []);

  return (
    <Box textAlign="center" sx={{ my: 4 }}>
      {/* 撮影が有効でない場合、撮影開始ボタンを表示 */}
      {!isCaptureEnabled ? (
        <Button variant="contained" onClick={startCapture}>撮影開始</Button>
      ) : !url && (
        <>
          {/* 撮影中止ボタンとWebカメラ表示を表示 */}
          <Button variant="contained" onClick={stopCapture}>撮影中止</Button>
          <Box sx={{ my: 4 }}>
            <Webcam
              audio={false}
              width={'100%'}
              height={'100%'}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </Box>
          <Button variant="contained" onClick={handleCapture}>撮影</Button>
        </>
      )}

      {url && (
        <>
          {/* 撮影された画像を表示し、画像解析コンポーネントを呼び出す */}
          <img src={url} alt="Screenshot" />
          <Detect img={url} stopLoading={stopLoading} />
          <LoadingButton
            variant="contained"
            onClick={() => setUrl(null)}
            loading={isLoading} // ボタンのローディング状態を設定
            disabled={isLoading} // ローディング中はボタンを無効化
          >
            再撮影
          </LoadingButton>
        </>
      )}
    </Box>
  );
}
