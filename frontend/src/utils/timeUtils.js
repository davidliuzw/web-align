export const getCurrentDateTime = () => {
  const currentDateTime = new Date()
  const year = currentDateTime.getFullYear()
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0')
  const day = String(currentDateTime.getDate()).padStart(2, '0')
  const hours = String(currentDateTime.getHours()).padStart(2, '0')
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0')
  const seconds = String(currentDateTime.getSeconds()).padStart(2, '0')

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDateTime
}

export const parseResponseTime = (dateString) => {
  const parsedDate = new Date(dateString)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  const hours = String(parsedDate.getHours()).padStart(2, '0')
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0')
  const seconds = String(parsedDate.getSeconds()).padStart(2, '0')

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDateTime
}
