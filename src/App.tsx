
import ProductCard from "./compnents/ProductCard"
import Model from "./compnents/ui/Model"
import Button from "./compnents/ui/Button"
import Input from "./compnents/ui/Input" 
import { categories, colors,formInputsList, productList } from "./data"
import { FormEvent,ChangeEvent,useState } from "react"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./compnents/ErrorMessage"
import CircleColor from "./compnents/CircleColor"
import { v4 as uuid } from "uuid";
import Select from "./compnents/ui/Select"
import { TProductNames } from "./types"
import toast, { Toaster } from "react-hot-toast";

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
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [errors, setErrors] = useState({ 
    title: '',
    description: '',
    imageURL: '',
    price: '',
 })
  const [tempColors,setTempColor] = useState<string[]>([])
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [selectCategory, setSelectedCategory] = useState(categories[0]);


  /******Handler*****/
  const close = () => setIsOpen(false)
  const openModel = () => setIsOpen(true)
  const closeEditModel = () => setIsOpenEditModel(false)
  const openEditModel = () => setIsOpenEditModel(true)
  const closeConfirmModal = () => setIsOpenConfirmModal(false)
  const openConfirmModal = () => setIsOpenConfirmModal(true)
 
 
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

  const oncChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value , name} = event.target;
    
    setProductToEdit({
      ...productToEdit,
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

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

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
     
     setProducts(prev=> [{...product, id:uuid(), colors: tempColors, category: selectCategory},...prev ]) 
     setProduct(defaultProduct);
     setTempColor([]);
     close();

     toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });

  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    const {title, description, price, imageURL} = productToEdit
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
     
     const ubdatedProducts = [...products]
     ubdatedProducts[productToEditIdx] = {...productToEdit, colors:tempColors.concat(productToEdit.colors)}

     setProducts(ubdatedProducts);
     setProductToEdit(defaultProduct);
     setTempColor([]);
     closeEditModel();

  }
  
 


  /*********************RENDER**********************/
  const renderProductList = products.map((product,idx) =>
        <ProductCard 
          key={product.id}
          product={product} 
          setProductToEdit={setProductToEdit} 
          openEditModel={openEditModel}
          idx={idx}
          setProductToEditIdx={setProductToEditIdx}
          openConfirmModel={openConfirmModal}
        />
     
      )

  const renderFormInputList = formInputsList.map(input =>(
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
         {input.label}
     </label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={oncChangeHandler}  />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ))
  

  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} 
    onClick={()=>{
      if (tempColors.includes(color)){
        setTempColor(prev => prev.filter(items => items!== color))
        return;
      }
      if (productToEdit.colors.includes(color)){
        setTempColor(prev => prev.filter(items => items!== color))
        return;
      }
      setTempColor((prev) => [...prev, color])
  }}/>
)

  const renderProductEditWithErrorMsg = (id:string, label: string, name: TProductNames) => {
    return (
      <div className="flex flex-col" >
      <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
        {/* {input.label} */}
        {label}
      </label>
      <Input 
        type="text" 
        id={id}
        name={name} 
        value={productToEdit[name]} 
        onChange={oncChangeEditHandler}  />
        <ErrorMessage msg={errors[name]} 
    />
</div>
    )
  }
  /*
  //LOGIC
      const renderProductList= () => {
      return productList.map(product => <ProductCard key={product.id} />)
  }
  */
  return (
    <main className="container">
     <button
     onClick={openModel} 
     className="bg-indigo-700 hover:bg-indigo-800 max-w-fit flex mt-5 mx-auto  w-full p-2 rounded-md text-white">
        Build Product
      </button>

      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>

      <Model isOpen={isOpen} closeModel={close} title="ADD A NEW PRODUCT" >
       <form className="space-y-3" onSubmit={submitHandler}> 
          {renderFormInputList}
          <Select selected={selectCategory} setSelected={setSelectedCategory} />
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
      {/*EDIT PRODUCT MODEL */}

      <Model isOpen={isOpenEditModel} closeModel={closeEditModel} title="EDIT THE PRODUCT" >
       <form className="space-y-3" onSubmit={submitEditHandler}> 
           {renderProductEditWithErrorMsg('title', 'Product Title', 'title')}
           {renderProductEditWithErrorMsg('description', 'Product Description', 'description')}
           {renderProductEditWithErrorMsg('imageURL', 'Product ImageURL', 'imageURL')}
           {renderProductEditWithErrorMsg('price', 'Product Price', 'price')}
       
          <Select selected={productToEdit.category} 
          setSelected={value => setProductToEdit({...productToEdit, category: value})} />
          <div className="flex items-center flex-wrap my-4 space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap my-4 space-x-1">
            {tempColors.concat(productToEdit.colors).map(color => (
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

      {/* DELETE PRODUCT CONFIRM MODEL */}

      <Model
      isOpen={isOpenConfirmModal}
      closeModel={closeConfirmModal}
      title="Are you sure you want to remove this Product from your Store?"
      description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Model>

      <Toaster/>

    </main>
  )
}

export default App

// ** SM => MD => LG => XL => 2XL => 3XL