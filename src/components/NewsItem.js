import React from 'react'

    const NewsItem = (props)=> {
    let {title, description, imageURL, newsURL, date} = props;
    return (
      <div>
        <div className="card my-3 mx-2">
            <img src={imageURL?imageURL:"https://i0.wp.com/www.shaharbeen.com/wp-content/uploads/2018/09/breakingghkzks.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsURL} target="_blank " className="btn btn-sm btn-primary">Read More</a>
                <p className="card-text"><small className="text-body-secondary">Last updated at {new Date(date).toGMTString()}</small></p>
            </div>
        </div>
      </div>
    )
  }

export default NewsItem
