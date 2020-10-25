module.exports = {
    type: 'object',
    'properties': {
        "name": {
            "type": "string",
            // "required": true
        },
        "typeID": {
            "type": "string",
            // "required": true
        },
        "body": {
            "type": "string",
            // "required": true
        },
        "start": {
            "type": "string",
            // "required": true
        },
        "duration": {
            "type": "number",
            "minimum": 1,
            "maximum": 90
        },
        "couponID": {
            "type": 'string'
        },
    },
    "required": ["name", "typeID", "start", "duration", "body"]
}
