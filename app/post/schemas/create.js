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
        "tags" : {
            "type" : "array",
            "items" : [
                { "type" : "string" },
            ],
        },
    },
    "required" : ["title", "content"],
};
