<!-- EChart.vue -->
<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, watch } from 'vue';

const chartContainer = ref(null);
let chartInstance = null;

// props 정의: 부모로부터 새로운 데이터를 받을 prop
const props = defineProps({
    chartData: {
        type: Array,
        required: true
    },
    chartType: {
        type: String,
        default: 'bar'  
    },
    chartTitle: {
        type: String,
        default: '주간 판매량'  
    },
    legendData: {
        type: Array,
    }

});

// 차트 초기화 함수
const initChart = () => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value);
    updateChart();
  }
};

// 차트 데이터 업데이트 함수 (부모에서 호출될 메서드)
const updateChart = () => {

  if (chartInstance) {
    if (!props.chartData || props.chartData.length === 0) {
      console.warn('차트 데이터가 없습니다.');
      return;
    }
    if (props.chartType !== 'bar' && props.chartType !== 'line' && props.chartType !== 'pie' && props.chartType !== 'scatter') {
      console.warn('지원되지 않는 차트 타입입니다:', props.chartType);
      return;
    }

    chartInstance.clear(); // 기존 차트 초기화
    if (props.chartType === 'bar') {
        const options = {
        title: {
            text: props.chartTitle
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: props.chartData.categories // props로 받은 데이터 사용
        },
        yAxis: {},
        series: [{
            name: '판매량',
            type: props.chartType,
            data: props.chartData.yvalue // props로 받은 데이터 사용
        }]
        };
        chartInstance.setOption(options);
    } else if (props.chartType === 'line') {
        const options = {
            title: {
            text: props.chartTitle
            },
            tooltip: {},
            xAxis: {
            type: 'category',
            data: props.chartData.categories // props로 받은 데이터 사용
            },
            yAxis: {
                type: 'value'
            },
            series: [{
            name: '주간 판매량',
            type: props.chartType,
            data: props.chartData.yvalue 
            }]
        };
        chartInstance.setOption(options);
    } else if (props.chartType === 'pie') {
        const lgData = [...new Set(props.chartData.map(item => item.name))];

        const options = {
            title: {
            text: props.chartTitle,
            left: 'center',
            },
            tooltip: {
            },
            legend: {
            orient: 'vertical',
            left: 'left',
            data: lgData, // 데이터의 이름으로 범례 설정
            },
            series: [
            {
                name: '소스별 방문자수',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: props.chartData, // 전달받은 데이터 사용
                emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
                },
            },
            ]

        };
        chartInstance.setOption(options);
    } else if (props.chartType === 'scatter') {
        const lgData = [...new Set(props.chartData.map(item => item.name))];
        const options = {
            title: {
            text: props.chartTitle
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.seriesName}<br/>X: ${params.value[0]}<br/>Y: ${params.value[1]}`;
                },
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: 'bottom',
                data: lgData
            },
            xAxis: {
                type: 'value',
                scale: true
            },
            yAxis: {
                type: 'value',
                scale: true
            },
            series: props.chartData.map(series => ({
            name: series.name,
            type: 'scatter',
            data: series.data,
            })),
        };
        chartInstance.setOption(options);
    }
  }
};

onMounted(() => {
  initChart();
});

// `props.chartData` 변경을 감지하여 차트 업데이트 (선택사항)
watch(() => props.chartData, () => {
  updateChart();
});

// 부모 컴포넌트에서 `updateChart` 메서드를 직접 호출할 수 있도록 노출
defineExpose({
  updateChart
});
</script>
