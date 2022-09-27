import Navbar from "./navbar";

// @ts-ignore
export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <main className='m-5'>
        {children}
      </main>
    </>
  )
}