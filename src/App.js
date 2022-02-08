import React, { createContext, useState } from 'react'
import Homepage from './Components/Homepage';
import WeatherPage from './Components/WeatherPage';
import PostArticles from './Components/PostArticles'
import SavedArticles from './Components/SavedArticles'
import About from './Components/About'
import './App.css';
import DetailedNews from './Components/DetailedNews';
import { Routes, Route } from "react-router-dom";



const UserContext = createContext()

function App() {
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'in',
    capital: 'New Delhi',
    country: 'India'
  });
  const [selectedTopic, setSelectedTopic] = useState('Headlines')
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)





  return (
    <div className="main-container">
      <UserContext.Provider value={[user, setUser]} >
        <Routes>

          <Route path='/' element={<Homepage selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} open={open} setOpen={setOpen} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />} />

          <Route path='/weather' element={<WeatherPage selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} open={open} setOpen={setOpen} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />} />

          <Route path='/addNewsArticles' element={<PostArticles selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} open={open} setOpen={setOpen} />} />

          <Route path='/savedArticles' element={<SavedArticles selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} open={open} />} />

          <Route path='/about' element={<About selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} open={open} />} />

          <Route path='/detailedNews/:id' element={<DetailedNews selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext }
