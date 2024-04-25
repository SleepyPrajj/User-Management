interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({
  children
}: AuthLayoutProps) {
  return (
    <section >
      {children}
    </section>
  )
}