import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {
  // useState로 [↓state명, ↓ 세팅메서드 정의]
  const [confirmedData, setconfirmedData] = useState({}) 
  

  useEffect(() => {
  
    // 이벤트가 들어감
    const fetchEvents = async ()=>{
      // api로 요청해서 받아온 결과물을 res에 담아 makeDate함수로 처리
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data) 
    }
    
    const makeData = (items =>{             
      
      // 누적확진자 수 배열
      const arr = items.map(item =>{                   
        return item.Confirmed; 
      });
      
      // 일별확진자 배열   
      const curArr = new Array();

      for(var i=1; i<arr.length; i++){        
        curArr[i] = arr[i] - arr[i-1];             
      }          
      
      // 시작날짜 + 하루씩 추가 되는 배열생성 메소드 
      function getDateRangeData(param1){ 
        const res_day = [];
        const startDate = new Date(param1);
        const today = new Date();   

        while(startDate.getTime() <= today.getTime()){
          
          var month = (startDate.getMonth()+1);
          month = month < 10 ? '0'+month : month;

          var date = startDate.getDate();
          date = date < 10 ? '0'+date : date;

          var res_day2 = res_day.concat(startDate.getFullYear() + '-' + month + '-' +  date);         
          startDate.setDate(startDate.getDate() + 1);
        }
        return res_day2;
      }
      const startDate = "2020-01-22";
      const accDate = getDateRangeData(startDate);       
     
      console.log(accDate);

      // 그래프 레이블
      const labels = curArr.map(a =>{         
        return accDate;
      });
      
      setconfirmedData({
        labels, 
        datasets: [
          {
            label: "국내 일별 확진자",
            backgroundColor: "salmon",
            fill: false, // 그래프 색을 채우겠느냐
            data: curArr.map(a => a) // 한줄짜리인경우 {return}을 안써도 된다.
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
            <Bar data={confirmedData} options={
              {title:{display:true, text:"누적 확진자 현황", fontSize: 16}},
              {legend:{display:true, position:"bottom"}}
            }></Bar>
        </div>
      </div>
    </section>
  )
}

export default Contents
