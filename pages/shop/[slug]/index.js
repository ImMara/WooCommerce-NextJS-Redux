import React from 'react';
import {useRouter} from "next/router";
import {getProductBySlug} from "@/utils/wooCommerceApi";

function Index(props) {
     // get slug
    const router = useRouter();
    const {slug} = router.query;
    const {product} = props;

    return (
        <div>
            {slug}
            {
                product[0].id
            }
        </div>
    );
}

// server side props
export async function getServerSideProps (context) {
    const slug = context.params.slug

    const product = await getProductBySlug(slug).catch(err => {
        console.log(err)
    })

    if(!product){
        return{
            notFound:true,
        }
    }

    return {
        props:{
            product:product.data
        }
    }
}


export default Index;