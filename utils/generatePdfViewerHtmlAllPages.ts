export function generatePdfViewerHtmlAllPages(base64Pdf: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        html, body { margin:0; padding:0; height:100%; overflow:auto; background:#fff; }
        #pdf-container { width:100%; padding:10px 0; }
        canvas { display:block; margin:10px auto; max-width:100%; box-shadow:0 0 8px rgba(0,0,0,0.2); }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
    </head>
    <body>
      <div id="pdf-container"></div>
      <script>
        const pdfData = atob("${base64Pdf}");
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';
        pdfjsLib.getDocument({data: pdfData}).promise.then(pdf => {
          for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
              const viewport = page.getViewport({ scale: 1.5 });
              const canvas = document.createElement('canvas');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              const ctx = canvas.getContext('2d');
              document.getElementById('pdf-container').appendChild(canvas);
              page.render({ canvasContext: ctx, viewport });
            });
          }
        });
      </script>
    </body>
    </html>
  `;
}
