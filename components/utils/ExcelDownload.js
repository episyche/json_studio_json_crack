export const ExcelDownload = (htmlElement) => {

    if (htmlElement) {
        var border_template = htmlElement.replaceAll(/border: 0.2px/g, "border:2px").replaceAll(`<tr class=""></tr>`,"")
        var location = 'data:application/vnd.ms-excel;base64,';
        var excelTemplate = '<html> ' +
            '<head> ' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
            '<link rel="alternate" hrefLang="en" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">' +
            '</head> ' +
            '<body class="display:none"> ' +
            border_template +
            '</body> ' +
            '</html>'

        window.location.href = location + window.btoa(excelTemplate);
    }

}