<template>
  <div class="space-y-4">
    <h2 class="text-center text-xl font-medium">緊急度統計</h2>
    <DoughnutChart :chartData="graphData" :options="options" />
  </div>
</template>
<script lang="ts">
  import { DoughnutChart } from 'vue-chart-3';
  import { ChartOptions } from 'chart.js';
  const { stat } = useUrgencyStat();

  export default defineComponent({
    components: { DoughnutChart },
    setup() {
      const graphData = computed(() => ({
        labels: ['小', '中', '大'],
        datasets: [
          {
            data: stat.value as number[],
            backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
            hoverOffset: 4,
          },
        ],
      }));
      const options = ref<ChartOptions<'doughnut'>>({
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      });

      return { graphData, options };
    },
  });
</script>
