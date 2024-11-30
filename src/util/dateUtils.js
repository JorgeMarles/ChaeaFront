export const dateFromMsToString = (milliseconds) => {
  const date = new Date(milliseconds)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const dateFromStringToMsUTC = (inputDate) => {
  const date = new Date(inputDate) // Local time Date object
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000) // Convert to UTC
  return utcDate.getTime()
}
