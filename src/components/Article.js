import { useState, useEffect } from 'react'
import axios from 'axios'

const Article = () => {
  
  const [articles, setArticles] = useState({}); 
  //const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchEvents = async ()=>{ 
      const client_id = 'ICVA0EEW_FBpV_N5tLOw';
      const client_secret = 'pbG8d9DZ3a';
      
      //setLoading(true);
      try {
        const res = await axios.get("https://openapi.naver.com/v1/search/news.json", { 
          params:{
            query: '코로나확진자',
            display: 20
          },  
          headers: { 
            'X-Naver-Client-Id': client_id, 
            'X-Naver-Client-Secret': client_secret 
          } 
        });
        setArticles(res.data);
      } catch (e) {
        console.log(e);
      }
     //setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>코로나 관련 뉴스</h2>
      <ul className="news">
        {/* {articles.map((item) => (
          <li>
            <a target="_blank" href={item.link}>
              {item.title}
            </a>
            <p>{item.description}</p>
          </li>
        ))} */}
      </ul>
    </div>
  )
}

export default Article;

