const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('NFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contrato lanzado en el address:", nftContract.address);

  let txn = await nftContract.mintNFT()
  await txn.wait()
  console.log("Mint NFT #1 exitoso")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();