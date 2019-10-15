import React from "react"
import ReviewData from "./ReviewData"

function BookReviewTopTen (props) {
    return (
        <div>
            <img src = {props.imUrl}/>
            <h2><a href = "#discover">{props.title}</a></h2>
            <p>Author: <a href = "#discover">{props.author}</a></p>
            <p>Ratings: {props.rating} <a href = "#discover"> ** Read more **</a></p>
            <hr/>
        </div>
    )
}

export default BookReviewTopTen
