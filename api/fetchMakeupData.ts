import type { NextApiRequest, NextApiResponse } from 'next';

// MakeUp API에서 데이터 가져오기
const fetchMakeupData = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
  const data = await response.json();

  res.status(200).json(data);
};

export default fetchMakeupData;
