import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        {/* Insert your header content here */}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Insert your footer content here */}
      </footer>
    </>
  )
}

export default Layout
