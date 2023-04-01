import './globals.css'

export const metadata = {
  title: 'ChatGPT made by David yen',
  description: 'try it to chat with GPT and tuning it'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
