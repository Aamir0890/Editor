import './Styles/App.css'

import Card from './component/Card';


import Header from './component/Header';


function App() {
  return (
    <div
      style={{
        maxWidth: "70%",
        width: "100%",
        aspectRatio: "9 / 8",
      
      position:'relative',
      maxHeight:'700px',
            justifyContent:'center',
            display:'flex',
            flexDirection:'column',
          alignItems:'center',
          marginLeft:'10%'
      }}
    >
   
    <Header/>
      <Card/>
      {/* <TextEditorComponent/> */}
    </div>
  );
};


export default App
