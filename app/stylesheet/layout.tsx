import { Nav } from './_components/nav'

export default function StylesheetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Nav />
      <main className="flex-1 overflow-auto p-10">
        {children}
      </main>
    </div>
  )
}
