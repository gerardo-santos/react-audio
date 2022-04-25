import { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));

  console.log(setMp3Recorder);

  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setIsBlocked(true);
      },
    );
  }, [])

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true)
        }).catch((e) => console.error(e));
    }
  }

  const stop = () => {
    mp3Recorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => {
      const blobURL = URL.createObjectURL(blob)
      setBlobUrl(blobURL)
      setIsRecording(false)
    }).catch((e) => console.log(e));
  }
  return (
    <div>
      <h1>hola</h1>
      <button onClick={start} disabled={isRecording}>
        Record
      </button>
      <button onClick={stop} disabled={!isRecording}>
        Stop
      </button>
      <audio src={blobUrl} controls="controls" />
    </div>
  );
}

export default App;

