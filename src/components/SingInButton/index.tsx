import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export function SingInButton() {
    const [isLoading, setIsLoading] = useState(false);

    const [session] = useSession();

    async function handleSignInButtonClick() {
        setIsLoading(true);
        await signIn('github');
    }

    async function handleSignOutButtonClick() {
        setIsLoading(true);
        await signOut();
    }

    return session ? (
        <button 
            type="button"
            className={styles.singInButton}
            onClick={handleSignOutButtonClick}
        >
            <FaGithub color="#04D361" />
            {session.user.name}

            {
                isLoading
                ? <AiOutlineLoading3Quarters color="#737380" className={styles.loadingIconClose} />
                : <FiX color="#737380" className={styles.closeIcon} />
            }            
        </button>
    ) : (
        <button 
            type="button"
            className={styles.singInButton}
            onClick={handleSignInButtonClick}
        >
            { isLoading 
                ? <AiOutlineLoading3Quarters color="#EBA417" className={styles.loadingIcon} />
                : <FaGithub color="#EBA417" /> 
            }
            Sign in with GitHub
        </button>
    )
}