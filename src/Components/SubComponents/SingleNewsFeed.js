import React, { useState, useContext, useEffect } from 'react'
import { IconButton } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Tooltip from '@mui/material/Tooltip';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareIcon from '@mui/icons-material/Share';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import { playText, pauseText, unsaveArticle } from '../../Data/functions.js'
import { UserContext } from '../../App'
import { signInUser, saveArticle } from '../../Data/functions'
import { Link } from 'react-router-dom'

const SingleNewsFeed = ({ newsData, index, setOpen, setSnackBarMessage }) => {

    const [articleSaved, setArticleSaved] = useState(false)
    const iconStyles = {
        fontSize: 20,
        color: '#d42873'
    }
    const [paused, setPaused] = useState(true)
    const [user, setUser] = useContext(UserContext)

    const handleShareButton = () => {

        navigator.clipboard.writeText(newsData.url)
        setOpen(true)
        setSnackBarMessage('Link Copied')

    }
    const handleSaveButtonClick = () => {
        if (!articleSaved) {
            if (user) {
                saveArticle(user.uid, newsData, setOpen, setSnackBarMessage, setArticleSaved)

            } else {

                setOpen(true)
                setSnackBarMessage('Please Sign In to save the article.')
                signInUser(setUser, setOpen, setSnackBarMessage)
            }

        } else {

            if (user) {
                unsaveArticle(user.uid, newsData, setOpen, setSnackBarMessage, setArticleSaved)
            } else {
                setOpen(true)
                setSnackBarMessage('Please Sign In to unsave the article.')
                signInUser(setUser, setOpen, setSnackBarMessage)
            }
        }
    }

    const handlePlayPauseButtonClick = () => {
        if (paused) {
            playText(newsData.title + "  . " + newsData.description, setPaused)

        } else {
            pauseText(newsData.title + " . " + newsData.description, setPaused)
        }

    }

    return (
        <div className='news-feed' key={`${index}`} >
            <div className='news-feed-title-image' >
                <img src={newsData.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn--wm8bBojawXcqX607UNOSqMLup_B5AyIwWPHfXvzZcP91daEBo4rxp88R9eUJtrJ7o&usqp=CAU'} alt="" className='news-feed-image' />
                <a href={ newsData.url } target='_blank' style={{
                    textDecoration:'none'
                }} >  <h3 className='news-feed-title'>{newsData.title}</h3> </a>
            </div>
            <div className="description-other-options">
                <p className="description">
                    {newsData.description}
                </p>
                <div className='options' >
                    <div className="details">
                        {
                            newsData.source.name ? <span className='source'>
                                {newsData.source.name}

                            </span> : <></>
                        }
                    </div>

                    <div className="icon-options">

                        <Tooltip title={`${paused ? 'Play' : 'Pause'}`} >
                            <IconButton onClick={handlePlayPauseButtonClick} >
                                {
                                    paused ? <PlayCircleRoundedIcon sx={iconStyles} /> : <PauseCircleFilledRoundedIcon sx={iconStyles} />
                                }
                            </IconButton>
                        </Tooltip>


                        <Tooltip title={`${articleSaved ? 'Unsave Article' : 'Save Article'}`}>
                            <IconButton onClick={handleSaveButtonClick}  >
                                {
                                    articleSaved ? <FavoriteRoundedIcon sx={iconStyles} /> : <FavoriteBorderRoundedIcon sx={iconStyles} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Share Article'>
                            <IconButton onClick={handleShareButton} >
                                <ShareIcon sx={iconStyles} />
                            </IconButton>
                        </Tooltip>

                        <a href={newsData.url}>
                            <Tooltip title='Read More'>
                                <IconButton >
                                    <ReadMoreRoundedIcon sx={iconStyles} />
                                </IconButton>
                            </Tooltip>
                        </a>



                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleNewsFeed
