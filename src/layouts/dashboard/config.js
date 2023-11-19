import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ScaleIcon from "@heroicons/react/24/solid/ScaleIcon";
import WalletIcon from "@heroicons/react/24/solid/WalletIcon";
import FaceIcon from "@heroicons/react/24/solid/FaceSmileIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import ShoppingCart from "@heroicons/react/24/solid/ShoppingCartIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { SvgIcon } from "@mui/material";

export const items = [
	{
		title: "Overview",
		path: "/",
		icon: (
			<SvgIcon fontSize="small">
				<UsersIcon />
			</SvgIcon>
		),
	},
	{
		title: "Usuarios",
		path: "/usuarios",
		icon: (
			<SvgIcon fontSize="small">
				<UsersIcon />
			</SvgIcon>
		),
	},
	{
		title: "Administracion de Personal",
		path: "/adminPersonal",
		icon: (
			<SvgIcon fontSize="small">
				<FaceIcon />
			</SvgIcon>
		),
	},
	{
		title: "Analitica",
		path: "/analitica",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "Robots",
		path: "/robots",
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		),
	},
	{
		title: "Core Bancario",
		path: "/coreBancario",
		icon: (
			<SvgIcon fontSize="small">
				<ScaleIcon />
			</SvgIcon>
		),
	},
	{
		title: "Core Contable",
		path: "/coreContable",
		icon: (
			<SvgIcon fontSize="small">
				<WalletIcon />
			</SvgIcon>
		),
	},
	{
		title: "Marketplace",
		path: "/marketplace",
		icon: (
			<SvgIcon fontSize="small">
				<ShoppingCart />
			</SvgIcon>
		),
	},
];
