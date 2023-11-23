import PropTypes from "prop-types";
import { Card, CardContent } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "src/config";
import { Stack, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { CircularProgress } from "@mui/material";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const now = new Date();

const MessagesSection = ({ queueName, sx }) => {
	const [value, setValue] = useState(now);
	const [messages, setMessages] = useState({});
	const [sync, setSync] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				setLoading(true);
				const currentDay = dayjs(value).format("YYYY-MM-DD");
				const nextDay = dayjs(value).add(1, "day").format("YYYY-MM-DD");
				const response = await axios.get(
					config.base_url +
						"/logs?created_at[gte]=" +
						currentDay +
						"&sender=" +
						queueName +
						"&created_at[lt]=" +
						nextDay +
						"&sort=created_at&limit=4000"
				);
				const data = await response.data.data;

				setMessages(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchMessages();
	}, [value, sync]);

	return (
		<Card sx={sx}>
			<CardHeader
				action={
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
				}
				title="Messages"
			/>
			<CardContent>
				<Stack
					alignItems="flex-start"
					direction="row"
					justifyContent="space-between"
					spacing={3}
				>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline">
							Messages Received
						</Typography>
					</Stack>
				</Stack>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Fecha"
						value={value}
						onChange={(newValue) => setValue(newValue)}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>

				{loading && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							mt: 3,
						}}
					>
						<CircularProgress />
					</Box>
				)}

				{!loading && (
					<Box
						sx={{
							mt: 3,
						}}
					>
						<DynamicReactJson
							src={messages || {}}
							theme={"hopscotch"}
							style={{
								borderRadius: "10px",
							}}
							collapseStringsAfterLength={100}
						/>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

MessagesSection.propTypes = {
	queueName: PropTypes.string,
	sx: PropTypes.object,
};

export default MessagesSection;
