import React , {useState, useEffect, useCallback} from 'react';
import './ProductsPage.css';
import Product from "../Product/Product";
import { IProduct } from '../Product/ProductModel';
import { getProducts } from '../api';
import SingleAd from '../SingleAd/SingleAd';

const ProductsPage = () => {
    
    const arrOfAdsNums = [1,2,3,4,5,6,7,8,9,10];

    const [productsData, setProductsData] = useState<IProduct[]>([])
    const [adNum, setAdNum] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(15)
    const [sort, setSort] = useState<string>('price')
    const [loading, setLoading] = useState<boolean>(false)
    const [noNewResults, setNoNewResults] = useState<boolean>(false)

    const handleUniqeNum = () =>{
        if(adNum < arrOfAdsNums.length) setAdNum(prev => prev + 1)
    }

    const handleScrollEvent = useCallback(() => {
        if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
            setLoading(true)
        }
    },[])

    const handleSortingButtonClick = (value:string) => {
        setSort(value)
        setProductsData([])
        setPage(1)
        setNoNewResults(false)
        setAdNum(0)
    }

    useEffect(() => {
        if (!loading) return;
        getProducts(page, limit, sort).then(data=>{
            if(data.length === 0) {
                setLoading(false)
                setNoNewResults(true)
                window.removeEventListener('scroll', handleScrollEvent);
                return;
            }
            setProductsData(prev => [...prev, ...data])
            setPage(prev => prev + 1)
            setLoading(false)
        })
      }, [loading]);

      useEffect(() => {
        window.removeEventListener('scroll', handleScrollEvent);
        setLoading(true)
        window.addEventListener('scroll', handleScrollEvent)
        return () => window.removeEventListener('scroll', handleScrollEvent);
      }, [sort]);


    return (
        <div className="container-fluid">
            <div className='card m-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='m-0'>Sort By</p>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-danger" onClick={()=>handleSortingButtonClick('price')}>Price</button>
                            <button type="button" className="btn btn-warning" onClick={()=>handleSortingButtonClick('size')}>Size</button>
                            <button type="button" className="btn btn-success" onClick={()=>handleSortingButtonClick('id')}>ID</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                { productsData.length > 0 && 
                    productsData.map((item:IProduct, index)=>{
                        if((index + 1) % 20 === 0) {
                            return <>
                                <Product {...item} key={item.id} />
                                <SingleAd num={arrOfAdsNums[adNum]} handleUniqeNum={handleUniqeNum} key={index}/>
                            </>
                        } else {
                            return <Product {...item} key={item.id} />
                        }
                    })
                }
            </div>

            { loading && <div className='card m-3 text-center text-info font-monospace blockquote'>
                <div className='card-body py-4'>
                    <div id="load">
                        <div>G</div>
                        <div>N</div>
                        <div>I</div>
                        <div>D</div>
                        <div>A</div>
                        <div>O</div>
                        <div>L</div>
                    </div>
                </div>
            </div>
            }

            { noNewResults && <div className='card m-3 text-center text-info font-monospace blockquote'><div className='card-body'>~ end of catalogue ~</div></div>
            }
        </div>
    )
}

export default ProductsPage;
