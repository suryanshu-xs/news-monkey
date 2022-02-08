import React, { useEffect, useState } from 'react'
import '../Style/about.css'
import Navbar from './SubComponents/Navbar'
import { Button, LinearProgress } from '@mui/material'
import {  addDoc, collection } from 'firebase/firestore'
import { db } from '../Data/config'
import SimpleSnackbar from './SubComponents/SnackBars'


const About = ({ selectedCountry, setSelectedCountry, setOpen,open }) => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [snackBarMessage,setSnakBarMessage] = useState('')
    const [loading,setLoading] = useState(false)

    document.title = 'News Monkey | About'
    const sendMessage = async (event) => {
        event.preventDefault()
        setLoading(true)
        const collectionRef = collection(db,'news-monkey-messages')
        await addDoc(collectionRef,{
            email,message
        })
        setOpen(true)
        setSnakBarMessage('Email Sent!')
        setLoading(false)
    }


    return (
        <>
            <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} disabled={true} />
            <div className="loading-box">
                {
                    loading? <LinearProgress />:<></>
                }
            </div>
            <div className='about-page' >
                <h1 className='about-page-heading' > About News Monkey </h1>

                <div className="about-info-container">

                    <div className="about-div">
                        <p className="about-info-text">
                            News Monkey is a news reading and sharing platform. You can read news on any topic you want across 20 countries. You can get current weather and forecast information for any city in the world. News Monkey provides updated Covid data of the world and your specific selected country. You can write your own news articles and share it with our readers. You can save the articles you like and read it later on.
                        </p>
                        <p className="about-more-info">
                            For any queries, support or business related questions please fill the contact form and send your message to us.
                        </p>
                        <p className="thank-you">
                            Thank You
                        </p>
                        <p className="designed-by">
                            Designed By ,
                        </p>
                        <div className="designer-name-email">
                            <span className='designer-name' >
                                Suryanshu
                            </span>
                            <span className='designer-email' >
                                Email - suryanshu06032003@gmail.com
                            </span>
                        </div>

                    </div>
                    <div className="contact-div">
                        <h2 className='contact-div-heading' > Contact Us </h2>
                        <form action="" className='contact-form' onSubmit={sendMessage} >

                            <input type="email" name="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                            <textarea name="message-text-area" id="" cols="30" rows="10" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>

                            <div className="btn-container-form">
                                <Button variant='contained' type='submit' disabled={loading} >Send</Button>
                            </div>
                        </form>

                    </div>


                </div>

            </div>
            {
                snackBarMessage.length !== 0 ? <SimpleSnackbar open={open} setOpen={setOpen} message={snackBarMessage} /> : <></>
            }

        </>
    )
}

export default About
