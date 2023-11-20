import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Stack, Typography } from "@mui/material";
import { OverviewTotalAckMessages } from "src/sections/overview/overview-total-messagesAck";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "src/config";
import { QueueName } from "src/sections/overview/queue_name";
import { QueueConsumers } from "src/sections/overview/queue_consumers";
import { QueueMemory } from "src/sections/overview/queue_memory";
import { QueueState } from "src/sections/overview/queue_state";
import { QueueExchange } from "src/sections/overview/queue_exchange";
import MessagesSection from "src/sections/messages-section";
import Button from "@mui/material/Button";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { SvgIcon } from "@mui/material";
import Overlay from "src/components/overlay";

const Page = () => {
	const [sync, setSync] = useState(false);
	const [loading, setLoading] = useState(false);
	const [queueData, setQueueData] = useState([]);
	useEffect(() => {
		const fetchQueueData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					config.base_url + "/rabbit/queues/usuarios-queue"
				);
				const data = await response.data;
				setQueueData(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchQueueData();
	}, [sync]);
	console.log(queueData);
	return (
		<>
			<Head>
				<title>Usuarios</title>
			</Head>
			{loading && <Overlay />}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
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
								<Typography variant="h4">Usuarios</Typography>
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
					<Grid container spacing={2}>
						<Grid xs={12} sm={6} lg={6}>
							<QueueName
								value={
									queueData.name
										? String(queueData.name)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<QueueConsumers
								value={
									queueData.consumers
										? String(queueData.consumers)
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
									queueData.ack_messages
										? String(queueData.ack_messages)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<QueueMemory
								value={
									queueData.memory
										? String(queueData.memory)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<QueueState
								value={
									queueData.state
										? String(queueData.state)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={6}>
							<QueueExchange value={"core-exchange"} />
						</Grid>
						<Grid xs={12} sm={6} lg={12}>
							<MessagesSection
								sx={{ height: "100%" }}
								queueName="usuarios"
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
