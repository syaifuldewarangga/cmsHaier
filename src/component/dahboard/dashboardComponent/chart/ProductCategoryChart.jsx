import React from 'react'
import { Bar } from 'react-chartjs-2'

function ProductCategoryChart(props) {
    return (
        <Bar 
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
                    label: 'Total Product by Category',
                    data: [
                            props.data['Refrigerator'], 
                            props.data['Freezer'], 
                            props.data['Washing Machine'], 
                            props.data['Drum Washing Machine'], 
                            props.data['Home Air Conditioner'],
                            props.data['Commercial AC'],
                            props.data['TV'],
                            props.data['Water Heater'], 
                            props.data['Small Applicances'], 
                            props.data['Cooking']
                        ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }} 
            options={{ 
                // responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Product by Category',
                        font: {
                          size: 27
                        }
                    },
                    legend: {
                        display: false,
                        // position: 'bottom',
                    },
                },
            }} 

            height={100}
        />
    )
}

export default ProductCategoryChart
