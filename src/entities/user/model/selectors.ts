import { userSelectors } from '../../../shared/store/slices/user';
import { RootState } from '../../../shared/store/types';

export const selectCurrentUserId = (state: RootState) =>
	userSelectors.getUser(state)?.id;
