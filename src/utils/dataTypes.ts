export interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    colour: string;
}

export interface Basket {
    [productId: number]: number;
}