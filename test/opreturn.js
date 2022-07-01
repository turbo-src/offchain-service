const assert = require('assert')
const datapay = require('datapay')

describe('#opReturn()', async function() {
    it('should return a valid tx signature', async function() {
         var config = {
           safe: true,
           data: ["0x6d02", "hello from datapay"],
           pay: {
             key: "5JZ4RXH4MoXpaUQMcJHo8DxhZtkf5U5VnYd9zZH8BRKZuAbxZEw",
             rpc: "https://api.mattercloud.net",
             fee: 400,
             to: [{
               address: "1A2JN4JAUoKCQ5kA4pHhu4qCqma8jZSU81",
               value: 1000
             }]
           }
         }
         
         datapay.build(config, function(error, tx) {
             assert.equal(
                 tx.toString(),
                 "010000000002000000000000000018006a026d021268656c6c6f2066726f6d2064617461706179e8030000000000001976a91462f80abdd278a255e40c1a1f8dd89555de19a07688ac00000000"
             )
         })
    })
})
