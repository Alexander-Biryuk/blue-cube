import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}
interface Busket {
  product: Data;
  quantity: number;
  createdAt: string;
}

type PropType = {pictures: Busket[]}

export default function MySlider({ pictures }: PropType) {
  const settings = {
    dots: true,
    infinite: pictures.length > 10,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {pictures.map((item) => (
        <div key={item.product.id}>
          <img src={item.product.picture} style={{ width: '48px', marginRight: '8px' }} />
        </div>
      ))}
    </Slider>
  );
}
