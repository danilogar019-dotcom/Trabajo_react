import { getOpiniones, addOpinionesBatch } from './dbUtils';


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
