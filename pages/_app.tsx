import type {AppProps} from 'next/app';
import Image from 'next/image';
import {Header} from '../src/Components/Header/Header';
import {useWindowSize} from '../src/hooks/useWindowSize';
import '../styles/globals.css';


function MyApp({Component, pageProps}: AppProps) {
    const [width, height] = useWindowSize();
    const mobile = width < height;

    const mobileWith =  mobile ? 'mobile' : ''
    return (
        <div className={'wrap'}>
            <Header/>
            <div className={'imageWrapper ' + mobileWith}>
                <Image className={'image'}
                       sizes={mobile
                           ? '(max-height: 436px) (max-width: 48px)'
                           : '(max-height: 768px) (max-width: 536px)'
                       }
                       layout={'responsive'}
                       width={mobile ? 48 : 536}
                       height={mobile ? 436: 620}
                       src={
                           mobile
                               ? '/planeta_zemlia_mobile3.png'
                               : '/planeta_zemlia_desktop.png'
                       }
                       alt={'Планета земля'}
                />
            </div>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
