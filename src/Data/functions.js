import { signInWithPopup, signOut } from "firebase/auth"
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, db, auth, provider } from "./config"



const dateFormatter = (date) => {

    switch (date.split('-')[1]) {
        case '1': return `January ${date.split('-')[2]}`
        case '2': return `February ${date.split('-')[2]}`
        case '3': return `March ${date.split('-')[2]}`
        case '4': return `April ${date.split('-')[2]}`
        case '5': return `May ${date.split('-')[2]}`
        case '6': return `June ${date.split('-')[2]}`
        case '7': return `July ${date.split('-')[2]}`
        case '8': return `August ${date.split('-')[2]}`
        case '9': return `September ${date.split('-')[2]}`
        case '10': return `October ${date.split('-')[2]}`
        case '11': return `November ${date.split('-')[2]}`
        default: return `December ${date.split('-')[2]}`
    }
}
const timeFormatter = (time) => {

    if (time === 24) return '12 AM'
    else if (time === 12) return '12 PM'
    else return time > 12 ? `${time - 12} PM` : `${time} AM`
}

const playText = (text, setPaused) => {

    if (speechSynthesis.paused && speechSynthesis.speaking) {
        speechSynthesis.resume()
    }
    if (!speechSynthesis.speaking) {
        if (text !== null || text !== '') {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 1.1
            speechSynthesis.speak(utterance)
            utterance.addEventListener('pause', () => {
                setPaused(true)
            })
            utterance.addEventListener('resume', () => {
                setPaused(false)
            })
            utterance.addEventListener('start', () => {
                setPaused(false)
            })
            utterance.addEventListener('end', () => {
                setPaused(true)
            })
        }
    }

}
const pauseText = (text, setPaused) => {
    if (text !== null || text !== '') {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause()
            setPaused(true)
        }

    }
}

const uploadFile = (formData, setOpen, setSnackBarMessage, setLoading) => {


    if (formData.image === null) {
        return saveDocument(formData, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsq1NacYKHKS-RudSBgbLZa_ndkD-lmmQfA&usqp=CAU', setOpen, setSnackBarMessage)
    }

    const storageRef = ref(storage, `newsMonkeyArticleUploads/${formData.image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, formData.image)
    uploadTask.on('state_changed', () => {

        setOpen(true)
        setSnackBarMessage('Uploading Article ....')
        setLoading(true)


    }, () => {
        setOpen(true)
        setSnackBarMessage('Article Upload Failed')
        setLoading(false)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            saveDocument(formData, downloadURL, setOpen, setSnackBarMessage)
            setLoading(false)
        })
    })

}

const saveDocument = async (formData, downloadURL, setOpen, setSnackBarMessage) => {
    await addDoc(collection(db, 'news-monkey-public-posts'), {
        authorName: formData.authorName,
        articleTitle: formData.articleTitle,
        description: formData.description,
        content: formData.content,
        imageUrl: downloadURL,
        publishedAt: serverTimestamp()
    })
    setOpen(true)
    setSnackBarMessage('Article Uploaded Successfully')
}

const signInUser = (setUser, setOpen, setSnackBarMessage) => {
    signInWithPopup(auth, provider).then((result) => {
        setUser(result.user)
        setOpen(true);
        setSnackBarMessage('You are now logged in')
    }).catch(() => {
        setOpen(true);
        setSnackBarMessage('Login Failed')
    })
}

const signOutUser = (setUser, setOpen, setSnackBarMessage) => {
    signOut(auth).then(() => {
        setOpen(true)
        setSnackBarMessage('Your are logged out.')
        setUser(null)
    }).catch(() => {
        setOpen(true)
        setSnackBarMessage('Log out failed.')
    })
}



const saveArticle = async (userId, newsData, setOpen, setSnackBarMessage, setArticleSaved) => {

    const docRef = doc(db, 'news-monkey-users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        await updateDoc(docRef, {
            savedArticles: arrayUnion({
                title: newsData.title,
                url: newsData.url,
                urlToImage: newsData.urlToImage,
                description: newsData.description,
                source: {
                    name: newsData.source.name
                }
            })
        })
        setOpen(true)
        setSnackBarMessage('Article Saved!')
        setArticleSaved(true)
    } else {
        await setDoc(docRef, {
            savedArticles: [{
                title: newsData.title,
                url: newsData.url,
                urlToImage: newsData.urlToImage,
                description: newsData.description,
                source: {
                    name: newsData.source.name
                }
            }]
        })

        setOpen(true)
        setSnackBarMessage('Article Saved!')
        setArticleSaved(true)

    }

}

const unsaveArticle = async (userId, newsData, setOpen, setSnackBarMessage, setArticleSaved) => {
    const docRef = doc(db, 'news-monkey-users', userId)
    await updateDoc(docRef, {
        savedArticles: arrayRemove({
            title: newsData.title,
            url: newsData.url,
            urlToImage: newsData.urlToImage,
            description: newsData.description,
            source: {
                name: newsData.source.name
            }
        })
    })
    setOpen(true)
    setSnackBarMessage('Article Unaved!')
    setArticleSaved(false)
}

const getTempInCelsius = (k) => {

    return Math.round(k - 273.15)
}

export { dateFormatter, timeFormatter, playText, pauseText, uploadFile, signInUser, signOutUser, saveArticle, unsaveArticle, getTempInCelsius }