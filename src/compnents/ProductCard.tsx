import { IProduct } from '../interfaces';
import { txtSlicer } from '../utils/function'
import Image from './Image'
import Button from './ui/Button'
interface IProps {
   product : IProduct;
}

const ProductCard = ({product}:IProps) => {
  const{ title,description,imageURL,category,price}= product;
  return (
  
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex-col space-y-3">

        <Image 
          imageURL={imageURL}
          alt={"Product Name"}
          className="rounded-md mb-2 h-44 w-full  "/>
        <h3>{title}</h3>

        <p>{txtSlicer(description)}</p>

        <div className="flex items-center my-4 space-x-2">
          <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
          <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
          <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
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


