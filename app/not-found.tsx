import Link from 'next/link'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'

export default function NotFound() {
    return (
        <section className='h-dvh w-screen flex flex-col'>
            <Header />
            <div className="container grow flex flex-col items-center justify-center">
                <h2 className='text-xl'>404 Сторінку не знайдено</h2>
                <Link href="/" className='mt-10 text-lg text-t-blue'>На головну</Link>
            </div>
            <Footer />
        </section>
    )
}