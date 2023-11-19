import PropTypes from "prop-types";
import ForwardIcon from "@heroicons/react/24/solid/UserIcon";
import {
	Avatar,
	Card,
	CardContent,
	Stack,
	SvgIcon,
	Typography,
} from "@mui/material";

export const QueueConsumers = (props) => {
	const { value, sx } = props;

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
							Consumers
						</Typography>
						<Typography variant="h4">{value}</Typography>
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
			</CardContent>
		</Card>
	);
};

QueueConsumers.propTypes = {
	value: PropTypes.string,
	sx: PropTypes.object,
};
