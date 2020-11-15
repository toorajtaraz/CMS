module.exports = {
    type: 'object',
    'properties': {
        "username": {
            "type": "string",
            "minLength":6,
            "maxLength":60,
        },
        "password": {
            "type": "string",
            "minLength":6,
            "maxLength":60,
        },
        "role":{
            "type": "string",
        }
    },
    "required": ["username", "password", "role"]
}
