import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { Link, useParams } from 'react-router-dom';

export default function NextButton() {
  const products = useAppSelector((state) => state.products.products.data);
  const { id } = useParams();
  const nextId = products[products.findIndex((item) => item.id == id?.slice(1)) + 1].id;

  return (
    <Link to={`/goodinfo/:${nextId}`}>
      <Button onClick={() => console.log(products)}>Next</Button>
    </Link>
  );
}
