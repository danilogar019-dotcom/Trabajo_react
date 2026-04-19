import * as XLSX from 'xlsx';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const data = [
  {
    nombre: "Juan Pérez",
    titulo: "Increíble viaje",
    comentario: "Todo estuvo perfecto, la organización impecable.",
    estrellas: 5,
    fecha: "2024-04-15",
    likes: 12
  },
  {
    nombre: "Maria Garcia",
    titulo: "Vistas espectaculares",
    comentario: "El destino superó mis expectativas.",
    estrellas: 5,
    fecha: "2024-04-16",
    likes: 8
  }
];

const samplesDir = './public/samples';

// Create YAML
const yamlContent = yaml.dump(data);
fs.writeFileSync(path.join(samplesDir, 'datos.yaml'), yamlContent);
console.log('Created datos.yaml');

// Create Excel (XLSX)
const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Opiniones");
XLSX.writeFile(workbook, path.join(samplesDir, 'datos.xlsx'));
console.log('Created datos.xlsx');

// Create ODS
XLSX.writeFile(workbook, path.join(samplesDir, 'datos.ods'), { bookType: 'ods' });
console.log('Created datos.ods');
