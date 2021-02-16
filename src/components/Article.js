import { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Article.css';

const Article = () => {
  const [articles, setArticles] = useState(); 
  // const [loading, setLoading] = useState(false);
  
  useEffect(() => {  
    const fetchEvents = async ()=>{ 
      //client 키 
      const client_id = 'ICVA0EEW_FBpV_N5tLOw';
      const client_secret = 'pbG8d9DZ3a';
      
      // setLoading(true);
      try {
        const res = await axios.get("/v1/search/news.json", { 
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
    }
    //  setLoading(false);
    console.log(articles, "통과");
    
    fetchEvents();
   }, [])  

  
  return (
    <div className="news">
      <h2>코로나 관련 뉴스</h2> 
      <div className="articleGroup grid-container" >      
          {articles && articles.items.map(item => {
            
            // 뉴스영역박스 새로고침시 랜덤색상변경 
            let color = '#';
            let letters = [
              '9BB7D4', '5B55A30', 'F5DF4D', 'A0DAA9', 'E9897E', 
              '926AA6', 'D2386C', 'd7d967', '99b433', '1e7145',
              '7e3878', 'eff4ff', '2d89ef', '2b5797', 'e3a21a', 
              'da532c', 'b91d47'
            ];
            color += letters[Math.floor(Math.random() * letters.length)]; 
            console.log(color);
            let randomNum = {
              backgroundColor: color
            }

            // <b></b>와 &quot; 제거
            const oldTextArticle = item.title;
            const newTextArticle = oldTextArticle.replace(/(<([^>]+)>)/ig, "").replace(/&quot;/g,"").replace(/\"n/, "").replace(/&amp;/g,"");
            
            //console.log(newText);

            return  <a className="article grid-item hvr-grow" style={randomNum} href={item.link} target="_blank">{newTextArticle}</a>;
          })}
      </div>
     
    </div>
  );
}

export default Article;

