import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {
  // useState로 [↓state명, ↓ 세팅메서드 정의]
  const [confirmedData, setconfirmedData] = useState({}) 
  

  useEffect(() => {
   
    // 이벤트가 들어감
    const fetchEvents = async ()=>{
      // api로 요청해서 받아온 결과물을 res에 담음
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data) 
    }
    
    const makeData = (items =>{             
      // 누적확진자 배열
      const arr = items.map(item =>{             
        return item.Confirmed;
      });
      console.log(arr);      
      
      // 일별확진자 배열
      const curArr = new Array();

      for(var i in arr){ 
        curArr[i] = arr[i] - arr[i-1];
      }
      console.log(curArr);
        
      const labels = curArr.map(a =>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        
        return a.year +'/'+ (a.month+1) + '/' + a.date;
      });
  
      setconfirmedData({
        labels,
        datasets: [
          {
            label: "국내 일별 확진자",
            backgroundColor: "salmon",
            fill: false, // 그래프 색을 채우겠느냐
            data: curArr.map(a => a) // 한줄짜리인경우 {return }을 안써도 된다.
          }
        ]  
      });     
    })   
    

    fetchEvents();   

  })

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div>
            <Line data={confirmedData} options={
              {title:{display:true, text:"누적 확진자 현황", fontSize: 16}},
              {legend:{display:true, position:"bottom"}}
            }></Line>
        </div>
      </div>
    </section>
  )
}

export default Contents
