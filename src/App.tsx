
import ProductCard from "./compnents/ProductCard"
import Model from "./compnents/ui/Model"
import Button from "./compnents/ui/Button"
import { productList } from "./data"
import { useState } from "react"

const App = () => {

  /******State*******/
  const [isOpen, setIsOpen] = useState(false)

  /******Handler*****/
   function openModel() {
     setIsOpen(true)
   }

   function close() {
    setIsOpen(false)
   }

  /******Render******/
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
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
        <div className="flex items-center space-x-3">
        <Button  className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
        <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
        </div>
      </Model>

    </main>
  )
}

export default App

// ** SM => MD => LG => XL => 2XL => 3XL