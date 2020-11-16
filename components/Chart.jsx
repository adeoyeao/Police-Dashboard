import styles from "../styles/components/chart.module.scss"
import { Bar } from "react-chartjs-2"
import { useSelector } from "react-redux"

const Chart = (props) => {

      const data = {
            labels: props.labels,
            datasets: [
                  {
                        label: props.name,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99 ,132, 1)",
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: props.dataset
                  }
            ]
      };

      return (
            <div className={styles.chart}>
                  <Bar data={data} options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                              xAxes:[{
                                    ticks: {
                                          display: false
                                    }
                              }]
                        }
                        }}/>
            </div>
      )
}

export default Chart