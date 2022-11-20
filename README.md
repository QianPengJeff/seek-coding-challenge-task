# Seek Coding Challenge Task By Qian Peng

## setup

Clone or download the project

Open terminal and switch the path to the root folder of this project, run ```npm install```. My nodejs version is v16.14.0

### Build and run the project

After installed all the dependencies, run ```npm run start``` to build and run the project

Once the project compiled successfully, open http://localhost:4200/ to see the page on browsers. Tested in Chrome, Firefox and Safari (MacOS Big Sur)

Below are the screenshots of the 3 example scenarios results:

<img width="1348" alt="Screen Shot 1" src="https://user-images.githubusercontent.com/19439515/202891643-cb7bb4e1-493e-4ba4-9589-c9d9bca976bb.png">

<img width="1348" alt="Screen Shot 3" src="https://user-images.githubusercontent.com/19439515/202891330-8b221d0d-6c92-4155-adc2-a8bba00ea973.png">

<img width="1348" alt="Screen Shot 2" src="https://user-images.githubusercontent.com/19439515/202891339-103c3982-0110-4d06-b939-a75e5cb4278a.png">

#### Running unit tests

Run ```npm run test``` to execute the unit tests via [Karma](https://karma-runner.github.io).

##### Assumptions

I assume that he data of products and the pricing rules are coming from CMS, so in the code, I use products service (products.service.ts) and pricing rules service (pricing-rules.service.ts) to return those data to the component.

json data of products (products.json under assets folder): 
[
    {
        "name": "Classic",
        "description": "Offers the most basic level of advertisement",
        "price": 269.99
    },
    {
        "name": "Stand out",
        "description": "Allows advertisers to use a company logo and use a longer presentation text",
        "price": 322.99
    },
    {
        "name": "Premium",
        "description": "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
        "price": 394.99
    }
]


json data of pricing rules (pricing-rules.json under assets folder): 
[
    {
        "customerName": "SecondBite",
        "specialDeals": [
            {
                "productName": "Classic",
                "discountType": "special-deal",
                "description": "3 for 2 deal",
                "paidItems": 2,
                "freeItems": 1
            }
        ],
        "fixedPriceDeals": []
    },
    {
        "customerName": "Axil Coffee Roasters",
        "specialDeals": [],
        "fixedPriceDeals": [
            {
                "productName": "Stand out",
                "discountType": "fixed-price",
                "description": "Fixed price discount",
                "dsicountedPrice": 299.99
            }
        ]
    },
    {
        "customerName": "MYER",
        "specialDeals": [
            {
                "productName": "Stand out",
                "discountType": "special-deal",
                "description": "5 for 4 offers",
                "paidItems": 4,
                "freeItems": 1
            }
        ],
        "fixedPriceDeals": [
            {
                "productName": "Premium",
                "discountType": "fixed-price",
                "description": "Fixed price discount",
                "dsicountedPrice": 389.99
            }
        ]
    }
]
