<!-- App.vue -->
<template>
  <div id="app">
    <h1>Spring API 연동 Chart.js 예제</h1>
    <div v-if="loading">데이터 로딩 중...</div>
    <div v-else>
      <div>
        <button @click="changeChartType('line')">Line Chart</button>
        <button @click="changeChartType('bar')">Bar Chart</button>
        <button @click="changeChartType('pie')">Pie Chart</button>
      </div>
      <!-- 데이터를 props로 전달 -->
      <Chartjs
        :chart-data="apiChartData"
        :chart-type="currentChartType"
      />
    </div>
  </div>
</template>

<script>
import Chartjs from './tests/components/TestChild.vue';
import axios from 'axios'; // npm install axios 필요

export default {
  name: 'App',
  components: {
    Chartjs
  },
  data() {
    return {
      loading: true,
      apiData: [], // Spring API에서 받은 원본 데이터
      currentChartType: 'line',
    };
  },
  computed: {
    apiChartData() {
      // Spring API 데이터를 Chart.js 형식에 맞게 가공합니다.
      // 실제 API 응답 구조에 따라 이 부분을 수정해야 합니다.
      if (!this.apiData || this.apiData.length === 0) return { labels: [], datasets: [] };

      const labels = this.apiData.map(item => item.name);
      const data = this.apiData.map(item => item.value);

      return {
        labels: labels,
        datasets: [
          {
            label: 'API 데이터셋',
            borderColor: '#4bc0c0',
            data: data,
            // Pie 차트를 위한 추가 설정
          }
        ]
      };
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // 실제 Spring API 엔드포인트로 변경하세요.
        // 예시 데이터 구조: [{ label: '월', value: 10 }, { label: '화', value: 20 }, ...]
        const response = await axios.get('http://localhost:8080/api/pie-data');
        this.apiData = response.data;
        this.loading = false;
      } catch (error) {
        console.error("API 데이터 가져오기 실패:", error);
        this.loading = false;
      }
    },
    changeChartType(type) {
      this.currentChartType = type;
    },
    getBackgroundColor() {
      // 차트 타입별 배경색 설정
      if (this.currentChartType === 'bar' || this.currentChartType === 'line') {
        return '#4bc0c0';
      }
      return undefined;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin: 10px;
  padding: 5px 10px;
}
</style>
