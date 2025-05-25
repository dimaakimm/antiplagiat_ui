import styles from './WorksTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import React from 'react'
import { getMatchesResp } from '../../../api/projects/projectsApi.ts'
import { useNavigate } from 'react-router-dom'

const WorksTable: React.FC<{ data: getMatchesResp[]; projectId?: string }> = ({
    data: comparisons,
    projectId,
}) => {
    const navigate = useNavigate()
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
                            <tr
                                key={index}
                                className={styles.tableRow}
                                onClick={() =>
                                    navigate(
                                        `/comparison/${projectId}/${pair.firstRepositoryId}/${pair.secondRepositoryId}`
                                    )
                                }
                            >
                                <td className={styles.studentName}>
                                    <Typography dType="r14">
                                        {pair.firstRepositoryOwner}(
                                        {pair.firstRepositoryId})
                                    </Typography>
                                </td>
                                <td className={styles.studentName}>
                                    <Typography dType="r14">
                                        {pair.secondRepositoryOwner}(
                                        {pair.secondRepositoryId})
                                    </Typography>
                                </td>
                                <td
                                    className={`
                    ${styles.percentageCell}
                    ${pair.percentage > 0.7 ? styles.highMatch : ''}
                    ${pair.percentage < 0.3 ? styles.lowMatch : ''}
                  `}
                                >
                                    <Typography dType="r14">
                                        {pair.percentage}/1
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
