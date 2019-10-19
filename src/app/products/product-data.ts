import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from './product';

export class ProductData implements InMemoryDbService {

    createDb() {
        const products: Product[] = [
            {
                'id': 1,
                'productName': 'Lance of Longinus',
                'productCode': 'GDN-0011',
                'description': 'Leaf rake with 48-inch wooden handle',
                'starRating': 3.2
            },
            {
                'id': 2,
                'productName': 'The Horn of Gabriel',
                'productCode': 'GDN-0023',
                'description': '15 gallon capacity rolling garden cart',
                'starRating': 4.2
            },
            {
                'id': 5,
                'productName': 'Hammer of Death',
                'productCode': 'TBX-0048',
                'description': 'Curved claw steel hammer',
                'starRating': 4.8
            },
            {
                'id': 8,
                'productName': 'Spear of Destiny',
                'productCode': 'TBX-0022',
                'description': '15-inch steel blade hand saw',
                'starRating': 3.7
            },
            {
                'id': 10,
                'productName': 'Bane of Dionysus',
                'productCode': 'GMG-0042',
                'description': 'Standard two-button video game controller',
                'starRating': 4.6
            }
        ];
        return { products };
    }
}
