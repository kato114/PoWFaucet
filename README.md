# PoWFaucet
Modularized faucet for EVM chains with different protection methods (Captcha, Mining, IP, Mainnet Balance, Gitcoin Passport and more)

# Why

Faucets for ETH Testnets are spammed by bots. This faucet tries to reduce the efficiency of these automated requests by various protection methods.

This faucet is mostly known for its proof-of-work based protection, which is currently the best and most reliable way to distribute funds on a network that got low on fund reserves.

For clarification: This faucet does NOT generate new coins with the "mining" process.
It's just one of the protection methods the faucet uses to prevent anyone from requesting big amount of funds and draining the faucet wallet.
If you want to run your own instance you need to transfer the funds you want to distribute to the faucet wallet yourself!

# Run Yourself

Read the [Faucet Operator Wiki](https://github.com/kato114/PoWFaucet/wiki/Operator-Wiki) to see the installation and configuration instructions.

You can also find some demo instances with different module combinations here: [Demo Instances](https://github.com/kato114/PoWFaucet/blob/master/docs/demo/README.md)

# Bugs & Features

Please feel free to report bugs and add new features via PRs if you like.
