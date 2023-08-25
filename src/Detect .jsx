import * as mobilenet from "@tensorflow-models/mobilenet";
import Typography from '@mui/material/Typography';

export default async function Detect (props) {
  // 分類する画像要素を取得
  const {img} = props;
  // モデルの読み込み
  const model = await mobilenet.load();
  // 予測
  const predictions = await model.classify(img, 10);

  console.log('Predictions: ');
  console.log(predictions);

  alert(JSON.stringify(predictions));

  if(predictions.isArray(predictions)){
    return <Typography>画像を認識できました</Typography>;
  } else {
    return <Typography>画像を認識できませんでした</Typography>;
  }
};