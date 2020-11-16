module.exports = {
    type: 'object',
    'properties' : {
        "searchTerms": {
            "type": "string",
        },
        "page" : {
            "type" : "number",
        },
        "size" : {
            "type" : "number",
        },
        "author" : {
            "type" : "string",
        },
        "tags" : {
            "type" : "array",
            "items" : [
                { "type" : "string" },
            ],
            "uniqueItems" : true,
        },
        "published" : {
            "type": "boolean",
        },
    },
    "required": ["searchTerms"],
}
