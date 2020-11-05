module.exports = {
    type: 'object',
    'properties' : {
        "title" : {
            "type" : "string",
        },
        "content" : {
            "type" : "string",
        },
        "summary" : {
            "type" : "string",
        },
        "datePosted" : {
            "type" : "string",
        },
        "published" : {
            "type" : "boolean",
        },
        "tags" : {
            "type" : "array",
            "items" : [
                { "type" : "string" },
            ],
            "uniqueItems" : true,

        },
    },
    "required" : ["title", "content", "datePosted", "tags"]
}
