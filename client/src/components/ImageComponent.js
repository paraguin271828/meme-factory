import React, { useState, useEffect } from 'react';
import '../styles/ImageComponent.css';

export default () => {
  const [images, setImages] = useState([null]);
  const [imageUrl, setImageUrl] = useState({});
  const [memeText, setMemeText] = useState({mt1: 'Your text', mt2: 'Another text'});
  
  const fetchImage = () => {
    fetch('/fetchimage')
      .then(result => result.json())
      .then(imageList => {
        setImages(imageList);
        setImageUrl({index: 0, url: imageList[0].url});
      })
      .catch(err => console.error(err));
  }

  useEffect(() => fetchImage(),[]);

  const handleText = (ev) => {
    console.log(ev.target.id);
    let tmpText = Object.assign({}, memeText);
    tmpText[ev.target.id] = ev.target.value;

    setMemeText(tmpText);
  }

  const toggleCaps = (e) => {
    const textElems = document.getElementsByClassName('meme-text');
    console.log(textElems.length);

    e.target.classList.contains('yell') ? e.target.classList.remove('yell') : e.target.classList.add('yell');

    for(let i = 0; i < textElems.length; i++) {
        textElems[i].classList.contains('yell') ? textElems[i].classList.remove('yell') : textElems[i].classList.add('yell');
    }
  }

  const displayImage = (i) => {
    let tmpImg = Object.assign({}, imageUrl);
    console.log(tmpImg);
    tmpImg['index'] = i;
    tmpImg['url'] = images[i].url;
    setImageUrl(tmpImg);
  };


  return (
    <div id="meme-wrapper" className="row">
      <div id="meme-image">
        <input key="text1" id="mt1" type="text" className="meme-text" value={memeText.mt1} onChange={e => handleText(e)} />
        <input key="text2" id="mt2" type="text" className="meme-text" value={memeText.mt2} onChange={e => handleText(e)} />
        <img src={imageUrl['url']} alt="Random Meme" />
      </div>
      <div id="toolbar">
        <button className="btn btn-dark" onClick={e => toggleCaps(e)}>All Caps</button>
        <button 
          className="btn btn-dark" 
          onClick={e => displayImage(imageUrl.index -1)} 
          disabled={imageUrl.index === 0 ? 'disabled' : ''}>
            Previous Image
          </button>
        <button className="btn btn-dark" onClick={e => displayImage(Math.floor(Math.random()*100))}>Random Image</button>
        <button 
          className="btn btn-dark" 
          onClick={e => displayImage(imageUrl.index +1)} 
          disabled={imageUrl.index === 99 ? 'disabled' : ''}>
            Next Image
          </button>
      </div>
    </div>
  )
}
