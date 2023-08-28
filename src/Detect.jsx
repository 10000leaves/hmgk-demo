import React, { useState, useEffect } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function Detect(props) {
  const [imageRecognized, setImageRecognized] = useState(false);
  const [predictionsList, setPredictionsList] = useState([]);
  const [isLoading, setLoading] = useState(true); // ローディング状態
  const { img } = props;

  useEffect(() => {
    async function checkImageRecognition() {
      // モデルのロード
      const model = await mobilenet.load();

      // 画像要素を生成して img を設定
      const imgElement = new Image();
      imgElement.src = img;

      console.log(img)

      imgElement.onload = async () => {
        // 画像の前処理
        const imgTensor = tf.browser.fromPixels(imgElement);

        // 予測を行う
        const predictions = await model.classify(imgTensor);

        console.log(predictions)

        setImageRecognized(predictions.length > 0);
        setPredictionsList(predictions);
        setLoading(false); // ローディング終了

        imgTensor.dispose(); // メモリリークを防ぐためにテンソルを解放
      };
    }

    checkImageRecognition();
  }, [img]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography>
        {imageRecognized ? '画像を認識できました' : '画像を認識できませんでした'}
      </Typography>
      {imageRecognized && (
        <div>
          <Typography>判定結果:</Typography>
          <List>
            {predictionsList.map((prediction, index) => (
              <ListItem key={index}>{`${prediction.className} (評価: ${prediction.probability.toFixed(4)})`}</ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
