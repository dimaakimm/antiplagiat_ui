import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import styles from './Graphics.module.scss'
import { getMatchesResp } from '../../../api/projects/projectsApi.ts'

const Graphics: React.FC<{ data: getMatchesResp[]; isLoading: boolean }> = ({
    data,
    isLoading,
}) => {
    const prepareChartData = () => {
        const allStudents = Array.from(
            new Set(
                data.flatMap((item) => [
                    item.firstRepositoryOwner,
                    item.secondRepositoryOwner,
                ])
            )
        ).sort((a, b) => a.localeCompare(b))
        const matrix: number[][] = Array(allStudents.length)
            .fill(0)
            .map(() => Array(allStudents.length).fill(0))
        data.forEach((item) => {
            const fromIndex = allStudents.indexOf(item.firstRepositoryOwner)
            const toIndex = allStudents.indexOf(item.secondRepositoryOwner)
            matrix[fromIndex][toIndex] = item.percentage
            matrix[toIndex][fromIndex] = item.percentage
        })
        for (let i = 0; i < allStudents.length; i++) {
            matrix[i][i] = 100
        }
        return {
            students: allStudents,
            matrix,
        }
    }

    const { students, matrix } = prepareChartData()
    console.log(data)
    console.log(students)
    console.log(matrix)

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
                        { from: 0, to: 30, color: '#00E396', name: 'Низкое' },
                        { from: 31, to: 70, color: '#FEB019', name: 'Среднее' },
                        {
                            from: 71,
                            to: 100,
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
        <div className={styles.graphicsWrapper}>
            <Chart
                options={options}
                series={series}
                type="heatmap"
                height={600}
                width="100%"
            />
        </div>
    )
}

export default Graphics
