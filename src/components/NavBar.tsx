import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	let body = null;

	if (fetching) {
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href='/login'>
					<Link mr={8}>Login</Link>
				</NextLink>
				<NextLink href='/register'>
					<Link>Register</Link>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<Box mr={8}>{data.me.username}</Box>
				<Button variant='link'>Logout</Button>
			</Flex>
		);
	}
	return (
		<Flex bg='tomato' p={4}>
			<Box ml={"auto"}>{body}</Box>
		</Flex>
	);
};
