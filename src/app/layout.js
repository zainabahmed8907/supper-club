import { DM_Sans } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const dm_sans = DM_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Supper Club',
}

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>
        
        <script src="https://apis.google.com/js/platform.js" async defer></script>

      </head>
      <body className={dm_sans.className }>

        <ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>

      </body>

    </html>
  )
}
