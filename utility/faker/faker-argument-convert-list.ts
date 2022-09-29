interface Arguments {
    type: string;
    placeholder: string;
}


interface ArgumentConverter {
    arguments: Arguments[];
}


export const fakerArgumentConvertList: {[key: string]: ArgumentConverter} = {
    "countryCode": {
        arguments: [{
            type: "string",
            placeholder: "alphaCode"
        }],
    },
    "latitude": {
        arguments: [{
            type: "number",
            placeholder: "max"
        },{ 
            type: "number", 
            placeholder: "min"
        },{ 
            type: "number", 
            placeholder: "precision"
        }],
    },
    "longitude": {
        arguments: [{
            type: "number",
            placeholder: "max"
        },{ 
            type: "number", 
            placeholder: "min"
        },{ 
            type: "number", 
            placeholder: "precision"
        }],
    },
    "price": {
        arguments: [{
            type: "number",
            placeholder: "min"
        },{
            type: "number",
            placeholder: "max"
        },{
            type: "number",
            placeholder: "dec"
        },{
            type: "string",
            placeholder: "symbol"
        }],
    },
    "amount": {
        arguments: [{
            type: "number",
            placeholder: "min"
        },{
            type: "number",
            placeholder: "max"
        },{
            type: "number",
            placeholder: "dec"
        },{
            type: "string",
            placeholder: "symbol"
        }],
    },
    "rand": {
        arguments: [{
            type: "number",
            placeholder: "max"
        },{
            type: "number",
            placeholder: "min"
        }],
    },
    "words": {
        arguments: [{
            type: "number",
            placeholder: "count"
        }]
    },
}