import { image_url } from "./GlobalVariable";

const ImageFunction = (category) => {
    var image = '';
    switch(category) {
        case 'Commercial AC': 
            image = image_url + 'product/Commercial AC.jpeg'
            break;
        case 'Drum Washing Machine': 
            image = image_url + 'product/Drum Washing Machine.jpeg'
            break;
        case 'Freezer': 
            image = image_url + 'product/Freezer.jpeg'
            break;
        case 'Home Air Conditioner': 
            image = image_url + 'product/Home Air Conditioner.jpeg'
            break;
        case 'Refrigerator': 
            image = image_url + 'product/Refrigerator.jpeg'
            break;
        case 'Small Appliances': 
            image = image_url + 'product/Small Appliances.jpg'
            break;
        case 'TV': 
            image = image_url + 'product/TV.jpeg'
            break;
        case 'Washing Machine': 
            image = image_url + 'product/Washing Machine.jpeg'
            break;
        default: 
            image = image_url + 'product/TV.jpeg'
    }

    return image
}

export {
    ImageFunction
}