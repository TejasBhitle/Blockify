# Blockify

# Architecture
Explanation of Architecture:
* There are two types of Users in our system :- User (Music Listener) and Artist. 
  Users use our application to buy songs from artists and listen to them. 
  Artist can upload their songs on our application for users to buy them
* Our Application consists of a frontend website based on React. Users can perform the list of smart contract operations mentioned in the diagram above.
* Our application uses Metamask as the wallet for performing and validating all the transactions
* We are using IPFS (Interplantery File System, a decentralized file storage) for storing all the songs uploaded by the artist. This is our off-chain data storage. We are currently running a local instance of IPFS.
* To support our Blockchain locally, we are using Ganache + Truffle suite


<br><br>
# Global hosting and Deployment Steps:

## React App (Frontend) Deployment:
We have used Netlify for our react app deployment. Below are the steps for the same:

### Creating a new site: 
* We need to click on the "New site from Git" button on the dashboard in order to create a new site. Further configure this site by choosing Git provider and selecting the github repository where our React app is hosted.

* Configure build settings: 
  We have specified our build command as follows:
  `cd client && npm install --force && npm run build`
  This command installs all the dependencies present in the package.json defined in client/ directory and then builds the minified version of our react app into client/build directory.
  This directory is then fetched by the netlify hosting config to host our website.
 
* Deploy the app: 
By clicking on the "Deploy site" button, Netlify will initiate the build process and deploy our React app, we automate this process to trigger new deploy when we push new changes to main branch.

## Storage Deployment:
We are using Web3Storage (https://web3.storage/products/web3storage/) which is an IPFS based storage for storing our off-chain data (songs). There is no deployment step for it as such. We are making an upload/ request to this storage using their developer APIs and then we get the hash (cid) of the song uploaded as the response. We store this hash of the song in our smart contract.

## Smart contract deployment.
We are using Infura.io to deploy our smart contract.
To deploy the contract, we first try to compile the contract and check if there are any errors.
If compiled successfully, we run the ‘truffle migrate’ command to deploy our contract, here we can also specify the network parameter on which we are planning to deploy our contract and make transactions.


`truffle compile`<br>
`truffle migrate –network=sepolia` <br>
`truffle migrate –reset –network=sepolia`<br>



<br><br>
## React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
