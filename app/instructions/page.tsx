import { Metadata } from 'next';
import { metaTagsValues } from '../lib/seo/meta-tags-values';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import { comfortaaFont, openSansFont } from '../components/ui/fonts';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Стати дилером | Piramid | ' + metaTagsValues.shop_name,
    description: 'Стати дилером, ' + metaTagsValues.shop_name,
    openGraph: {
        title: 'Інструкції встановлення | Piramid',
        description: 'Інструкції встановлення, Пирамида ТПК',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://piramidspace.com/',
        siteName: 'Piramid | Пирамида ТПК',
        phoneNumbers: metaTagsValues.config_telephone
    }
};

function InstructionsPage() {
    return (
        <div className='min-h-dvh overflow-hidden flex flex-col'>
            <Header />
            <Instructions />
            <Footer />
        </div>
    );
}


export default InstructionsPage;

// 

function Instructions() {
    return (
        <section className='container'>
            <div className="mt-24 mb-3 flex flex-col md:flex-row items-center justify-between">
                <div className='flex items-center gap-5 '>
                    <Image
                        alt='Category title'
                        src="/assets/images/categories-icons/day-night.svg"
                        width={40}
                        height={40}
                    />
                    <h1 className={`${comfortaaFont.className} text-3xl font-semibold`}> Інструкції День-Ніч</h1>
                </div>
                <p className={`${openSansFont.className} text-xl text-t-gray mt-4 md:mt-0 text-center md:text-start`}>
                    🛠️ Швидкий гайд по встановленню та замірам
                </p>
            </div>

            <article>
                <div className='flex flex-col items-center'>
                    <h2 className={`${comfortaaFont.className} text-xl font-medium mt-5 mb-3`}>
                        Встановлення День-Ніч
                    </h2>
                    <p className={`${openSansFont.className} mb-5`}>
                        Детальна покрокова інструкція для легкого встановлення ваших штор День-Ніч.
                    </p>
                    <div className='mb-5 max-w-[650px] w-full min-h-[350px] rounded-2xl bg-white border-2 border-transparent hover:border-t-blue duration-250 flex items-center justify-center shadow-none hover:shadow-xl cursor-wait '>
                        <p className="text-t-gray-text font-medium">🎬 Відео готується...</p>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <h2 className={`${comfortaaFont.className} text-xl font-medium mt-5 mb-3`}>
                        Заміри День-Ніч
                    </h2>
                    <p className={`${openSansFont.className} mb-5`}>
                        Як правильно зробити заміри вікон перед замовленням штор День-Ніч.
                    </p>
                    <div className='mb-5 max-w-[650px] w-full min-h-[350px] rounded-2xl bg-white border-2 border-transparent hover:border-t-blue duration-250 flex items-center justify-center shadow-none hover:shadow-xl cursor-wait '>
                        <p className="text-t-gray-text font-medium">🎬 Відео готується...</p>
                    </div>
                </div>
            </article>
        </section >
    )
}