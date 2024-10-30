import { IProduct } from '../interfaces';
import { txtSlicer } from '../utils/function'
import Image from './Image'
import Button from './ui/Button'
import CircleColor from './CircleColor';

interface IProps {
   product : IProduct;
}

const ProductCard = ({product}:IProps) => {
  const{ title,description,imageURL,category,price,colors}= product;
  /*render*/
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} 
   />
)
  return (
  
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex-col space-y-3">

        <Image 
          imageURL={imageURL}
          alt={"Product Name"}
          className="rounded-md mb-2 h-44 w-full  "/>
        <h3 className='text-lg font-semibold'>{txtSlicer(title,25)}</h3>

        <p>{txtSlicer(description)}</p>

        <div className="flex items-center flex-wrap my-4 space-x-1">
            {renderProductColors}
          </div>
        

        <div className="flex items-center justify-between ">
          <span>${price}</span>

          <Image 
            imageURL={category.imageURL}
            alt={category.name} 
            className="w-10 h-10 rounded-full object-center"/>
        </div>

        <div className="flex items-center justify-between space-x-2 my-5">
          <Button 
          className="bg-indigo-700"
          onClick={() => {
            console.log("button clicked");
          }}
          >
            Edit
          
          </Button>
          <Button className="bg-red-700">Delete</Button>
        </div>
    </div>
  )
}

export default ProductCard


