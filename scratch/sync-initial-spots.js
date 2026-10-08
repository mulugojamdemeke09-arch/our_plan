const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const targetPath = path.join(__dirname, '..', 'lib', 'data', 'initial-spots.ts');

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const spots = db.spots;

const tsContent = `import { DateSpot } from '../types';

export const INITIAL_SPOTS: DateSpot[] = ${JSON.stringify(spots, null, 2)};
`;

fs.writeFileSync(targetPath, tsContent, 'utf8');
console.log('Successfully wrote', spots.length, 'spots into', targetPath);
