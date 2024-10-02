import { Product } from "@/model/product";
import { DbConnect } from "@/utils/DbConnect";


export async function GET (request: Request){

    try {

        DbConnect()

        const {searchParams } = new URL( request.url);
        const query = searchParams.get('query');
        if(!query){
            return Response.json({
                success: false,
                message: 'No query provided'
            },{ status: 400});
        }
        let data = null;
        if(query === 'all'){
            data = await Product.find({});
        }
        else{
            data = await Product.find({ category: {$in: [ query ]}});
        }

        if(!data){
            return Response.json({
                success: false,
                message: 'No products found'
            }, {status: 400});
        }
    
        return Response.json({
            success: true,
            message: 'Products fetched successfully',
            data
        }, {status: 200});
    } catch (error) {
        return Response.json({
            success: false,
            message: 'Failed to fetch products',
            error
        }, {status: 500});
    }
}