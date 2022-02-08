import React from 'react'
import { Button } from '@mui/material'

const Options = ({selectedTopic, setSelectedTopic}) => {
    const topics = ['Science', 'Sports', 'Weather', 'Headlines', 'Tech', 'Entertainment', 'Crypto']
    return (
        <div className='options-tab'>
            {
                topics.map((topic,index) => <Button
                key={index}
                size='small'
                    style={{
                        borderRadius:30,
                        paddingTop:7,
                        paddingBottom:7,
                        paddingRight:15,
                        paddingLeft:15,
                        color:selectedTopic===topic?'#f542a7':'gray',
                        marginRight:5,
                        marginLeft:5
                        
                    }}
                onClick={()=>setSelectedTopic(topic)}
                >{topic}</Button>)
            }
        </div>
    )
}

export default Options
