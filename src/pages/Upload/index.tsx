import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Constants
import { subId, apiKey, baseURL } from 'config';
// Elements
import Button from 'elements/Button';
// Style
import styles from './style/upload.module.css';

function Upload() {
  const history = useHistory();
  const [image, setImage] = useState({ preview: '', raw: '' as unknown as File });
  const [notificationText, setNotificationText] = useState('');
  const [loading, setLoading] = useState(false);

  function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  function handleUpload() {
    setLoading(true);
    const data = new FormData();
    data.append('file', image.raw);
    data.append('sub_id', subId);
    axios.post(`${baseURL}v1/images/upload?api_key=${apiKey}`, data).then((response) => {
      setLoading(false);
      history.push('/')
    }).catch(error => {
      setLoading(false);
      setNotificationText(`Image Upload Unsuccessful. ${error.message}`);
    });
  }
  
  return (
    <>
      <section className="wrapper">
        <div className="wrapper__content">
          <h1 className={styles.header}>Upload Image</h1>
          <div className={styles.container}>
            <div className={styles.grid}> 
              <input type="file" onChange={(e) => handleUploadFile(e)} />
              <img alt="" src={image.preview} />
              <p className={styles.error}>{notificationText}</p>
              {loading ?
                <Button
                  btnStyle="secondary"
                  btnSize="large"
                >
                  Loading
                </Button> :
                <Button
                  handler={() => handleUpload()}
                  btnStyle="secondary"
                  btnSize="large"
                >
                  Upload
                </Button>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Upload;
