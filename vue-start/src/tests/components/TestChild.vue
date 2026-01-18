<!-- Chartjs.vue -->
<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'; // 'chart.js/auto'는 모든 구성 요소를 자동으로 등록합니다.

export default {
  name: 'Chartjs',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartType: {
      type: String,
      required: true,
      default: 'line'
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    // props의 chartData 변경을 감지하여 차트를 업데이트합니다.
    chartData: {
      handler(newData) {
        if (this.chartInstance) {
          this.chartInstance.data = newData;
          this.chartInstance.update(); // 차트 갱신.
        } else {
          this.renderChart();
        }
      },
      deep: true // 객체 내부 변경도 감지
    },
    chartType() {
      // 차트 타입 변경 시, 기존 차트를 파괴하고 새로 그립니다.
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.renderChart();
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  },
  beforeDestroy() {
    // 컴포넌트 파괴 전, 차트 인스턴스 파괴.
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 400px;
  width: 600px;
}
</style>