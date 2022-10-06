import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
	const stripe = Stripe(`pk_test_51LphkWFbUxtDpF1zCsh5ZJv4c55fjP8Vmc0PmT1sVs3JDCf6fBuuDxF6M2SLPMownVHToQuFOs51a9dTVrl6rxuM00jdbqyOch`);
	try {
		const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);

		await stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});
	} catch (err) {
		console.log(err);
		showAlert('error', err);
	}
}