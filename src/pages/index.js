import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Stack, Typography } from "@mui/material";

const now = new Date();

const Page = () => (
	<>
		<Head>
			<title>Usuarios</title>
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
							<Typography variant="h4">Usuarios</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	</>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
