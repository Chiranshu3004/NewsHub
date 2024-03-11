import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

  const News=(props)=> {
  const [articles,setArticles]=useState([]);
  const pagesize=6;
  const [page,setPage]=useState(1);
  const [totalResults,settotalResults]= useState(0);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

  const UpdateNews = async()=>{
    props.setProgress(20);
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=40b34a259712413cb7a5ba40049b5e9c&page=${page}&pageSize=${pagesize}`;
  let data= await fetch(url);
  let parsedData = await data.json()
  setArticles(parsedData.articles)
  settotalResults(parsedData.totalResults)
  props.setProgress(100);
}

useEffect(() => {
  UpdateNews();
  document.title=`${capitalizeFirstLetter(props.category)}- NewsHub`

},[]);

const fetchMoreData = async() => {
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=40b34a259712413cb7a5ba40049b5e9c&page=${page}&pageSize=${pagesize}`;
  let data= await fetch(url);
  setPage(page+1)
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles));
  settotalResults(parsedData.totalResults)
};

  // render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:"80px"}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
          <div className="row my-3">
            {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,90):""} imageURL={element.urlToImage} newsURL={element.url} date={element.publishedAt}/>
            </div>
            })}
            </div>
            </div>
        </InfiniteScroll>
      </div>
    )
  }
// }
News.defaultProps={
  country: "in",
  category: "general"
}
News.propTypes={
  country: PropTypes.string,
  category: PropTypes.string,
}
export default News
