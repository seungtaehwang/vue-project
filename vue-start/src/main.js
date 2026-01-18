import './assets/main.css'
import 'realgrid/dist/realgrid-style.css';

import { createApp } from 'vue'
import App from './App.vue'
import RealGrid from "realgrid";
import AppTest from './App-Test.vue'
import DrawChartjs from './App-Spring-Chartjs.vue'
import DrawEChart from './App-Spring-EChart.vue'
import UGrid from './UGrid.vue';

// .env에서 불러오기 (권장)
RealGrid.setLicenseKey("upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiMnVeQKUHJDjW2y71jtk+wte7L7C4dZzvM1GnN1YHcwJAYKsAhfloMo1oBnIcZWP/2+Csy6UNAyp+Wn91CZiXNpDtgxC3I6zpA==");

const app = createApp(App);
app.mount("#app");

//createApp(App).mount('#app')
createApp(UGrid).mount('#app') 