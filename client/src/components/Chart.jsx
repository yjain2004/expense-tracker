import { Doughnut } from "react-chartjs-2";
import "../lib/chartSetup";

function Chart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[260px] flex items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.value),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#EC4899"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E5E7EB"
        }
      }
    }
  };

  return (
    <div className="h-[260px]">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default Chart;
