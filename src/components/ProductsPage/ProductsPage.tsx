import React , {useState, useEffect} from 'react';
import './ProductsPage.css';
import Product from "../Product/Product";
import { IProduct } from '../Product/ProductModel';
import { getProducts } from '../api';

const ProductsPage = () => {
    const [productsData, setProductsData] = useState<IProduct[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(15)
    const [sort, setSort] = useState<string>('price')


    useEffect(()=>{
        getProducts(page, limit, sort).then(data=>{
            console.log(data)
            setProductsData(data)
        })
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                { productsData.length > 0 && 
                    productsData.map((item:IProduct)=><Product {...item} key={item.id} />)
                }
                
            </div>
        </div>
    )
}

export default ProductsPage;
