module.exports = {
    name: {type: "String", required: true},
    type: {type: "String", required: true},
    body: {type: "String", required: true},
    start: {type: "String", required: true},
    end: {type: "String", required: true},
    coupon: {optional: true, type: 'string'},

}
