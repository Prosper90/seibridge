import abi from "./ABI.json";
import tABI from "./TokenABI.json";
import pancakeABI from "./pancake.json";
import pancakeFactory from "./pancakeFactory.json"
import { connectKeplr } from "./connectKeplr";

export const contractAddress = "0xb0C534a478eA73A08d08Fb8DC9Eb47AB6C12e982";
export const contractABI = abi;
export const keplr = connectKeplr;
//export const tokenABI = tABI;
//export const pancakeABIuse = pancakeABI;
//export const pancakeFactoryuse = pancakeFactory;
export const chainID = 3;
//export const pancakeRouter = "0x9326BFA02ADD2366b30bacB125260Af641031331";
//export const pancakeFactoryContract = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";