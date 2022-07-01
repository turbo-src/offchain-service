# repoint opreturn (internal usage)

Datapay's javascript library is the easiest way for me to handle op-return transactions. The goal is to deprecate this once I get it going in rust.

Likely repoint will interact with this by calling a script.

## Usage

To get a signed tx (it won't send it).

`$ node ./lib/opreturn.js PRIVKEY OPCODE MSG FEE RPC_URL SAFE`

Here's an example.

```
node ./lib/opreturn.js \
5JZ4RXH4MoXpaUQMcJHo8DxhZtkf5U5VnYd9zZH8BRKZuAbxZEw \
0x6d02 \
'hello from datapay' \
400 \
https://api.mattercloud.net \
true
```

The example per docker workflow.

```
docker build -t repoint_opreturn:0.1.0 .
docker run --rm repoint_opreturn:0.1.0 node ./lib/opreturn.js \
5JZ4RXH4MoXpaUQMcJHo8DxhZtkf5U5VnYd9zZH8BRKZuAbxZEw \
0x6d02 \
'hello from datapay' \
400 \
https://api.mattercloud.net \
true
```

**fee:** tx fee in Satoshis

**rpc url:** public JSON-RPC endpoint

**safe:** Set to true, otherwise it'll return a raw OP_RETURN (bad).

## Dev

Source files are copied into the image. No host dir is mounted to the container. Rebuild the docker image on each file modification you want ran. It's a bit akward but there is good reason for it.

### Testing

Re-build and test.

```
docker build -t repoint_opreturn:0.1.0 .
docker run --rm repoint_opreturn:0.1.0 npm test
```

`docker build` must be ran if you want to test any modifcations.
