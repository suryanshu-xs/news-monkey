import React, { useEffect, useState } from 'react'
import Navbar from './SubComponents/Navbar'
import '../Style/homepage.css'
import Options from './SubComponents/Options'
import SingleNewsFeed from './SubComponents/SingleNewsFeed'
import LinearProgress from '@mui/material/LinearProgress';
import SimpleSnackbar from './SubComponents/SnackBars'
import CovidData from './SubComponents/CovidData'
import PublicNewsData from './SubComponents/PublicNewsData'


const Homepage = ({ selectedCountry, setSelectedCountry, open, setOpen, selectedTopic, setSelectedTopic }) => {

    const [newsData, setNewsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [snackBarMessage, setSnackBarMessage] = useState('')


    useEffect(() => {
        document.title = 'News Monkey | '+ selectedCountry.country 
        setLoading(true)
        fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${selectedCountry.country + " " + selectedTopic}&count=30&freshness=Day&textFormat=Raw&safeSearch=Off`, {
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
            }
        })
            .then(response => {
                response.json().then(data => {
                    setLoading(false)
                    let temp = []
                    if (data.value) {
                        data.value.map((news) => {

                            temp.push({

                                title: news.name,
                                url: news.url,
                                urlToImage: news.image?news.image.thumbnail.contentUrl:'',
                                description: news.description,
                                source: {
                                    name: news.provider[0].name
                                }
                            });
                        


                        })
                    }
                    setNewsData(temp)


                    if (selectedTopic === 'Headlines') {
                        setOpen(true)
                        setSnackBarMessage(`Showing top headlines for ${selectedCountry.country}`)
                    }

                })
            })
            .catch(() => {
                setNewsData(null);
                setLoading(false)
                setOpen(true)
                setLoading(false)
                setSnackBarMessage('Failed to load details')
            });


    }, [selectedCountry, selectedTopic]);

    return (
        <>
            <div className='homepage-container'>
                <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} setSelectedTopic={setSelectedTopic} searchPlaceHolder='Search Topics' disabled={false} setSnackBarMessage={setSnackBarMessage} />
                <div className='loading-box' >
                    {
                        loading ? <LinearProgress /> : <></>
                    }
                </div>
                <Options selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
                <CovidData selectedCountry={selectedCountry} />
                <div className='news-feed-wrapper'>
                    {
                        newsData ? newsData.map((news, index) => (<SingleNewsFeed newsData={news} index={index} key={index} setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} />)) : <></>
                    }
                </div>
                <h2 className="public-news-heading">
                    Interesting Stories
                </h2>
                <PublicNewsData setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} />

            </div>
            <footer className="footer">

            </footer>
            {
                snackBarMessage.length !== 0 ? <SimpleSnackbar open={open} setOpen={setOpen} message={snackBarMessage} /> : <></>
            }

        </>
    )
}

export default Homepage
