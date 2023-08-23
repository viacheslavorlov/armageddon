// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from 'next';
import {API_KEY} from '../../src/consts/apiKey';

type Error = {
    message: string
}

export default async function getData(
    req: NextApiRequest,
    res: NextApiResponse<NearEarthObject[] | Error>
) {
    const {
        start_date,
        end_date
    } = req.query;
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`);
        const result = Object.values(response.data.near_earth_objects)
        console.log('result', result);
        res.status(200).json( result);
    } catch (e) {
        res.status(200).json({message: 'Server error'});
    }
}