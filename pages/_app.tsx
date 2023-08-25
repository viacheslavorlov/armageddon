import type {AppProps} from 'next/app';
import Image from 'next/image';
import {memo, useLayoutEffect, useRef, useState} from 'react';
import {Header} from '../src/Components/Header/Header';
import {useWindowSize} from '../src/hooks/useWindowSize';
import '../styles/globals.css';


function MyAppComponent({Component, pageProps}: AppProps) {
    const [width, height] = useWindowSize();
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [marginLeft, setMarginLeft] = useState(width * 0.10)
    const mobile = width < height || width < 860;

    const mobileWith = mobile ? 'mobile' : '';
    useLayoutEffect(() => {
        setMarginLeft(imgRef.current?.offsetWidth! + width * 0.05)
    }, [])

    return (
        <div className={'wrap'}>
            <Header/>
            <div className={'imageWrapper ' + mobileWith}>
                <Image
                    ref={imgRef}
                    className={'image'}
                    sizes={mobile
                        ? '(max-height: 500px) (max-width: 48px)'
                        : '(max-height: 768px) (max-width: 536px)'
                    }
                    layout={'responsive'}
                    width={mobile ? 48 : 536}
                    height={mobile ? 436 : 620}
                    src={
                        mobile
                            ? '/planeta_zemlia_kosmos_small.png'
                            : '/planeta_zemlia_desktop.png'
                    }
                    alt={'Планета земля'}
                />
            </div>
            <div style={{marginLeft}}>
                <Component {...pageProps} />
            </div>

        </div>
    );
}

const MyApp = memo(MyAppComponent);
export default MyApp;

