// extractContext.js
const fs = require('fs');
const path = require('path');

// Directorios de componentes y configuraciones
const directories = ['src/components', './']; // Puedes agregar otros directorios si es necesario

// Tipos de archivo a incluir en el resumen
const configFiles = ['tailwind.config.js', 'tsconfig.json', 'package.json'];
const componentExtension = '.tsx';

// Función para recorrer los directorios y extraer información
function extractContext(dir) {
  let context = [];

  // Leer los archivos y carpetas en el directorio actual
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursivamente recorrer los subdirectorios
      context = context.concat(extractContext(filePath));
    } else {
      // Verificar si el archivo es un componente o un archivo de configuración
      const isComponent = file.endsWith(componentExtension);
      const isConfig = configFiles.includes(file);

      if (isComponent || isConfig) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        const exportMatches = fileContent.match(/export\s+(default\s+)?(const|function|class)\s+(\w+)/g) || [];

        context.push({
          type: isComponent ? 'Component' : 'Config',
          fileName: file,
          path: filePath,
          exports: exportMatches.map(match => match.split(' ').pop()), // Obtener nombres de exportaciones
        });
      }
    }
  });

  return context;
}

// Extraer contexto de los directorios especificados
let projectContext = [];
directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    projectContext = projectContext.concat(extractContext(dir));
  }
});

// Guardar el resultado en un archivo JSON
fs.writeFileSync('projectContext.json', JSON.stringify(projectContext, null, 2));
console.log('Contexto del proyecto guardado en projectContext.json');
