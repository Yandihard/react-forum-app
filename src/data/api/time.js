export function postedAt (date) {
  const now = new Date()
  const created = new Date(date)

  const diff = now - created

  const day = Math.floor(diff / 86400000)
  const hour = Math.floor(diff / 3600000)
  const minute = Math.floor(diff / 60000)

  if (day) return `${day} hari lalu`
  if (hour) return `${hour} jam lalu`
  if (minute) return `${minute} menit lalu`

  return 'baru saja'
}
