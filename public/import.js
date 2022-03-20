import React from 'react'
import Data from './data.json' //this comes from the user.
export const importannoation = () => {
  return (
    <div>importannoation
        <div className="posts">
            {Data.map(post=>{
                return (
                    <>
                    <h4>{post.name}</h4>
                    <p>{"post.videopath"}</p>
                    <p>{"post.imagepath"}</p>
                    </>
                )
            })
        }
        </div>
    </div>
  )
}
