import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import {AsteroidDetaildCard} from '../../src/Components/AsteroidDetaildCard/AsteroidDetaildCard';
import {API_KEY} from '../../src/consts/apiKey';
import { classNames} from '../../src/helpers/classNames';
import {APIResponseSingleAsteroidI} from '../../src/Model/APIRespoyseSigleAsteroid';
import cls from './AsteroidPage.module.css';
import {memo, useEffect} from 'react';

interface AsteroidPagePrors {
    className?: string;
    asteroid: APIResponseSingleAsteroidI
}

const AsteroidPage = (props: AsteroidPagePrors) => {
    const {
        className, asteroid
    } = props;


    useEffect(() => {

    }, [])

    return (
        <div className={classNames(cls.AsteroidPage,className)}>
            <div className={cls.asteroidImg}>
                <Image
                    layout={'responsive'}
                    src={'/asteroid mobile.png'}
                    alt={'Астероид'}
                    height={500}
                    width={250}
                />
            </div>
            <AsteroidDetaildCard asteroid={asteroid}/>

        </div>
    );
};
export default memo(AsteroidPage);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {params} = context
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params?.id}?api_key=${API_KEY}`)
    const asteroid = await response.json()
    return {
        props: {asteroid}
    }
}
