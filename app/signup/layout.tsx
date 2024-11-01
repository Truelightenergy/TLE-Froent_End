

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: 'Sign Up | LoginApp ',
    description: 'Log In',

}

const SignupLayout = ({
    children,}:
    {children: React.ReactNode}
) => {
    return(
        <>
            <NextTopLoader color="#000" showSpinner={false}/>
            {children}
        </>
    )

}

export default SignupLayout;