import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Data/config'
import SingleNewsFeed from './SingleNewsFeed'


const PublicNewsData = ({ setOpen, setSnackBarMessage }) => {

    const [publicNewsData, setPublicNewsData] = useState(null)

    useEffect(async () => {
        let temp = []
        const collectionRef = collection(db, 'news-monkey-public-posts')
        const q = query(collectionRef, orderBy('publishedAt', 'desc'), limit(20))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push({
                title: doc.data().articleTitle,
                urlToImage: doc.data().imageUrl,
                description: doc.data().description,
                source: {
                    name: doc.data().authorName
                },
                content: doc.data().content,
                id: doc.id,
                url:`detailedNews/${doc.id}`
            })
        })
        setPublicNewsData(temp)
    }, [])

    return (
        <div className='news-feed-wrapper'>
            {
                publicNewsData ? publicNewsData.map((newsData, index) => <SingleNewsFeed newsData={newsData} index={index} key={index+newsData.url} setOpen={setOpen} setSnackBarMessage={setSnackBarMessage} />) : <></>
            }
        </div>
    )
}

export default PublicNewsData
