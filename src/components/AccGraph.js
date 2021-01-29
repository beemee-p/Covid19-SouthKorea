import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const AccGraph = () => {
  // useState로 [↓state명, ↓ 세팅메서드 정의]
  const [confirmedData, setconfirmedData] = useState({}) 

  useEffect(() => {
    // 이벤트가 들어감
    const fetchEvents = async ()=>{
      // api로 요청해서 받아온 결과물을 res에 담음
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data) 
    }
    // 메소드 만들기 위에서 사용할 
    const makeData = (items)=>{
      // arr은 배열, 누적값acc, 현재값cur
      const arr = items.reduce((acc, cur)=>{
        
        // 현재의 날짜를 담아 오늘 날짜를 추출 
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();

        // api에서 필요한 데이터 추출
        const confirmed = cur.Confirmed;

        //const active = cur.Active;
        //const death = cur.Death;
        //const recovered = cur.Recovered;
        
        // arr배열에 찾고있는 년월일이 들어있는지를 확인
        const findItem = acc.find(a=> a.year === year && a.month === month);
        
        // 배열에 해당날짜가 안들어가 있으면 push로 데이터 넣기
        if(!findItem){
          acc.push({ year, month, date, confirmed})
        }
        // 배열에 들어가 있고 저장된 date가 < 현재날짜보다 작으면 현재날짜의 데이터로 업데이트 해주기 
        if(findItem && findItem.date < date){
          // findItem.active = active;
          // findItem.death = death;
          // findItem.recovered = recovered;
          findItem.year = year;
          findItem.month = month;
          findItem.date = date;
          findItem.confirmed = confirmed;
        }
        // 업데이트된 acc(누적값)를 리턴 
        return acc;
      }, [])
      // 데이터가 원하는 형태로 가공됨을 확인
      console.log(arr);
      
      //데이터를 다 받아서 열거함
      // items.forEach(item => console.log(item))
      
      const labels = arr.map(a=>{
        return a.year +'.'+ (a.month+1) + '월';
      });

      setconfirmedData({
        labels,
        datasets: [
          {
            label: "국내 누적 확진자",
            backgroundColor: "salmon",
            fill: true, // 그래프 색을 채우겠느냐
            data: arr.map(a => a.confirmed) // 한줄짜리인경우 {return }을 안써도 된다.
          }
        ]  
      });
    
    }

    fetchEvents();
  })

  return (
    <div>
      <h2>누적 확진자 현황</h2>     
      <div>
          <Line data={confirmedData} options={
            {title:{display:true, text:"누적 확진자 현황", fontSize: 16}},
            {legend:{display:true, position:"bottom"}}
          }></Line>         
      </div>   
    </div>        
  )
}

export default AccGraph