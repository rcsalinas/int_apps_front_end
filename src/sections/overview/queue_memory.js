import PropTypes from "prop-types";
import ForwardIcon from "@heroicons/react/24/solid/ServerIcon";
import {
	Avatar,
	Card,
	CardContent,
	Stack,
	SvgIcon,
	Typography,
} from "@mui/material";

export const QueueMemory = (props) => {
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
							Used Memory
						</Typography>
						<Typography variant="h4">{value + " bytes"}</Typography>
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

QueueMemory.propTypes = {
	value: PropTypes.string,
	sx: PropTypes.object,
};
