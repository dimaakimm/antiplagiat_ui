import React from 'react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

const Heatmap: React.FC<{ matrix: number[][]; students: string[] }> = ({
    matrix,
    students,
}) => {
    const options: ApexOptions = {
        chart: {
            type: 'heatmap',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
            },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: 0.3, color: '#00E396', name: 'Низкое' },
                        {
                            from: 0.31,
                            to: 0.7,
                            color: '#FEB019',
                            name: 'Среднее',
                        },
                        {
                            from: 0.71,
                            to: 1,
                            color: '#FF4560',
                            name: 'Высокое',
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px',
                colors: ['#000'],
            },
        },
        xaxis: {
            type: 'category',
            categories: students,
            labels: {
                rotate: -45,
                style: {
                    fontSize: '10px',
                    colors: '#ffffff',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '10px',
                },
            },
        },
        legend: {
            fontSize: '14px',
            labels: {
                colors: '#ffffff',
                useSeriesColors: false,
            },
        },
        tooltip: {
            enabled: true,
            custom: function ({
                seriesIndex,
                dataPointIndex,
            }: {
                seriesIndex: number
                dataPointIndex: number
            }) {
                return `<div class="apexcharts-tooltip">
          <div>${students[seriesIndex]} vs ${students[dataPointIndex]}</div>
          <div>Совпадение: ${matrix[seriesIndex][dataPointIndex]}%</div>
        </div>`
            },
        },
    }

    const series: ApexAxisChartSeries = students.map((student, index) => ({
        name: student,
        data: matrix[index].map((value, i) => ({
            x: students[i],
            y: value,
        })),
    }))
    return (
        <Chart
            options={options}
            series={series}
            type="heatmap"
            height={600}
            width="100%"
        />
    )
}

export default Heatmap
