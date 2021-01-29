import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

const DailyGraph = () => {
   const [dailyConfirmedData, setDailyConfirmedData] = useState({}) 
  
  useEffect(() => {
  
    // 이벤트가 들어감
    const fetchEvents = async ()=>{
      // api로 요청해서 받아온 결과물을 res에 담아 makeDate함수로 처리
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data) 
    }
    
    const makeData = (items =>{             
      
      // 누적확진자 수 배열
      const arr = items.map(item=> {
        
        // const currentDate = new Date(item.Date);
        // const year = currentDate.getFullYear();
        // const month = currentDate.getMonth();
        // const date = currentDate.getDate();
        //console.log(currentDate);
        
        // const confirmed = item.Confirmed;
        // const curDate = item.Date;   
        
        // 누적확진자 날짜와 확진자 수 
        // const accObj = {}
        // accObj[item.Date] = item.Confirmed;

        return item.Confirmed;
      });     
      console.log(arr);

      // 일별확진자 배열 
      const curArr = new Array();
      for(var i=1; i<arr.length; i++){        
        curArr[i] = arr[i] - arr[i-1];           
      }   
      console.log(curArr);

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
   
      
      // 그래프 레이블
      const labels = curArr.map(a =>{         
        return accDate;
      });
      
      setDailyConfirmedData({
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
    <div>
      <h2>일별 확진자 현황</h2>
      <div>
          <Bar data={dailyConfirmedData} options={
            {title:{display:true, text:"누적 확진자 현황", fontSize: 16}},
            {legend:{display:true, position:"bottom"}}
          }></Bar>
      </div>     
    </div>        

  )
}

export default DailyGraph
