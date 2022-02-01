
import './App.css';
import Data from "./Data.json"
import Alpaca from './Alpaca';
import React from 'react';
import domtoimage from 'dom-to-image';



export default function App() {

  const defaultAlpaca = {
    Accessories:'headphone',
    Backgrounds:'blue50',
    Ears:'default',
    Eyes:'default',
    Hair:'default',
    Leg:'default',
    Mouth:'default',
    Neck:'default',
    Nose:'nose',
  }

  const [ clicks, setClicks ] =  React.useState(0);
  const [newDesign , setNewDesign] = React.useState(defaultAlpaca);
  const [selectedCategory , setSelectedCategory] = React.useState('Hair');
  const maincat = Object.keys(Data);
  const subCat = selectedCategory ? Object.values(Data[selectedCategory]) : [];


 

   function handleSub(e){
    setSelectedCategory(e.target.innerText)
   }

   function handleDesign(e){
     
        newDesign[selectedCategory] = e.target.innerText
        setNewDesign(newDesign)
        setClicks(clicks + 1)

   }

   const randomAlpaca = () => {
    maincat.map((category , index) => {
      let subCat = Data[category].length;
      let indexToGet = Math.floor(Math.random() * subCat);
      newDesign[category] = Data[category][indexToGet];
      return newDesign
    })
    setClicks(clicks + 1);
   }

   const downloadAlpaca = () => {
    let alpacaDesign = document.getElementById('alpaca')
    domtoimage.toJpeg(alpacaDesign)
    .then(function(dataUrl){
      var link = document.createElement("a");
      link.download = "my-alpaca.jpeg";
      link.href = dataUrl;
      link.click();
    })
  }
  
   

  return (
    <div className="App">
        <h2> ALPACA GENERATOR </h2>
        <div className='container'>
            <Alpaca design={newDesign}/>
          <div className='menu'> 
            <p> ACCESSORIZE THE ALPACA'S </p>
            <div className='category'> 
              {
                maincat.map((cat,index) => {
                  return(
                    <button className='btn' onClick={(e) => handleSub(e)} key={index}> {cat} </button>
                  )
                })
              }
            </div>
            <p> STYLE </p>
            <div className='sub-category category'>
            {
              subCat && subCat.map((item , index) => {
                return(
                  <button onClick={(e) => handleDesign(e)} className='btn' key={index}> {item} </button>
                )
              })
            }
            </div>
          </div>

        </div>
        <div className='btn_container'> 
          <button onClick={() => randomAlpaca()} className='btn'> Random </button>
          <button onClick={() => downloadAlpaca()} className='btn'> Download </button>
        </div>
    </div>
  );
}


