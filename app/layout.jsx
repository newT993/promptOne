import React from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

const RootLayout = ({ children}) => {
  return (
    <html lang='en'>
        <body>
          <Provider>

            <main className='container w-[80%] h-screen  mx-auto p-4'>
                <Nav/>
                {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout