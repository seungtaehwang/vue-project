<template>
  <div style="padding: 20px; width: 800px;">
    <h3>RealGrid Vue 3 예제</h3>
    <div id="realgrid" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { GridView, LocalDataProvider } from 'realgrid';
import 'realgrid/dist/realgrid-style.css'; // 기본 스타일 임포트

// 그리드 인스턴스를 저장할 변수
let gridView = null;
let dataProvider = null;

// 컬럼 설정
const columns = [
  { name: "Name", fieldName: "Name", width: "100", header: { text: "이름" } },
  { name: "Age", fieldName: "Age", width: "50", header: { text: "나이" } },
  { name: "Gender", fieldName: "Gender", width: "80", header: { text: "성별" } }
];

// 필드 설정 (데이터 구조)
const fields = [
  { fieldName: "Name", dataType: "text" },
  { fieldName: "Age", dataType: "number" },
  { fieldName: "Gender", dataType: "text" }
];

// 샘플 데이터
const rows = [
  { Name: "홍길동", Age: 30, Gender: "남" },
  { Name: "이순신", Age: 45, Gender: "남" },
  { Name: "유관순", Age: 18, Gender: "여" }
];

onMounted(() => {
  // 1. DataProvider 생성
  dataProvider = new LocalDataProvider(false);
  
  // 2. GridView 생성
  gridView = new GridView("realgrid");
  
  // 3. 연결
  gridView.setDataSource(dataProvider);
  
  // 4. 필드 및 컬럼 적용
  dataProvider.setFields(fields);
  gridView.setColumns(columns);
  
  // 5. 데이터 채우기
  dataProvider.setRows(rows);
});

// 컴포넌트 해제 시 그리드 인스턴스 정리 (메모리 누수 방지)
onBeforeUnmount(() => {
  if (gridView) {
    gridView.destroy();
    dataProvider.destroy();
    gridView = null;
    dataProvider = null;
  }
});
</script>

<style scoped>
/* 그리드 컨테이너 스타일링 */
#realgrid {
  border: 1px solid #ddd;
}
</style>
