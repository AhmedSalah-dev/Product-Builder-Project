import { IProduct } from '../interfaces';
import { txtSlicer,numberWithCommas } from '../utils/function'
import Image from './Image'
import Button from './ui/Button'
import CircleColor from './CircleColor';

interface IProps {
   product : IProduct;
   setProductToEdit: (product:IProduct) => void
   openEditModel: ()  => void
   idx : number
   setProductToEditIdx: (value: number) => void
   openConfirmModel: () => void
}

const ProductCard = ({product,setProductToEdit,openEditModel,idx , setProductToEditIdx,openConfirmModel}:IProps) => {
  const{ title,description,imageURL,category,price,colors}= product;
  /****************RENDER***************/
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} 
    />
  )
  /****************HANDLER***************/
  const onEdit = () => {
    setProductToEdit(product);
    openEditModel();
    setProductToEditIdx(idx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModel();
  };

  return (
  
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex-col space-y-3">

        <Image 
          imageURL={imageURL}
          alt={"Product Name"}
          className="rounded-md mb-2 h-44 w-full  "/>
        <h3 className='text-lg text-gray-500 font-semibold'>{txtSlicer(title,25)}</h3>

        <p className="text-sm text-gray-500 break-words">{txtSlicer(description)}</p>

        <div className="flex items-center flex-wrap space-x-1">
          {!colors.length ? <p className="min-h-[20px]">Not available colors!</p> : renderProductColors}
        </div>
        

        <div className="flex items-center justify-between ">
        <span className="text-lg text-indigo-600 font-semibold">${numberWithCommas(price)}</span>

          <Image 
            imageURL={category.imageURL}
            alt={category.name} 
            className="w-10 h-10 rounded-full object-center"/>
        </div>

        <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  )
}

export default ProductCard


