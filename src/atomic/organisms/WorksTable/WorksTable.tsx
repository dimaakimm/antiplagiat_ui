import styles from './WorksTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import React from 'react'
import { getMatchesResp } from '../../../api/projects/projectsApi.ts'

const WorksTable: React.FC<{ data: getMatchesResp[]; isLoading: boolean }> = ({
    data: comparisons,
    isLoading,
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
                                        {pair.firstRepositoryOwner}
                                    </Typography>
                                </td>
                                <td className={styles.studentName}>
                                    <Typography dType="r14">
                                        {pair.secondRepositoryOwner}
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
