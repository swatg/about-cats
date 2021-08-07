/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from 'assests/Icon';
// Elements
import Button from 'elements/Button';
// Constants
import { subId, apiKey, baseURL } from 'config';
// Style
import styles from './style/displayImage.module.css';

interface ImageProps {
  id: string,
  url: string,
  vote_value: number,
  fav_value: number,
  sub_id: string,
  vote_id: number,
  fav_id: number,
}

function DisplayImage() {
  const [imageList, setImageList] = useState([] as ImageProps[]);
  const [loading, setLoading] = useState(false);

  function handleFav(id: string, value: number, favId: number) {
    const data = {
      'image_id': id,
      'sub_id': subId,
    }
    if (value === 0) {
      axios.post(`${baseURL}v1/favourites?api_key=${apiKey}`, data).then((response) => {
        if (response.data.message === 'SUCCESS'){
          let upList: ImageProps[] = [];
          upList = imageList.map((item) => {
            if (item.id === id){
              item.fav_id = response.data.id;
              item.fav_value = 1;
            }
            return item
          }) 
          setImageList(upList);
        }
      });
    } else {
      axios.delete(`${baseURL}v1/favourites/${favId}?api_key=${apiKey}`).then((response) => {
        if (response.data.message === 'SUCCESS'){
          let upList: ImageProps[] = [];
          upList = imageList.map((item) => {
            if (item.id === id){
              item.fav_value = 0;
            }
            return item
          }) 
          setImageList(upList);
        }
      });
    }
  }

  function handleVote(id: string, value: number ) {
    const data = {
      'image_id': id,
      'sub_id': subId,
      'value': value,
    }
    axios.post(`${baseURL}v1/votes?api_key=${apiKey}`, data).then((response) => {
      let tempList: ImageProps[] = [];
      tempList = imageList.map((ele: ImageProps) => {
        if (id === ele.id) {
          ele.vote_id = response.data.id
          ele.vote_value = value
        }
        return ele
      })
      setImageList(tempList)
    });
  }

  function renderImageList(item: ImageProps) {
    return (
      <div key={item.id} className={styles.imgContainer}>
        <img alt="cat" className={styles.image} src={item.url} height="150px" width="220px" />
        <div className={styles.overlay}>
          <Button 
            btnSize="large"
            handler={() => handleFav(item.id, item.fav_value, item.fav_id)}
          >
            <Icon
              icon={item.fav_value === 1 ? 'Heart' : 'HeartOutline'}
              fill="red"
            />
          </Button>
        </div>

        <div className={styles.voteContainer}>
          <Button
            btnSize="small"
            handler={() => handleVote(item.id, item.vote_value + 1)}
          >
            <Icon
              icon="ThumpsUp"
              fill="black"
            />
          </Button>
          <p>{item.vote_value} Votes</p>
          <Button
            btnSize="small"
            handler={() => handleVote(item.id, item.vote_value - 1)}
          >
            <Icon
              icon="ThumpsDown"
              fill="black"
            />
          </Button>
        </div>
      </div>
    )
  }

  async function getVotes(){
    const res = await axios.get(`${baseURL}v1/votes?api_key=${apiKey}&sub_id=${subId}`).then((response) => response.data)
    return res;
  }

  async function getFavourites(){
    const res = await axios.get(`${baseURL}v1/favourites?api_key=${apiKey}&sub_id=${subId}`).then((response) => response.data)
    return res;
  }

  async function getImages(){
    const res = await axios.get(`${baseURL}v1/images?api_key=${apiKey}&limit=28&sub_id=${subId}`).then((response) => response.data)
    return res;
  }

  async function populateImageList(){
    const voteList = await getVotes();
    const imageResponseList = await getImages();
    const favouriteList = await getFavourites();
    let data = [];
    if (imageResponseList) {
      data = imageResponseList.map((item: ImageProps) => {
        const voteItem = voteList.find((vote: { image_id: string }) => vote.image_id === item.id)
        if (voteItem) {
          item.vote_value = voteItem.value
          item.vote_id = voteItem.id
        } else {
          item.vote_value = 0;
        }
        const favouriteItem = favouriteList.find((favourite: { image_id: string }) => favourite.image_id === item.id)
        if (favouriteItem) {
          item.fav_value = 1
          item.fav_id = favouriteItem.id
        } else {
          item.fav_value = 0;
        }
        return item
      })
      setImageList(data);
    }
    setLoading(false);
  } 


  useEffect(() => {
    setLoading(true);
    populateImageList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="wrapper">
      <div className="wrapper__content">
        <h1 className={styles.header}>View Images</h1>
        <div className={styles.container}>
          <div className={styles.grid}>
            {loading ?
              <div className={`${styles.loading} ${styles.grid}`}>
                {[...Array(8)].map((e, i) => <span key={i.toString()} />)}
              </div> :
              imageList.length > 0 && imageList.map(renderImageList)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisplayImage;
