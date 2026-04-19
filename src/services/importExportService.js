import { getOpiniones, addOpinionesBatch } from './dbUtils';
import * as XLSX from 'xlsx';
import yaml from 'js-yaml';

const triggerDownload = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const cleanOpinion = (op) => ({
    nombre: op.nombre || '',
    titulo: op.titulo || '',
    comentario: op.comentario || '',
    estrellas: op.estrellas || 5,
    fecha: op.fecha || '',
    likes: op.likes || 0,
});

export const exportToJSON = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    triggerDownload(JSON.stringify(data, null, 2), 'datos.json', 'application/json');
    return data.length;
};

export const exportToCSV = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const headers = ['nombre', 'titulo', 'comentario', 'estrellas', 'fecha', 'likes'];
    const rows = data.map(op =>
        headers.map(h => `"${String(op[h]).replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\r\n');
    triggerDownload(csv, 'datos.csv', 'text/csv;charset=utf-8;');
    return data.length;
};

export const exportToXML = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const escape = (str) =>
        String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    const items = data.map(op => `
  <opinion>
    <nombre>${escape(op.nombre)}</nombre>
    <titulo>${escape(op.titulo)}</titulo>
    <comentario>${escape(op.comentario)}</comentario>
    <estrellas>${op.estrellas}</estrellas>
    <fecha>${escape(op.fecha)}</fecha>
    <likes>${op.likes}</likes>
  </opinion>`).join('');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<opiniones>${items}\n</opiniones>`;
    triggerDownload(xml, 'datos.xml', 'application/xml');
    return data.length;
};

// --- NEW FORMATS ---

export const exportToExcel = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Opiniones");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    triggerDownload(new Blob([excelBuffer]), 'datos.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return data.length;
};

export const exportToODS = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Opiniones");
    const odsBuffer = XLSX.write(workbook, { bookType: 'ods', type: 'array' });
    triggerDownload(new Blob([odsBuffer]), 'datos.ods', 'application/vnd.oasis.opendocument.spreadsheet');
    return data.length;
};

export const exportToYAML = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const yamlContent = yaml.dump(data);
    triggerDownload(yamlContent, 'datos.yaml', 'application/x-yaml');
    return data.length;
};

export const exportToSQL = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const sql = data.map(op => {
        const values = [
            `'${op.nombre.replace(/'/g, "''")}'`,
            `'${op.titulo.replace(/'/g, "''")}'`,
            `'${op.comentario.replace(/'/g, "''")}'`,
            op.estrellas,
            `'${op.fecha}'`,
            op.likes
        ].join(', ');
        return `INSERT INTO opiniones (nombre, titulo, comentario, estrellas, fecha, likes) VALUES (${values});`;
    }).join('\n');
    triggerDownload(sql, 'datos.sql', 'application/sql');
    return data.length;
};

export const exportToMarkdown = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const headers = ['Nombre', 'Título', 'Comentario', 'Estrellas', 'Fecha', 'Likes'];
    const separator = headers.map(() => '---').join(' | ');
    const rows = data.map(op => 
        `| ${op.nombre} | ${op.titulo} | ${op.comentario.replace(/\n/g, ' ')} | ${op.estrellas} | ${op.fecha} | ${op.likes} |`
    ).join('\n');
    const md = `# Opiniones de Wanderlust Travels\n\n| ${headers.join(' | ')} |\n| ${separator} |\n${rows}`;
    triggerDownload(md, 'datos.md', 'text/markdown');
    return data.length;
};

export const exportToJSONL = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const jsonl = data.map(op => JSON.stringify(op)).join('\n');
    triggerDownload(jsonl, 'datos.jsonl', 'application/x-jsonlines');
    return data.length;
};

export const exportToText = async () => {
    const opiniones = await getOpiniones();
    const data = opiniones.map(cleanOpinion);
    const txt = data.map(op => `
=========================================
USUARIO: ${op.nombre}
TÍTULO: ${op.titulo}
OPINIÓN: ${op.comentario}
CALIFICACIÓN: ${op.estrellas} estrellas
FECHA: ${op.fecha}
LIKES: ${op.likes}
=========================================
`).join('\n');
    triggerDownload(txt, 'datos.txt', 'text/plain');
    return data.length;
};

// --- IMPORT FUNCTIONS ---

export const importFromJSON = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                const list = Array.isArray(parsed) ? parsed : [parsed];
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato JSON inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};

export const importFromCSV = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const lines = e.target.result.trim().split(/\r?\n/);
                const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
                const list = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.replace(/^"|"$/g, ''));
                    const obj = {};
                    headers.forEach((h, i) => { obj[h] = values[i] ?? ''; });
                    return obj;
                });
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato CSV inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};

export const importFromXML = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(e.target.result, 'application/xml');
                const items = Array.from(xmlDoc.querySelectorAll('opinion'));
                if (items.length === 0) throw new Error('No se encontraron elementos <opinion>');
                const getText = (el, tag) => el.querySelector(tag)?.textContent || '';
                const list = items.map(item => ({
                    nombre: getText(item, 'nombre'),
                    titulo: getText(item, 'titulo'),
                    comentario: getText(item, 'comentario'),
                    estrellas: Number(getText(item, 'estrellas')) || 5,
                    fecha: getText(item, 'fecha'),
                    likes: Number(getText(item, 'likes')) || 0,
                }));
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato XML inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};

export const importFromExcel = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const list = XLSX.utils.sheet_to_json(worksheet);
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato Excel/ODS inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsArrayBuffer(file);
    });
};

export const importFromYAML = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const list = yaml.load(e.target.result);
                const dataArray = Array.isArray(list) ? list : [list];
                const ids = await addOpinionesBatch(dataArray);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato YAML inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};

export const importFromJSONL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const lines = e.target.result.trim().split(/\r?\n/);
                const list = lines.map(line => JSON.parse(line));
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato JSONL inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};

export const importFromText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const sections = e.target.result.split(/={10,}/);
                const list = [];
                sections.forEach(sec => {
                    const lines = sec.trim().split('\n');
                    if (lines.length < 3) return;
                    const op = {};
                    lines.forEach(line => {
                        if (line.includes('USUARIO:')) op.nombre = line.split('USUARIO:')[1].trim();
                        if (line.includes('TÍTULO:')) op.titulo = line.split('TÍTULO:')[1].trim();
                        if (line.includes('OPINIÓN:')) op.comentario = line.split('OPINIÓN:')[1].trim();
                        if (line.includes('CALIFICACIÓN:')) op.estrellas = parseInt(line.split('CALIFICACIÓN:')[1].trim()) || 5;
                        if (line.includes('FECHA:')) op.fecha = line.split('FECHA:')[1].trim();
                        if (line.includes('LIKES:')) op.likes = parseInt(line.split('LIKES:')[1].trim()) || 0;
                    });
                    if (op.nombre) list.push(op);
                });
                const ids = await addOpinionesBatch(list);
                resolve(ids.length);
            } catch (err) {
                reject(new Error('Formato TXT inválido: ' + err.message));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
};
