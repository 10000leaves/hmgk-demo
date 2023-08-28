import React, { useState, useEffect } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

export default function Detect(props) {
  const [imageRecognized, setImageRecognized] = useState(false);
  const [predictionsList, setPredictionsList] = useState([]);
  const { img, isLoading, stopLoading } = props;

  useEffect(() => {
    async function checkImageRecognition() {
      // MobileNetモデルをロード
      const model = await mobilenet.load();

      // 画像要素を生成して img を設定
      const imgElement = new Image();
      imgElement.src = img;

      imgElement.onload = async () => {
        // 画像の前処理
        const imgTensor = tf.browser.fromPixels(imgElement);

        // モデルを使って画像の予測を行う
        const predictions = await model.classify(imgTensor);

        // 予測結果をステートに設定
        setImageRecognized(predictions.length > 0);
        setPredictionsList(predictions);

        // メモリリークを防ぐためにテンソルを解放
        imgTensor.dispose();

        // 画像認識完了後にローディングを終了
        stopLoading();
      };
    }

    // 画像認識を実行
    checkImageRecognition();

  }, [img]);

  return (
    <Box sx={{ my: 4 }}>
      {/* ローディングが false のときに表示 */}
      {!isLoading && !imageRecognized && (
        <Typography>
          画像を認識できませんでした
        </Typography>
      )}
      {/* ローディングが false かつ 画像認識が成功した場合 */}
      {!isLoading && imageRecognized && (
        <>
          <Typography>判定結果:</Typography>
          <List>
            {predictionsList.map((prediction, index) => (
              <ListItem key={index}>{`${prediction.className} (評価: ${prediction.probability.toFixed(4)})`}</ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
