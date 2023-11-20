import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Stack, Typography } from "@mui/material";
import { OverviewTotalQueues } from "src/sections/overview/overview-total-queues";
import { OverviewTotalExchanges } from "src/sections/overview/overview-total-exchanges";
import { OverviewTotalConnections } from "src/sections/overview/overview-total-connections";
import { OverviewTotalAckMessages } from "src/sections/overview/overview-total-messagesAck";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "src/config";
import Button from "@mui/material/Button";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { SvgIcon } from "@mui/material";
import Overlay from "src/components/overlay";

const Page = () => {
	const [overview, setOverview] = useState([]);
	const [sync, setSync] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchOverview = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					config.base_url + "/rabbit/overview"
				);
				const data = await response.data;
				setOverview(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchOverview();
	}, [sync]);

	return (
		<>
			<Head>
				<title>Overview</title>
			</Head>
			{loading && <Overlay />}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="lg">
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							marginBottom: 4,
						}}
					>
						<Container
							maxWidth="lg"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Stack spacing={3}>
								<Typography variant="h4">Overview</Typography>
							</Stack>
							<Button
								color="primary"
								size="small"
								variant="outlined"
								startIcon={
									<SvgIcon fontSize="small">
										<ArrowPathIcon />
									</SvgIcon>
								}
								onClick={() => {
									setSync(!sync);
								}}
							>
								Sync
							</Button>
						</Container>
					</Box>
					<Grid container spacing={5}>
						<Grid xs={12} sm={6} lg={6}>
							<OverviewTotalQueues
								difference={12}
								positive
								sx={{ height: "100%" }}
								value={
									overview.total_queues
										? overview.total_queues
										: 0
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<OverviewTotalExchanges
								difference={12}
								positive
								sx={{ height: "100%" }}
								value={
									overview.total_exchanges
										? overview.total_exchanges
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<OverviewTotalConnections
								difference={12}
								positive
								sx={{ height: "100%" }}
								value={
									overview.total_connections
										? overview.total_connections
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<OverviewTotalAckMessages
								difference={12}
								positive
								sx={{ height: "100%" }}
								value={
									overview.total_ack_messages
										? String(overview.total_ack_messages)
										: "0"
								}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
