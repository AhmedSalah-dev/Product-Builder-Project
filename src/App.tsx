
import ProductCard from "./compnents/ProductCard"
import Model from "./compnents/ui/Model"
import Button from "./compnents/ui/Button"
import Input from "./compnents/ui/Input" 
import { colors,formInputsList, productList } from "./data"
import { FormEvent,ChangeEvent,useState } from "react"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./compnents/ErrorMessage"
import CircleColor from "./compnents/CircleColor"
import { v4 as uuid } from "uuid";

const App = () => {

  const defaultProduct =
    {
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: [],
      category: {
        name: '',
        imageURL: '',
      }
    }
  /******State*******/
  const [product,setProduct] = useState<IProduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState({ 
    title: '',
    description: '',
    imageURL: '',
    price: '',
  })
  const [tempColors,setTempColor] = useState<string[]>([])
  const [products, setProducts] = useState<IProduct[]>(productList)

  /******Handler*****/
  const close = () => setIsOpen(false)
  const openModel = () => setIsOpen(true)
  const oncChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value , name} = event.target;
    
    setProduct({...product,
       [name]: value
      })
      setErrors({
        ...errors,
        [name]: "",
      })
  }
  const onCancel = () => {
    setProduct(defaultProduct);
    close();
  }
  const submitHandler = (event: FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    const {title, description, price, imageURL} = product
    const errors = productValidation({
        title,
        description,
        price, 
        imageURL,
      })

      // ** check if any property has value of "" && Check if all properties have a value of ""
      const hasErrorMsg = 
        Object.values(errors).some( value=> value === '') && Object.values(errors).every(value=> value === '')
      if(!hasErrorMsg){
        setErrors(errors)
        return;
      }
     
     setProducts(prev=> [{...product, id:uuid(), colors: tempColors},...prev ]) 
     setProduct(defaultProduct);
     setTempColor([]);
     close();

  }
  



  /******Render******/
  const renderProductList = products.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input =>(
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
         {input.label}
     </label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={oncChangeHandler}  />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ))
  /*******************************************/
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} onClick={()=>{
    if (tempColors.includes(color)){
      setTempColor(prev => prev.filter(items => items!== color))
      return;
    }
    setTempColor((prev) => [...prev, color])
  }}/>
)
  /*
  //LOGIC
      const renderProductList= () => {
      return productList.map(product => <ProductCard key={product.id} />)
  }
  */
  return (
    <main className="container">
      <Button  className="bg-indigo-700 hover:bg-indigo-800" onClick={openModel}>ADD</Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>

      <Model openModel={isOpen} close={close} title="ADD A NEW PRODUCT" >
       <form className="space-y-3" onSubmit={submitHandler}> 
          {renderFormInputList}

          <div className="flex items-center flex-wrap my-4 space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap my-4 space-x-1">
           {tempColors.map(color => (
            <span 
              key={color} 
              className="p-1 mr-1 mb-1 text-xs rounded-md text-white" 
              style={{backgroundColor:color}}>
                {color}
             </span>
           ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button  className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Model>

    </main>
  )
}

export default App

// ** SM => MD => LG => XL => 2XL => 3XL