import React, { useEffect, useState } from 'react'
import SingleNewsFeed from './SubComponents/SingleNewsFeed'
import Navbar from './SubComponents/Navbar'
import SimpleSnackbar from './SubComponents/SnackBars'
import { LinearProgress } from '@mui/material'
import '../Style/postArticles.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { uploadFile } from '../Data/functions'

const PostArticles = ({ selectedCountry, setSelectedCountry, open, setOpen }) => {

    const Input = styled('input')({
        display: 'none',
    });
    const [loading, setLoading] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('Please fill in all the required details.')
    const [fileURL, setFileURL] = useState(null)

    const [formData, setFormData] = useState({
        authorName: '',
        articleTitle: '',
        description: '',
        content: '',
        image: null
    })
    document.title = 'News Monkey | Post Articles'
    const [previewData, setPreviewData] = useState({
        title: '',
        urlToImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsq1NacYKHKS-RudSBgbLZa_ndkD-lmmQfA&usqp=CAU',
        source: {
            name: ''
        },
        description: ''
    })

    useEffect(() => {
        document.title='Post News Articles'
        setPreviewData({
            ...previewData, title: formData.articleTitle, description: formData.description, source: {
                name: formData.authorName
            }
        })

    }, [formData])





    const handleFileInputChange = (file) => {
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type==='image/webp') {
                setFileURL(URL.createObjectURL(file))
                setPreviewData({ ...previewData, urlToImage: URL.createObjectURL(file) })
                setFormData({
                    ...formData, image: file
                })
            }else{
                setOpen(true)
                setSnackBarMessage('Unsupported file type.')
            }

        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        uploadFile(formData, setOpen, setSnackBarMessage, setLoading)


    }



    return (
        <>
            <div className='post-articles-page' >

                <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} searchPlaceHolder='' disabled={true} setSnackBarMessage={setSnackBarMessage} />

                <div className="loading-box">
                    {
                        loading ? <LinearProgress /> : <></>
                    }
                </div>
                <h1 className='post-article-heading' > Write Your Own News Feed </h1>

                <div className="post-article-form-container">
                    <form action="" onSubmit={handleFormSubmit} >

                        <div className="form-wrapper">
                            <div className='preview-image-upload-button-container' >

                                <div className="image-preview-container">
                                    {
                                        <img src={fileURL ? fileURL : 'https://newhorizon-computer-engineering.s3.ap-south-1.amazonaws.com/nhengineering/computer-engineering/wp-content/uploads/2020/01/17111850/default_image_01.png'} alt='Preview Image' className='preview-image' />
                                    }
                                </div>

                                <label htmlFor="contained-button-file"  >

                                    <Input accept="image/*" id="contained-button-file" type="file" onChange={(e) => handleFileInputChange(e.target.files[0])} />
                                    <Button component="span">
                                        Choose Image
                                    </Button>

                                </label>
                            </div>

                            <div className="textfeilds-container">

                                <div className='textfeilds-wrapper-name'>
                                    <TextField
                                        id="outlined-basic"
                                        label="Your Name"
                                        variant="outlined"
                                        className='article-inputs author-name-input'
                                        required={true}
                                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}

                                    />
                                </div>

                                <div className='textfeilds-wrapper'>
                                    <TextField
                                        id="outlined-basic"
                                        label="Article Title"
                                        variant="outlined"
                                        className='article-inputs'
                                        required={true}
                                        onChange={(e) => setFormData({ ...formData, articleTitle: e.target.value })}
                                    />
                                </div>

                                <div className="textfeilds-wrapper">
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Description"
                                        multiline
                                        rows={2}
                                        className='article-inputs'
                                        required={true}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="textfeilds-wrapper">
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Content"
                                        multiline
                                        rows={6}
                                        className='article-inputs'
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>

                                <Button type='submit' >
                                    Submit
                                </Button>


                            </div>

                        </div>

                    </form>

                    <h2 className='preview-heading' > Preview Your Post </h2>

                    <div className="preview-article-container">

                        <SingleNewsFeed setOpen={setOpen} newsData={previewData} setSnackBarMessage={setSnackBarMessage} index={0} />
                    </div>

                    <div className='footer' >

                    </div>



                </div>



            </div>

            <SimpleSnackbar open={open} setOpen={setOpen} message={snackBarMessage} />

        </>
    )
}

export default PostArticles
