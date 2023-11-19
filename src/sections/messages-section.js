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
import ForwardIcon from "@heroicons/react/24/solid/InboxIcon";
import Avatar from "@mui/material/Avatar";
import SvgIcon from "@mui/material/SvgIcon";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const now = new Date();

const MessagesSection = ({ queueName, sx }) => {
	const [value, setValue] = useState(now);
	const [messages, setMessages] = useState({});

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const currentDay = dayjs(value).format("YYYY-MM-DD");
				const nextDay = dayjs(value).add(1, "day").format("YYYY-MM-DD");
				console.log(
					config.base_url +
						"/logs?created_at[gte]=" +
						currentDay +
						"&sender=" +
						queueName +
						"&created_at[lt]=" +
						nextDay
				);
				const response = await axios.get(
					config.base_url +
						"/logs?created_at[gte]=" +
						currentDay +
						"&sender=" +
						queueName +
						"&created_at[lt]=" +
						nextDay
				);
				const data = await response.data.data;

				setMessages(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMessages();
	}, [value]);

	return (
		<Card sx={sx}>
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
					<Avatar
						sx={{
							backgroundColor: "primary.main",
							height: 56,
							width: 56,
						}}
					>
						<SvgIcon>
							<ForwardIcon />
						</SvgIcon>
					</Avatar>
				</Stack>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Fecha"
						value={value}
						onChange={(newValue) => setValue(newValue)}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
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
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

MessagesSection.propTypes = {
	queueName: PropTypes.string,
	sx: PropTypes.object,
};

export default MessagesSection;
