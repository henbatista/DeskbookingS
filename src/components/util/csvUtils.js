export function exportCSV(data, headers, filename) {
  const csvContent = createCSVContent(data, headers)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

function createCSVContent(data, headers) {
  const headerRow = headers.join(',')
  const dataRows = data.map(item => headers.map(key => item[key]).join(','))
  return `${headerRow}\n${dataRows.join('\n')}`
}
