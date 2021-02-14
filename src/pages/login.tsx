import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";

import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					console.log(values);
					const response = await login({ options: values });
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						router.push("/");
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='username'
							placeholder='username'
							label='Username'
						/>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder='password'
								label='Password'
							/>
						</Box>
						<Button
							mt={4}
							isLoading={isSubmitting}
							type='submit'
							color='white'
							background='teal'>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;
