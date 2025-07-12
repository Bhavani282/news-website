import './globals.css'
import { NewsProvider } from '../context/NewsContext'

export const metadata = { title: 'News App', description: 'News Website' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
           cz-shortcut-listen="true"
      >
        <NewsProvider>
          {children}
          
        </NewsProvider>
      </body>
    </html>
  )
}
