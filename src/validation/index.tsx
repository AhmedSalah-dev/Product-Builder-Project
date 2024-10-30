// ** productObj === errorsObj (TITLE, DESCRIPTION, IMAGE, PRICE)
export const productValidation= (product:{ 
    title: string;
    description: string;
    imageURL: string;
    price: string;}) => {
// ** Returns an Objects
const errors: {title: string , description: string, imageURL: string, price:string } = {
    title : '',
    description: '',
    imageURL: '',
    price: '',
};

const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

if(!product.title.trim() || product.title.length < 10 || product.title.length > 80 ) {
    errors.title = "product title must be between 10 and 80 characters!"
}

if(!product.description.trim() || product.description.length < 10 || product.title.length > 900 ) {
    errors.description = "product description must be between 10 and 900 characters!"
}

if(!product.imageURL.trim()|| !validUrl) {
    errors.imageURL = "Valid image URL is required";
}

if(!product.price.trim()||isNaN(Number(product.price))) {
    errors.price = "Valid price is required"
}

return errors ;
}