import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
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
      const arr = items.map(item => {               
        return item.Confirmed;
      });     

      // 확진 date 배열 
      const arr2 = items.map(x =>{ 
        return x.Date;
      });

      //일별확진자 수 배열
      const covid = [];
     
      for(var i=0; i<arr.length; i++){        
        var vo = new Object();
        vo.date = arr2[i];
        vo.count = arr[i] - arr[i-1];
        covid.push(vo);
      }
      console.log(covid);
      
      // 그래프 레이블
      const labels = covid.map(a =>{         
        
          var date = new Date(a.date);  //입력 파라메터로 Date 객체를 생성합니다
          var yyyy = date.getFullYear().toString(); // '연도'를 뽑아내고
          var mm = (date.getMonth()+1).toString(); // '월'을 뽑아내고
          var dd = date.getDate().toString(); // '일'을 뽑아냅니다
        
          var Str = '';
        
          //스트링 배열의 앞자리가 두자리 수가 아닌 한자리 수일 경우 
          // 두자리로 표시하기 위해 0을 채웁니다(lpad 와 동일한 역할)
          // (ex : '1' -> '01' )  
          Str += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +(dd[1] ? dd : '0' + dd[0]);
         
        return Str;
      });
      
      setDailyConfirmedData({
        labels,
        datasets: [
          {
            label: "국내 일별 확진자",
            backgroundColor: "salmon",
            fill: false, // 그래프 색을 채우겠느냐
            data: covid.map(a => a.count) // 한줄짜리인경우 {return}을 안써도 된다.
          }
        ]  
      });     
    })       
    fetchEvents();   
  }, [])

  return (
    <div className="graph">
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

export default DailyGraph;
