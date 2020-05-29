import React, { useState, useEffect, useCallback, createRef } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Draggable from 'react-draggable';
import '../styles/ImageComponent.css';
import '../styles/fonts.css';

export default () => {
  const [images, setImages] = useState([null]);
  const [imageUrl, setImageUrl] = useState({});
  const [memeText, setMemeText] = useState({mt1: 'Your text', mt2: 'Another text'});
  const [isGenerated, setIsGenerated] = useState(false);

  const fetchImage = () => {
    console.log('calling fetch method.')
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

  const uploadImage = () => {
    const selectedFile = document.getElementById('file-upload').files[0];

    console.log('file: ');
    console.log(selectedFile);
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      console.log('Wrong file type. Only images are supported');
      return;
    }

    const fileInfo = document.getElementById('file-information');
    fileInfo.innerHTML = Math.round(file.size / 1024) + ' kB';

    // display image and use the index from the previous one for back and next function
    setImageUrl({index: imageUrl.index, url: window.URL.createObjectURL(file)});
    console.log('Custom image set');

/*    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) {aImg.src = e.target.result; }; })
    document.getElementById('image').src = file.path;*/

  }, [imageUrl]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const downloadImage = (imageContainer) => {
    domtoimage.toBlob(document.getElementById(imageContainer))
      .then((blob) => window.saveAs(blob, 'my-node.png'))
      .catch(err => console.log('Error saving image: ' + err));
  }


  return (
    <div className="container">
    <div id="meme-wrapper" className="row">
      <div id="meme-image">
        <Draggable handle=".handle1" bounds="parent">
          <div className="text-container">
            <input key="text1" id="mt1" type="text" className="meme-text" value={memeText.mt1} onChange={e => handleText(e)} />
            <label htmlFor="mt1" className="handle1"><i className="fas fa-arrows-alt"></i></label>
          </div>
        </Draggable>
        <Draggable handle=".handle2" bounds="parent">
          <div className="text-container">
            <input key="text2" id="mt2" type="text" className="meme-text" value={memeText.mt2} onChange={e => handleText(e)} />
            <label htmlFor="mt2" className="handle2"><i className="fas fa-arrows-alt"></i></label>
          </div>
        </Draggable>
        <img src={imageUrl['url']} id="image" alt="Random Meme" />
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
        <button className="btn btn-dark" onClick={e => displayImage(Math.floor(Math.random()*100))}>Random Image</button>
        <button className="btn btn-dark" onClick={e => downloadImage('meme-image')}>Download Image</button>
      </div>
    </div>
    <div className="row">
      <div id="custom-image">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                <p>Drop the files here…</p> :
              <p>Drop your image here or click to select files</p>
              }
            </div>
        <span id="file-information"></span>
      </div>
    </div>
    </div>
  )
}
