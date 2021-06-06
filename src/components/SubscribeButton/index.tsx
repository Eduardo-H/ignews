import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './styles.module.scss';

export function SubscribeButton() {
    const [isLoading, setIsLoading] = useState(false);

    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        // setIsLoading(true);

        if (!session) {
            signIn('github');
            return;
        }

        if (session.activeSubscription) {
            router.push('/posts');
            return;
        }

        try {
            const response = await api.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <button 
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            { isLoading ? (
                <AiOutlineLoading3Quarters 
                    color="#121214" 
                    className={styles.loadingIconClose}
                />
            ) : (
                session?.activeSubscription ? 'See the posts' : 'Subscribe now'
            ) }
            
        </button>
    );
}