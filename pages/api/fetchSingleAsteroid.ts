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
    const {id} = req.query;
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`);
        res.status(200).json(response.data);
    } catch (e) {
        res.status(200).json({message: 'Server error'});
    }
}
