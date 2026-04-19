import React, { useState } from 'react';
import {
    exportToJSON,
    exportToCSV,
    exportToXML,
    exportToExcel,
    exportToODS,
    exportToYAML,
    exportToSQL,
    exportToMarkdown,
    exportToJSONL,
    exportToText,
    importFromJSON,
    importFromCSV,
    importFromXML,
    importFromExcel,
    importFromYAML,
    importFromJSONL,
    importFromText,
    importFromMD
} from '../../services/importExportService';
import './ImportExport.css';

const ImportExport = () => {
    const [exportStatus, setExportStatus] = useState('');
    const [importStatus, setImportStatus] = useState('');
    const [importFormat, setImportFormat] = useState('json');
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activityLog, setActivityLog] = useState([]);

    const addLog = (message, type) => {
        const time = new Date().toLocaleTimeString();
        setActivityLog(prev => [{ id: Date.now(), time, message, type }, ...prev].slice(0, 5));
    };

    const handleExport = async (format) => {
        setIsExporting(true);
        setExportStatus('');
        try {
            let count;
            if (format === 'json') count = await exportToJSON();
            else if (format === 'csv') count = await exportToCSV();
            else if (format === 'xml') count = await exportToXML();
            else if (format === 'xlsx') count = await exportToExcel();
            else if (format === 'ods') count = await exportToODS();
            else if (format === 'yaml') count = await exportToYAML();
            else if (format === 'sql') count = await exportToSQL();
            else if (format === 'md') count = await exportToMarkdown();
            else if (format === 'jsonl') count = await exportToJSONL();
            else if (format === 'txt') count = await exportToText();
            const msgSuccess = `✅ ${count} opiniones exportadas como ${format.toUpperCase()}`;
            setExportStatus({ type: 'success', msg: msgSuccess });
            addLog(msgSuccess, 'success');
        } catch (err) {
            const msgError = `❌ Error al exportar: ${err.message}`;
            setExportStatus({ type: 'error', msg: msgError });
            addLog(msgError, 'error');
        } finally {
            setIsExporting(false);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) {
            setImportStatus({ type: 'error', msg: '❌ Por favor selecciona un archivo primero.' });
            return;
        }
        setIsImporting(true);
        setImportStatus('');
        try {
            let count;
            if (importFormat === 'json') count = await importFromJSON(selectedFile);
            else if (importFormat === 'csv') count = await importFromCSV(selectedFile);
            else if (importFormat === 'xml') count = await importFromXML(selectedFile);
            else if (importFormat === 'xlsx' || importFormat === 'ods') count = await importFromExcel(selectedFile);
            else if (importFormat === 'yaml') count = await importFromYAML(selectedFile);
            else if (importFormat === 'jsonl') count = await importFromJSONL(selectedFile);
            else if (importFormat === 'md') count = await importFromMD(selectedFile);
            else if (importFormat === 'txt') count = await importFromText(selectedFile);
            const msgSuccess = `✅ ${count} opiniones importadas correctamente a Firebase.`;
            setImportStatus({ type: 'success', msg: msgSuccess });
            addLog(msgSuccess, 'success');
            setSelectedFile(null);
            document.getElementById('file-input').value = '';
        } catch (err) {
            const msgError = `❌ ${err.message}`;
            setImportStatus({ type: 'error', msg: msgError });
            addLog(msgError, 'error');
        } finally {
            setIsImporting(false);
        }
    };

    const formatBtns = [
        { key: 'json', label: 'JSON', icon: '{ }' },
        { key: 'csv', label: 'CSV', icon: '⊞' },
        { key: 'xml', label: 'XML', icon: '<>' },
        { key: 'xlsx', label: 'Excel', icon: '📊' },
        { key: 'ods', label: 'Calc', icon: '📋' },
        { key: 'yaml', label: 'YAML', icon: '📜' },
        { key: 'sql', label: 'SQL', icon: '🗄️' },
        { key: 'md', label: 'MD', icon: 'M↓' },
        { key: 'jsonl', label: 'JSONL', icon: 'L' },
        { key: 'txt', label: 'Texto', icon: 'T' },
    ];

    const importableFormats = formatBtns.filter(f => f.key !== 'sql');

    return (
        <section className="ie-section">
            <div className="ie-bg-gradient" />
            <div className="container">
                {/* Header */}
                <div className="ie-header reveal">
                    <span className="ie-badge">Firebase Sync</span>
                    <h1 className="ie-title">Importar &amp; Exportar Datos</h1>
                    <p className="ie-subtitle">
                        Descarga las opiniones de Wanderlust en múltiples formatos o importa nuevas reseñas directamente a Firebase.
                    </p>
                </div>

                <div className="ie-grid">
                    {/* ─── EXPORT ─── */}
                    <div className="ie-card glass-card reveal">
                        <div className="ie-card-icon export-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </div>
                        <h2 className="ie-card-title">Exportar</h2>
                        <p className="ie-card-desc">
                            Descarga todas las opiniones almacenadas en Firebase en el formato que necesites.
                        </p>
                        <div className="ie-format-buttons">
                            {formatBtns.map(({ key, label, icon }) => (
                                <button
                                    key={key}
                                    className={`ie-format-btn ${key}`}
                                    onClick={() => handleExport(key)}
                                    disabled={isExporting}
                                >
                                    <span className="btn-icon">{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                        {exportStatus && (
                            <div className={`ie-status ${exportStatus.type}`}>
                                {exportStatus.msg}
                            </div>
                        )}
                        {isExporting && <div className="ie-spinner" />}
                        <div className="ie-samples">
                            <p className="ie-samples-title">📁 Archivos de muestra:</p>
                            <div className="ie-samples-links">
                                <a href="/samples/datos.json" download className="sample-link json">datos.json</a>
                                <a href="/samples/datos.csv" download className="sample-link csv">datos.csv</a>
                                <a href="/samples/datos.xml" download className="sample-link xml">datos.xml</a>
                                <a href="/samples/datos.xlsx" download className="sample-link xlsx">datos.xlsx</a>
                                <a href="/samples/datos.ods" download className="sample-link ods">datos.ods</a>
                                <a href="/samples/datos.yaml" download className="sample-link yaml">datos.yaml</a>
                                <a href="/samples/datos.md" download className="sample-link md">datos.md</a>
                                <a href="/samples/datos.jsonl" download className="sample-link jsonl">datos.jsonl</a>
                                <a href="/samples/datos.txt" download className="sample-link txt">datos.txt</a>
                            </div>
                        </div>
                    </div>

                    {/* ─── IMPORT ─── */}
                    <div className="ie-card glass-card reveal">
                        <div className="ie-card-icon import-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <h2 className="ie-card-title">Importar</h2>
                        <p className="ie-card-desc">
                            Sube un archivo de opiniones y se guardarán automáticamente en Firebase. Usa los archivos de muestra como referencia.
                        </p>

                        <div className="ie-import-controls">
                            <label className="ie-label">Formato del archivo</label>
                            <div className="ie-format-selector">
                                {importableFormats.map(({ key, label }) => (
                                    <label key={key} className={`ie-radio-label ${importFormat === key ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="format"
                                            value={key}
                                            checked={importFormat === key}
                                            onChange={() => setImportFormat(key)}
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>

                            <label className="ie-label" htmlFor="file-input">Seleccionar archivo</label>
                            <div className={`ie-dropzone ${selectedFile ? 'has-file' : ''}`}>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept={`.${importFormat}`}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setSelectedFile(file || null);
                                        if (file && file.name) {
                                            const ext = file.name.split('.').pop().toLowerCase();
                                            const extMap = {
                                                'yml': 'yaml',
                                                'markdown': 'md',
                                                'jsonlines': 'jsonl',
                                            };
                                            const mappedExt = extMap[ext] || ext;

                                            // Check if it's a valid format
                                            if (importableFormats.some(f => f.key === mappedExt)) {
                                                setImportFormat(mappedExt);
                                            }
                                        }
                                    }}
                                />
                                {selectedFile ? (
                                    <span className="ie-filename">📄 {selectedFile.name}</span>
                                ) : (
                                    <span className="ie-placeholder">Haz clic o arrastra un archivo .{importFormat}</span>
                                )}
                            </div>

                            <button
                                className="ie-import-btn"
                                onClick={handleImport}
                                disabled={isImporting || !selectedFile}
                            >
                                {isImporting ? 'Importando…' : 'Importar a Firebase'}
                            </button>
                        </div>

                        {importStatus && (
                            <div className={`ie-status ${importStatus.type}`}>
                                {importStatus.msg}
                            </div>
                        )}
                        {isImporting && <div className="ie-spinner" />}
                    </div>
                </div>

                {/* Info banner */}
                <div className="ie-info-banner reveal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span>Los datos importados se guardan en la colección <strong>opiniones</strong> de Firebase Firestore y aparecerán de inmediato en el foro de la página principal.</span>
                </div>

                {/* Activity Log */}
                <div className="ie-activity-log reveal">
                    <h3>Registro de Actividad</h3>
                    {activityLog.length > 0 ? (
                        <ul className="ie-log-list">
                            {activityLog.map(log => (
                                <li key={log.id} className={`ie-log-item ${log.type}`}>
                                    <span className="log-time">{log.time}</span>
                                    <span className="log-message">{log.message}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-activity">Aún no hay actividad reciente.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ImportExport;
