import React, { useState } from 'react'
import styles from './Graphics.module.scss'
import { getMatchesResp } from '../../../api/projects/projectsApi.ts'
import Heatmap from '../../molecules/Heatmap/Heatmap.tsx'
import Linegraph from '../../molecules/LineGraph/Linegraph.tsx'
import Select from '../../atoms/Select/Select.tsx'

const Graphics: React.FC<{ data: getMatchesResp[] }> = ({ data }) => {
    const prepareChartData = () => {
        const allStudents = Array.from(
            new Set(
                data.flatMap((item) => [
                    `${item.firstRepositoryOwner}(${item.firstRepositoryId})`,
                    `${item.secondRepositoryOwner}(${item.secondRepositoryId})`,
                ])
            )
        ).sort((a, b) => a.localeCompare(b))

        const matrix: number[][] = Array(allStudents.length)
            .fill(0)
            .map(() => Array(allStudents.length).fill(0))

        data.forEach((item) => {
            const fromLabel = `${item.firstRepositoryOwner}(${item.firstRepositoryId})`
            const toLabel = `${item.secondRepositoryOwner}(${item.secondRepositoryId})`
            const fromIndex = allStudents.indexOf(fromLabel)
            const toIndex = allStudents.indexOf(toLabel)
            if (fromIndex !== -1 && toIndex !== -1) {
                matrix[fromIndex][toIndex] = item.percentage
                matrix[toIndex][fromIndex] = item.percentage
            }
        })

        for (let i = 0; i < allStudents.length; i++) {
            matrix[i][i] = 1
        }

        return {
            students: allStudents,
            matrix,
        }
    }

    const { students, matrix } = prepareChartData()
    const options = ['Попарное сравнение', 'Среднее совпадение']
    const [graphic, setGraphic] = useState(options[0])

    return (
        <div className={styles.graphicsWrapper}>
            <Select options={options} onChange={setGraphic} value={graphic} />
            {graphic === options[0] && (
                <Heatmap matrix={matrix} students={students} />
            )}
            {graphic === options[1] && (
                <Linegraph matrix={matrix} students={students} />
            )}
        </div>
    )
}

export default Graphics
