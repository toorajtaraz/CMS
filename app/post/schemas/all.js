module.exports = {
    type: 'object',
    'properties' : {
        "page" : {
            "type" : "number",
        },
        "size" : {
            "type" : "number",
        },
        "sortBy" : {
            "type" : "string",
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
    }
}
