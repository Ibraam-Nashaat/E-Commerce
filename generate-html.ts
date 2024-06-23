import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import * as swaggerUiDist from 'swagger-ui-dist';

const swaggerFile = resolve(__dirname, 'swagger-spec.json');
const outputDir = resolve(__dirname, 'public');

function generateSwaggerHtml() {
  const swaggerJson = readFileSync(swaggerFile, 'utf8');
  const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  // Copy Swagger UI files
  copyFileSync(join(swaggerUiPath, 'swagger-ui.css'), join(outputDir, 'swagger-ui.css'));
  copyFileSync(join(swaggerUiPath, 'swagger-ui-bundle.js'), join(outputDir, 'swagger-ui-bundle.js'));
  copyFileSync(join(swaggerUiPath, 'swagger-ui-standalone-preset.js'), join(outputDir, 'swagger-ui-standalone-preset.js'));

  // Generate index.html
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation</title>
  <link rel="stylesheet" href="swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="swagger-ui-bundle.js"></script>
  <script src="swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: 'swagger-spec.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>`;
  writeFileSync(join(outputDir, 'index.html'), htmlContent);
  writeFileSync(join(outputDir, 'swagger-spec.json'), swaggerJson);
}

generateSwaggerHtml();
