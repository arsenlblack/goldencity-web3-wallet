import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { usePersistedState } from "../utils/Helpers";

export default function WalletConnector() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = usePersistedState("theme", prefersDark ? "dark" : "light");
  const [disconnected, setDisconnected] = usePersistedState("wallet_disconnected", false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [hasProvider, setHasProvider] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!window.ethereum) return;
    setHasProvider(true);

    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0 && !disconnected) {
          const account = accounts[0];
          setWalletAddress(account);
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setNetwork(chainId);
          const balanceWei = await window.ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"],
          });
          setBalance((parseInt(balanceWei, 16) / 1e18).toFixed(4));
          toast.info("Restored previous wallet connection");
        }
      } catch (err) {
        console.error("Failed to check connection:", err);
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setDisconnected(false);
        toast.success("Wallet connected");
      } else {
        setWalletAddress(null);
        toast("Wallet disconnected");
      }
    };

    const handleChainChanged = (chainId) => setNetwork(chainId);

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [disconnected]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected. Please install it.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      setWalletAddress(account);
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setNetwork(chainId);
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setBalance((parseInt(balanceWei, 16) / 1e18).toFixed(4));
      setDisconnected(false); // важливо!
      toast.success("Wallet connected");
    } catch (err) {
      toast.error("Connection failed");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setBalance(null);
    setNetwork(null);
    setDisconnected(true);
    toast("Disconnected");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900"
      }`}
    >
      <Toaster position="top-right" />

      {/* iOS-like theme toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition"
        >
          <div
            className={`absolute left-1 top-1 h-5 w-5 transform rounded-full bg-white dark:bg-yellow-400 shadow-md transition-transform duration-300 ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? (
              <MoonIcon className="absolute right-[2px] top-[2px] w-4 h-4 text-gray-800 stroke-[2.5]" />
            ) : (
              <SunIcon className="absolute right-[2px] top-[2px] w-4 h-4 text-yellow-500 stroke-[2.5]" />
            )}
          </div>
        </button>
      </div>

      <div className="animate-fadeIn mt-20 bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-2 text-yellow-400">GoldenCity Wallet Connector</h1>
        <p className="text-sm mb-6 text-gray-400 dark:text-gray-500">
          Your gateway to smart property investment
        </p>

        {!hasProvider && (
          <div className="bg-black/70 text-yellow-400 px-6 py-4 rounded-xl">
            <p className="mb-2 text-lg font-medium">MetaMask not detected</p>
            <p className="text-sm text-gray-300">
              Please install the MetaMask extension to continue.
            </p>
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
            >
              Install MetaMask
            </a>
          </div>
        )}

        {hasProvider && (
          <div>
           {!walletAddress ? (
            <div className="flex justify-center">
                <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 active:scale-95 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isConnecting ? (
                    <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                    </>
                ) : (
                    "Connect Wallet"
                )}
                </button>
            </div>
            ) : (
              <div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    toast.success("Address copied!");
                  }}
                  className="cursor-pointer text-sm mt-3 select-all"
                >
                  <p className="font-semibold text-yellow-400">Connected</p>
                  <p>
                    Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-yellow-400/20 text-sm">
                  <p>
                    <strong>Network:</strong> {network}
                  </p>
                  <p>
                    <strong>Balance:</strong> {balance} ETH
                  </p>
                </div>
                <button
                  onClick={disconnect}
                  className="mt-5 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm transition"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} GoldenCity Test — built by Arsen Nimchuk
        </p>
      </div>
    </div>
  );
}
