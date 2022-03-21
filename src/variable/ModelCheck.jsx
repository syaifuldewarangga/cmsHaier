import { productData } from './ProductData'

const ModelCheck = (model) => {
    let product = productData.filter(product => product.model === model);
    return product[0];
}

export {
    ModelCheck
}