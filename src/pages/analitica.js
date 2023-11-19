import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
	<>
		<Head>
			<title>Analitica</title>
		</Head>
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8,
			}}
		>
			<Container maxWidth="xl">
				<Stack spacing={3}>
					<Stack
						direction="row"
						justifyContent="space-between"
						spacing={4}
					>
						<Stack spacing={1}>
							<Typography variant="h4">Analitica</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	</>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
