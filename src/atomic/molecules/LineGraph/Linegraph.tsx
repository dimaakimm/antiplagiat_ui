import React from 'react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

const Linegraph: React.FC<{ matrix: number[][]; students: string[] }> = ({
    matrix,
    students,
}) => {
    const averages = matrix.map((row, i) => {
        const sum = row.reduce((acc, val, j) => (i !== j ? acc + val : acc), 0)
        return Number((sum / (row.length - 1)).toFixed(2))
    })

    const lineChartOptions: ApexOptions = {
        chart: { type: 'line', foreColor: '#ffffff' },
        xaxis: { categories: students },
        yaxis: {
            title: { text: 'Среднее совпадение (%)' },
            max: 1,
            min: 0,
        },
        dataLabels: { enabled: true },
        title: {
            text: 'Среднее совпадение для каждого студента',
            align: 'center',
        },
    }

    const lineChartSeries: ApexAxisChartSeries = [
        {
            name: 'Среднее совпадение',
            data: averages,
        },
    ]

    return (
        <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={400}
        />
    )
}

export default Linegraph
