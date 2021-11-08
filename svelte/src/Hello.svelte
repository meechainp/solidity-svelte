<script>
    import { Web3 } from "svelte-web3";
    import HelloContract from "./contracts/hello.json";

    async function getGreeting() {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = HelloContract.networks[networkId];
        const contract = new web3.eth.Contract(
            HelloContract.abi,
            deployedNetwork && deployedNetwork.address
        );
        const response = await contract.methods.greet().call();
        return response;
    }
    $: promise = getGreeting();

    let greetie = "Human!";
    async function setGreetie(greetie) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = HelloContract.networks[networkId];
        const contract = new web3.eth.Contract(
            HelloContract.abi,
            deployedNetwork && deployedNetwork.address
        );
        await contract.methods.setGreetie(greetie).send({ from: accounts[0] });
        promise = getGreeting();
    }
</script>

{#await promise}
    <h1>Loading ...</h1>
{:then greeting}
    <h1>{greeting}</h1>
    <input type="text" bind:value={greetie} />
    <button on:click={setGreetie(greetie)}>Submit</button>
{/await}
