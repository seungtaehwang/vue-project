<!-- App.vue -->
<template>
  <div>
    <h1>Vue App (부모 컴포넌트)</h1>
    <!-- 콤보박스 -->
    <select v-model="selectedType">
      <option disabled value="">유형 선택</option>
      <option value="pie">pie</option>
      <option value="bar">bar</option>
      <option value="line">line</option>
      <option value="scatter">scatter</option>
    </select>
    <!-- 버튼 클릭 시 handleReloadChart 함수 호출 -->
    <button @click="handleReloadChart" style="margin-left: 10px;">EChart 데이터 새로고침</button>
    
    <!-- EChart 컴포넌트 포함 및 ref 연결 -->
    <!-- :chartData는 props로 데이터 전달, ref="eChartRef"로 인스턴스 참조 -->
    <EChart ref="eChartRef" :chartData="currentChartData" :chartType="selectedType.valueOf(string)" :chartTitle="chartTitle.valueOf(string)"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EChart from './components/charts/EChart.vue'; // EChart.vue 경로에 맞게 수정
import axios from 'axios';

// selectedType: 콤보박스에서 선택된 차트 유형
const selectedType = ref('');
const chartTitle = ref('주간 판매량');
// 초기 차트 데이터
const currentChartData = ref([5, 20, 36, 10, 10, 20]);

// EChart 컴포넌트 인스턴스에 접근하기 위한 ref 생성
const eChartRef = ref(null);

// 버튼 클릭 핸들러 함수
const handleReloadChart = async () => {
  try {
    if (!selectedType.value) {
      alert('유형을 선택해주세요.');
      return;
    }
    if (selectedType.value === 'bar'|| selectedType.value === 'line')
    {
      // Spring Boot API 엔드포인트 호출
      console.log(`${selectedType.value}에 대한 데이터 요청...`);
      const response = await axios.get('http://localhost:8080/api/chart-data'); //
      console.log("데이터를 성공적으로 불러왔습니다:", response.data);
      chartTitle.value = '주간 판매량';
      currentChartData.value = response.data;
    }
    else if (selectedType.value === 'scatter')
    {
      console.log(`${selectedType.value}에 대한 데이터 요청...`);
      const response = await axios.get('http://localhost:8080/api/xy-data',{
        params: { chartIndex: 'scatter' } 
      }); //
      console.log("데이터를 성공적으로 불러왔습니다:", response.data);
      chartTitle.value = '주간 관계';
      currentChartData.value = response.data;
    }
    else if (selectedType.value === 'pie')
    {
      console.log(`${selectedType.value}에 대한 데이터 요청...`);
      const response = await axios.get('http://localhost:8080/api/pie-data'); //
      console.log("데이터를 성공적으로 불러왔습니다:", response.data);
      chartTitle.value = '주간 판매량';
      currentChartData.value = response.data;
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
  
  // 1. props 업데이트: 반응형 데이터 변경
  currentChartData.value = newData; 

  // 2. (선택사항) 자식 컴포넌트의 메서드를 직접 호출하여 차트 강제 업데이트
  // watch를 구현했다면 자동으로 업데이트되지만, 직접 호출도 가능
  if (eChartRef.value) {
    console.log("Chart Type:", selectedType.value);
    eChartRef.value.chartType = selectedType.valueOf(string);
    eChartRef.value.updateChart(); 
  }
};
</script>
