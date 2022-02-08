import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { db } from '../Data/config'
import Navbar from './SubComponents/Navbar'
import '../Style/savedArticles.css'
import { Button } from '@mui/material'
import SimpleSnackbar from './SubComponents/SnackBars'
import { signInUser } from '../Data/functions'
import SingleNewsFeed from './SubComponents/SingleNewsFeed'
import { Link } from 'react-router-dom'


const SavedArticles = ({ selectedCountry, setSelectedCountry, setOpen }) => {
    const [user, setUser] = useContext(UserContext)
    const [savedArticles, setSavedArticles] = useState(null)
    const [snackBarMessage, setSnackBarMessage] = useState('')
    useEffect(async () => {
        document.title='Saved Articles'
        if (user) {
            const docRef = doc(db, 'news-monkey-users', user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setSavedArticles(docSnap.data().savedArticles)
            } else {
                setSavedArticles(null)
            }
        }

    }, [user])

    return (
        <>

            <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} disabled={true} setSnackBarMessage={setSnackBarMessage} />


            <div className='saved-articles-container' >
                {
                    user ? <div className='saved-articles-wrapper' >
                        {
                            savedArticles ? <div className='saved-articles-box' >
                                <h1 className='no-user-heading' >Your saved articles</h1>
                                <div className='saved-articles' >
                                    {
                                        savedArticles.map((newsData, index) => (<SingleNewsFeed newsData={newsData} index={index} setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} />))
                                    }
                                </div>
                            </div> : <div className='no-saved-articles' >
                                <h1 className='no-user-heading' >You have no saved articles</h1>
                                <div className='login-button-container' >
                                    <Link to='/' style={{
                                        textDecoration:'none'
                                    }} >  <Button variant='contained'  >Home</Button> </Link>
                                </div>
                            </div>
                        }
                    </div> : <div className='no-user' >
                        <h1 className='no-user-heading' >Please Login to see your saved articles</h1>
                        <div className='login-button-container' >
                            <Button variant='contained' onClick={() => signInUser(setUser, setOpen, setSnackBarMessage)} >Login</Button>
                        </div>
                    </div>
                }
                <div className='footer' >

                </div>
            </div>
            <SimpleSnackbar setOpen={setOpen} message={snackBarMessage} />
        </>
    )
}

export default SavedArticles
