import styles from './DetailedComparison.module.scss'
import { useGetSuspiciousFileQuery } from '../../../api/projects/projectsApi.ts'
import React, { useState } from 'react'
import Typography from '../../atoms/Typography/Typography.tsx'

interface FirstRepositoryProps {
    firstRepositoryId: string
    secondRepositoryId: string
    files: { id: string; name: string }[]
}

const DetailedComparison: React.FC<FirstRepositoryProps> = ({
    firstRepositoryId,
    secondRepositoryId,
    files,
}) => {
    const [selectedFileId, setSelectedFileId] = useState<string>('')

    const { data: res } = useGetSuspiciousFileQuery({
        fileId: selectedFileId,
        firstRepositoryId,
        secondRepositoryId,
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFileId(e.target.value)
    }

    return (
        <div className={styles.graphicsWrapper}>
            {files.length > 0 && (
                <select
                    className={styles.select}
                    value={selectedFileId}
                    onChange={handleChange}
                >
                    <option value="" disabled hidden>
                        -- выберите файл --
                    </option>
                    {files.map((file) => (
                        <option key={file.id} value={file.id}>
                            {file.name}
                        </option>
                    ))}
                </select>
            )}
            {files.length === 0 && (
                <Typography dType="r32">
                    Подозрительные файлы не обнаружены
                </Typography>
            )}
            <div className={styles.container}>
                {res &&
                    res.map((match) => (
                        <div key={match.id} className={styles.matchBlock}>
                            <div className={styles.fileHeader}>
                                <Typography
                                    dType="r20"
                                    className={styles.fileName}
                                >
                                    {match.firstFileName}
                                </Typography>

                                <Typography
                                    dType="r20"
                                    className={styles.fileName}
                                >
                                    {match.secondFileName}
                                </Typography>
                                <Typography
                                    dType="r16"
                                    className={
                                        Number(match.percentage) > 0.3
                                            ? styles.highMatch
                                            : styles.lowMatch
                                    }
                                >
                                    Совпадение:{' '}
                                    {(Number(match.percentage) * 100).toFixed(
                                        0
                                    )}
                                    %
                                </Typography>
                            </div>

                            {match.tiles.length === 0 ? (
                                <Typography
                                    dType="r14"
                                    className={styles.noMatch}
                                >
                                    Совпадения не найдены
                                </Typography>
                            ) : (
                                <div className={styles.tilesGrid}>
                                    {match.tiles.map((tile, idx) => (
                                        <div key={idx} className={styles.tile}>
                                            <div className={styles.tileSection}>
                                                <Typography
                                                    dType="r14"
                                                    className={styles.tileLabel}
                                                >
                                                    {match.firstFileName} [
                                                    {tile.startLineInFirstFile}{' '}
                                                    - {tile.endLineInFirstFile}]
                                                </Typography>
                                                <pre className={styles.code}>
                                                    {tile.textInFirstFile}
                                                </pre>
                                            </div>
                                            <div className={styles.tileSection}>
                                                <Typography
                                                    dType="r14"
                                                    className={styles.tileLabel}
                                                >
                                                    {match.secondFileName} [
                                                    {tile.startLineInFirstFile}{' '}
                                                    - {tile.endLineInSecondFile}
                                                    ]
                                                </Typography>
                                                <pre className={styles.code}>
                                                    {tile.textInSecondFile}
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DetailedComparison
