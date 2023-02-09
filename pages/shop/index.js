import React from 'react';
import {getCategories, getProducts} from "@/utils/wooCommerceApi";
import Link from "next/link";
import {useRouter} from "next/router";

export async function getServerSideProps(context) {

    let {page,category} = context.query;

    if(!page || page < 1 ) page = 1;
    category = category ? category : "";

    const categories = await getCategories().catch((error) => {
        console.log(error);
    });

    const products = await getProducts(page,category).catch((error) => {
        console.log(error);
    });

    // get max pages
    const maxPages = products.headers['x-wp-totalpages'];

    if( page <= 0 || page > maxPages) {
        return {
            redirect: {
                permanent: false,
                destination:'/shop?page=1&category=' + category
            },
        }
    }

    return {
        props: {
            categories: categories.data,
            products: products.data,
            maxPages: maxPages,
            page,
            category
        }
    }
}

function Index(props) {

    const router = useRouter();

    const {categories,products,maxPages,category,page} = props;

    return (
        <div className="container mt-5">
            <a></a>
            {categories.map((categoryM) => {
                return (
                    <a className="badge px-3 me-1 py-2 cursor-pointer text-bg-success" onClick={()=>{
                        router.push('/shop?page='+page+'&category=' + categoryM.id);
                    }}>{categoryM.name}</a>
                )
            })}
            <hr/>
            <div className="row">
                {products.map((product) => {
                    return (
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <img src={product.images[0].src} alt="" className="card-img-top" style={{
                                    height: '200px',
                                    maxHeight: '200px',
                                    objectFit: 'cover',
                                }}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.short_description}</p>
                                    <a className="btn btn-primary">Voir le produit</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="col-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={"page-item"}>
                                <a className={"page-link cursor-pointer"}
                                   onClick={()=> router.push('/shop?page=' + (parseFloat(page) - 1) + '&category=' + category)}
                                >precedent</a>
                            </li>
                            {
                                Array.from({length:maxPages}).map((p,index) => {
                                    return (

                                        <li key={index} className="page-item">
                                                <a onClick={()=>{
                                                        router.push('/shop?page=' + (index + 1) + '&category=' + category);
                                                    }}
                                                   className={(index+1 === parseFloat(page) ? ' active' : '') + " page-link cursor-pointer"}
                                                >{index+1}</a>
                                        </li>
                                    )
                                })
                            }
                            <li className={"page-item"}>
                                <a  className={"page-link cursor-pointer"}
                                    onClick={()=> router.push('/shop?page=' + (parseFloat(page) + 1) + '&category=' + category)}
                                >suivant</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Index;