import styles from './WorksTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import React from 'react'

interface Comparison {
    from: string
    to: string
    percentage: number
}

const WorksTable: React.FC<{ data: Comparison[] }> = ({
    data: comparisons,
}) => {
    return (
        <div className={styles.worksTableWrapper}>
            <h2>Попарное сравнение работ учеников</h2>
            <div className={styles.tableContainer}>
                <table className={styles.comparisonTable}>
                    <thead>
                        <tr>
                            <th>
                                <Typography dType="r14">Ученик 1</Typography>
                            </th>
                            <th>
                                <Typography dType="r14">Ученик 2</Typography>
                            </th>
                            <th>
                                <Typography dType="r14">Совпадение</Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisons.map((pair, index) => (
                            <tr key={index} className={styles.tableRow}>
                                <td className={styles.studentName}>
                                    <Typography dType="r14">
                                        {pair.from}
                                    </Typography>
                                </td>
                                <td className={styles.studentName}>
                                    <Typography dType="r14">
                                        {pair.to}
                                    </Typography>
                                </td>
                                <td
                                    className={`
                    ${styles.percentageCell}
                    ${pair.percentage > 70 ? styles.highMatch : ''}
                    ${pair.percentage < 30 ? styles.lowMatch : ''}
                  `}
                                >
                                    <Typography dType="r14">
                                        {pair.percentage}%
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WorksTable
