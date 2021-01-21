import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {

  const [confirmedData, setconfirmedData] = useState({
    labels:["1월", "2월", "3월", "4월"],
    datasets: [
      {
        label: "국내 누적 확진자",
        backgroundColor: "salmon",
        fill: true, // 그래프 색을 채우겠느냐
        data: [5, 4, 2, 0]
      },
    ]
    
  }) // 초기값 지정

  useEffect(() => {
    // 이벤트가 들어감
    const fetchEvents = async ()=>{
      // api로 요청해서 받아온 결과물을 res에 담음
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data) 
    }
    
    const makeData = (items)=>{
    
      const arr = items.reduce((acc, cur)=>{
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        // api에 적힌 속성과 똑같이 사용 대문자.
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Death;
        const recovered = cur.Recovered;
        // 
        const findItem = acc.find(a=> a.year === year && a.month === month);
        
        if(!findItem){
          acc.push({ year, month, date, confirmed, active, death, recovered})
        }

        if(findItem && findItem.date < date){
          findItem.active = active;
          findItem.death = death;
          findItem.date = date;
          findItem.year = year;
          findItem.month = month;
          findItem.recovered = recovered;
          findItem.confirmed = confirmed;
        }
        //업데이트된 커멘트를 리턴 
        return acc;

       
      }, [])
      // 데이터가 원하는 형태로 가공됨 
      console.log(arr);
      //데이터를 다 받아서 열거함
      // items.forEach(item => console.log(item))
    }

    fetchEvents();
  })

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div>
            <Bar data={confirmedData} options={
              {title:{display:true, text:"누적 확진자 추이", fontSize: 16}},
              {legend:{display:true, position:"bottom"}}
            }></Bar>
        </div>
      </div>
    </section>
  )
}

export default Contents
