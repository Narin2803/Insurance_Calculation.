import axios from 'axios';
import app from "./app";


const port = process.env.PORT || 4000;
const endpoint = "https://api.fwd.co.th/dev-ecommerce";

app.get("/", function (req,res) {
    res.send("Response from the GET request")
    });
app.post('/api/getProducts', async (req: any, res: any) => {
    try {
        if (!endpoint) {
            throw new Error('Api Not Found');
        }
        const response = await axios.post(endpoint + '/getProduct', req.body);
        if (response.status === 200 && response.data) {
            const productList = response.data.quotationProductList;
            return res.status(200).send({
                success: true,
                data: productList
            });
        } else {
            throw new Error('No response')
        }
    } catch (error: any) {
        console.log("xxx" + error.message)
        
        return res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => console.log(`Port Listening on ${port}`));