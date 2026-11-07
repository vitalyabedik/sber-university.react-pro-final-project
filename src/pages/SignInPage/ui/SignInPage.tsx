import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { SignInForm } from '../../../widgets/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
