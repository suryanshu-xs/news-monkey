import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Data/config'
import '../Style/detailedNews.css'
import Navbar from './SubComponents/Navbar'

const DetailedNews = ({ selectedCountry, setSelectedCountry, setOpen }) => {

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [articleData, setArticleData] = useState(null)
    const [snackBarMessage, setSnackBarMessage] = useState('')

    document.title = 'News Monkey'
    useEffect(async () => {

        setLoading(true)
        const docRef = doc(db, 'news-monkey-public-posts', params.id)
        const docSnap = await getDoc(docRef)
        setArticleData(docSnap.data())
        setLoading(false)

    }, [])


    return (
        <>
            <Navbar selectedCountry={selectedCountry} disabled={true} setSelectedCountry={setSelectedCountry} setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} />
            <div className="loading-box">
                {
                    loading ? <LinearProgress /> : <></>
                }
            </div>
            {
                articleData ? <div className='detailed-news' >
                    <h1 className="title-heading">{articleData.articleTitle}</h1>
                    <p className="detailed-news-description">
                        {articleData.description}
                    </p>
                    <div className="detailed-news-author-name">
                        <span className="authoName">
                            Author - {articleData.authorName}
                        </span>
                        <span className='detailed-news-publishedAt' >
                            Published At - {
                                articleData.publishedAt.toDate().toLocaleString()
                            }
                        </span>
                    </div>

                    <img src={articleData.imageUrl} alt="" className='detailed-news-image' />

                    <p className="detailed-news-content">
                            { articleData.content }
                    </p>



                </div> : <></>
            }




        </>
    )
}

export default DetailedNews
