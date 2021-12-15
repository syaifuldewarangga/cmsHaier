const ImageFunction = (category) => {
    var image = '';
    switch(category) {
        case 'Commercial AC': 
            image = '/assets/images/product/Commercial AC.jpeg'
            break;
        case 'Drum Washing Machine': 
            image = '/assets/images/product/Drum Washing Machine.jpeg'
            break;
        case 'Freezer': 
            image = '/assets/images/product/Freezer.jpeg'
            break;
        case 'Home Air Conditioner': 
            image = '/assets/images/product/Home Air Conditioner.jpeg'
            break;
        case 'Refrigerator': 
            image = '/assets/images/product/Refrigerator.jpeg'
            break;
        case 'Small Appliances': 
            image = '/assets/images/product/Small Appliances.jpg'
            break;
        case 'TV': 
            image = '/assets/images/product/TV.jpeg'
            break;
        case 'Washing Machine': 
            image = '/assets/images/product/Washing Machine.jpeg'
            break;
        default: 
            image = '/assets/images/product/TV.jpeg'
    }

    return image
}

export {
    ImageFunction
}