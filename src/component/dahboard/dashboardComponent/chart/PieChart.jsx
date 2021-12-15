import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    return  (
        <Pie 
            data={{ 
                labels: [
                    'Refrigerator',
                    'Freezer',
                    'Washing Machine',
                    'Drum Washing Machine',
                    'Home Air Conditioner',
                    'Commercial AC',
                    'TV',
                    'Water Heater',
                    'Small Applicances',
                    'Cooking'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            }}

            options={{ 
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Product',
                        font: {
                            size: 27
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'rgb(255, 99, 132)',
                            padding: 30
                        }
                    }
                },
                maintainAspectRatio: false
            }}

            height={ 375 }
        />
    )
}

export default PieChart;