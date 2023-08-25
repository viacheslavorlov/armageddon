## Документация для компонента MyAppComponent

Этот документ описывает компонент MyAppComponent, который является оберткой для основного компонента приложения.

### Импорты

```tsx
import type {AppProps} from 'next/app';
import Image from 'next/image';
import {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Header} from '../src/Components/Header/Header';
import {useWindowSize} from '../src/hooks/useWindowSize';
import '../styles/globals.css';
```

### Компонент MyAppComponent

```tsx
function MyAppComponent({Component, pageProps}: AppProps) {
    const [width, height] = useWindowSize();
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [marginLeft, setMarginLeft] = useState(
        imgRef?.current?.offsetWidth + width * 0.05
    );
    const mobile = width < height || width < 860;

    const mobileWith = mobile ? 'mobile' : '';
    useLayoutEffect(() => {
        setMarginLeft(imgRef?.current?.offsetWidth + width * 0.05);
    }, []);

    return (
        <div className={'wrap'}>
            <Header/>
            <div className={'imageWrapper ' + mobileWith}>
                <Image
                    ref={imgRef}
                    className={'image'}
                    sizes={
                        mobile
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
```

### Описание компонента

Компонент MyAppComponent представляет собой обертку для основного компонента приложения. Он отображает заголовок,
изображение и основной компонент.

#### Стейты

- `width: number`  - ширина окна браузера.
- `height: number`  - высота окна браузера.
- `marginLeft: number`  - отступ слева для основного компонента.

#### Рефы

- `imgRef: React.RefObject<HTMLImageElement | null>`  - ссылка на элемент изображения.

#### Хуки

- `useWindowSize()` : хук для получения размеров окна браузера.

#### Методы

- `useLayoutEffect()` : выполняет установку отступа слева для основного компонента после рендеринга.

#### Визуальный интерфейс

Компонент MyAppComponent отображает заголовок, изображение и основной компонент. Изображение адаптируется в зависимости
от размеров окна браузера. Основной компонент отступает от изображения слева на величину, равную ширине изображения плюс
5% ширины окна браузера.

### Примечания

Компонент MyAppComponent использует стили из файла globals.css. Убедитесь, что этот файл стилей доступен и содержит
необходимые стили для компонента.
