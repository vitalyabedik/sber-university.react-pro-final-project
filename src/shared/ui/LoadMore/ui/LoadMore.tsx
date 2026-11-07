import { Alert, Stack } from '@mui/material';
import { Ref } from 'react';
import { Spinner } from '../../Spinner';

type LoadMoreProps = {
	isFetching: boolean;
	isEndOfList: boolean;
	endMessage?: string;
	innerRef?: Ref<HTMLDivElement>;
};

export const LoadMore = ({
	isFetching,
	isEndOfList,
	endMessage = 'End of list!',
	innerRef,
}: LoadMoreProps) => {
	return (
		<Stack
			ref={innerRef}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isFetching && <Spinner />}
			{isEndOfList && <Alert severity='success'>{endMessage}</Alert>}
		</Stack>
	);
};
