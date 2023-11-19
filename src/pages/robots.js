import Head from "next/head";
import {
	Box,
	Container,
	Unstable_Grid2 as Grid,
	Stack,
	Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewTotalAckMessages } from "src/sections/overview/overview-total-messagesAck";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "src/config";
import { QueueName } from "src/sections/overview/queue_name";
import { QueueConsumers } from "src/sections/overview/queue_consumers";
import { QueueMemory } from "src/sections/overview/queue_memory";
import { QueueState } from "src/sections/overview/queue_state";
import { QueueExchange } from "src/sections/overview/queue_exchange";

const Page = () => {
	const [queueData, setQueueData] = useState([]);
	useEffect(() => {
		const fetchQueueData = async () => {
			try {
				const response = await axios.get(
					config.base_url + "/rabbit/queues/robots-queue"
				);
				const data = await response.data;
				setQueueData(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchQueueData();
	}, []);
	return (
		<>
			<Head>
				<title>Robots</title>
			</Head>
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
						<Container maxWidth="lg">
							<Stack spacing={3}>
								<Typography variant="h4">Robots</Typography>
							</Stack>
						</Container>
					</Box>
					<Grid container spacing={5}>
						<Grid xs={12} sm={6} lg={5}>
							<QueueName
								value={
									queueData.name
										? String(queueData.name)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={5}>
							<QueueConsumers
								value={
									queueData.consumers
										? String(queueData.consumers)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={5}>
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
						<Grid xs={12} sm={6} lg={5}>
							<QueueMemory
								value={
									queueData.memory
										? String(queueData.memory)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={5}>
							<QueueState
								value={
									queueData.state
										? String(queueData.state)
										: "0"
								}
							/>
						</Grid>
						<Grid xs={12} sm={6} lg={5}>
							<QueueExchange value={"core-exchange"} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
